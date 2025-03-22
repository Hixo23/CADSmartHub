Option Explicit
Dim WshShell, objWMI, colProcesses, objProcess
Dim DraftSightPID, DraftSightHandle
Dim objShell
Dim inputSTEP, outputDWG

' Get input arguments
inputSTEP = WScript.Arguments(0)  ' First argument: Input PDF path
outputDWG = WScript.Arguments(1) ' Second argument: Output DWG path

' Ensure the input file path is not empty
If inputSTEP = "" Then
    MsgBox "No file path provided!", vbExclamation, "Error"
    WScript.Quit
End If

Set WshShell = CreateObject("WScript.Shell")
Set objShell = CreateObject("Shell.Application")

' Find DraftSight process ID
Set objWMI = GetObject("winmgmts:\\.\root\cimv2")
Set colProcesses = objWMI.ExecQuery("Select * from Win32_Process Where Name='DraftSight.exe'")

For Each objProcess in colProcesses
    DraftSightPID = objProcess.ProcessId
    Exit For
Next

If DraftSightPID = "" Then
    MsgBox "DraftSight is not running!", vbExclamation, "Error"
    WScript.Quit
End If

' Activate DraftSight window
WshShell.AppActivate DraftSightPID
WScript.Sleep 500
' BringDraftSightToFront()
WScript.Sleep 2000

' Send IMPORTPDF command
WshShell.SendKeys "{ESC}"
WScript.Sleep 1000
WshShell.SendKeys "{ESC}"
WScript.Sleep 500
WshShell.AppActivate DraftSightPID
WshShell.SendKeys "NEW"
WshShell.SendKeys "{ENTER}"
WScript.Sleep 1000
WshShell.SendKeys ".{ENTER}"
'WshShell.SendKeys "{ENTER}"
WScript.Sleep 1000
WshShell.SendKeys "IMPORTSTEP"
WshShell.SendKeys "{ENTER}"
WScript.Sleep 1000

'BringDraftSightToFront()
' Specify destination
WshShell.SendKeys inputSTEP
WScript.Sleep 500
WshShell.SendKeys "{ENTER}"
WScript.Sleep 1000
WshShell.SendKeys "ZOOMFIT"
WScript.Sleep 500
WshShell.SendKeys "{ENTER}"
WScript.Sleep 1000

' Execute SAVEAS command
WshShell.SendKeys "SAVEAS"
WScript.Sleep 500
WshShell.SendKeys "{ENTER}"
WScript.Sleep 1000
WshShell.SendKeys "R32"
WScript.Sleep 500
WshShell.SendKeys "{ENTER}"
WScript.Sleep 1000

' Set file path
WshShell.SendKeys outputDWG
WScript.Sleep 500
WshShell.SendKeys "{ENTER}"
WScript.Sleep 1000
WshShell.SendKeys "Y"
WScript.Sleep 500
WshShell.SendKeys "{ENTER}"
WScript.Sleep 500
WshShell.SendKeys "{ESC}"
WScript.Sleep 2000
WshShell.SendKeys "SAVE"
WScript.Sleep 500
WshShell.SendKeys "{ENTER}"
WScript.Sleep 500
WshShell.SendKeys "{ESC}"
WshShell.SendKeys "{ENTER}"
WScript.Sleep 2000
WshShell.SendKeys "CLOSE"
WScript.Sleep 500
WshShell.SendKeys "{ENTER}"
WScript.Sleep 500
WshShell.SendKeys "{ESC}"
WScript.Sleep 500


' Wait for save to complete
WScript.Sleep 2000

'MsgBox "Import and Save completed!", vbInformation, "Success"

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
