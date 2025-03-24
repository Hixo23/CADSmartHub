Option Explicit
Dim WshShell, colProcesses, objProcess
' Dim DraftSightPID, DraftSightHandle
Dim objShell
Dim objArgs, dwgFilePath
Set objArgs = WScript.Arguments

If objArgs.Count = 0 Then
    WScript.Echo "Error: No DWG file provided."
    WScript.Quit 1
End If

dwgFilePath = WScript.Arguments(0)
Set WshShell = CreateObject("WScript.Shell")
Set objShell = CreateObject("Shell.Application")

BringDraftSightToFront()

' Initialize DraftSight application
Dim dsApp, dsDoc, dsModel, dsSketchManager, dsEntity, dsEntities
On Error Resume Next
Set dsApp = GetObject(, "DraftSight.Application")
If Err.Number <> 0 Then
    WScript.Echo "Error: DraftSight is not running."
    WScript.Quit 1
End If
On Error GoTo 0

' Ensure DraftSight is visible
dsApp.Visible = True

BringDraftSightToFront()
' Activate DraftSight window
' Send IMPORTPDF command
WshShell.SendKeys "{ESC}"
WScript.Sleep 1000
WshShell.SendKeys "{ESC}"
WScript.Sleep 500

WshShell.SendKeys "_OPEN"
WshShell.SendKeys "{ENTER}"
WScript.Sleep 2000

'BringDraftSightToFront()
' Specify destination
WshShell.SendKeys dwgFilePath
WScript.Sleep 500
WshShell.SendKeys "{ENTER}"
WScript.Sleep 500

' Wait for file to load
WScript.Sleep 2000

' Get active document
Set dsDoc = dsApp.GetActiveDocument()
If dsDoc Is Nothing Then
    WScript.Echo "Error: No active document."
    WScript.Quit 1
End If

' Get Model
Set dsModel = dsDoc.GetModel()
If dsModel Is Nothing Then
    WScript.Echo "Error: Unable to access model space."
    WScript.Quit 1
End If

' Get SketchManager
Set dsSketchManager = dsModel.GetSketchManager()
If dsSketchManager Is Nothing Then
    WScript.Echo "Error: Unable to access SketchManager."
    WScript.Quit 1
End If

' **Create empty variant arrays to hold entity data**
Dim entityTypeLongArray, entitiesArray
entityTypeLongArray = Empty  ' Placeholder for entity types
entitiesArray = Empty  ' Placeholder for entities

' **Call GetEntities** (passing empty variables)
dsSketchManager.GetEntities Nothing, Nothing, entityTypeLongArray, entitiesArray

' Ensure entitiesArray is a valid array before processing
If IsArray(entitiesArray) And UBound(entitiesArray) >= 0 Then
    Dim entity, exportPath
    exportPath = "C:\Temp\exported_table"  ' Define export path
    
    ' Iterate through entities and process tables
    For Each entity In entitiesArray
        If Not entity Is Nothing Then
            WScript.Echo "Entity Type: " & TypeName(entity)
            
            ' Check if the entity is a Table
            If InStr(1, TypeName(entity), "Table", vbTextCompare) > 0 Then
                ' Export BOM for the table
                entity.ExportBOM exportPath
                WScript.Echo "Exported BOM for table at: " & exportPath
            End If
        End If
    Next
Else
    WScript.Echo "No entities found in the model."
End If


' Cleanup
Set WshShell = Nothing
Set objShell = Nothing
Set objWMI = Nothing
Set colProcesses = Nothing
Set objProcess = Nothing

' New Function to bring DraftSight window to the foreground
Function BringDraftSightToFront()
    Dim objWMI, colProcesses, objProcess, hwnd
    Set objWMI = GetObject("winmgmts:\\.\root\cimv2")
    Set colProcesses = objWMI.ExecQuery("Select * from Win32_Process Where Name='DraftSight.exe'")

    For Each objProcess in colProcesses
        hwnd = objProcess.ProcessId
        Exit For
    Next

    If Not IsEmpty(hwnd) Then
        Dim objShell
        Set objShell = CreateObject("WScript.Shell")
        objShell.AppActivate hwnd
        Set objShell = Nothing
    End If

    Set objWMI = Nothing
    Set colProcesses = Nothing
    Set objProcess = Nothing
End Function

WScript.Echo "Process completed."
