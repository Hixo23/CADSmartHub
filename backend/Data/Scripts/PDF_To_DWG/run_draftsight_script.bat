@echo off
:: Check if DraftSight is running
tasklist /FI "IMAGENAME eq DraftSight.exe" | find /I "DraftSight.exe" >nul
if %ERRORLEVEL% NEQ 0 (
    echo DraftSight is not running. Launching DraftSight...
    start "" "C:\Program Files\Dassault Systemes\DraftSight\bin\DraftSight.exe"
    
    :: Wait for DraftSight process to start
    echo Waiting for DraftSight to launch...
    
    :wait_for_draftsight
    tasklist /FI "IMAGENAME eq DraftSight.exe" | find /I "DraftSight.exe" >nul
    if %ERRORLEVEL% NEQ 0 (
        timeout /t 100 >nul
        goto wait_for_draftsight
    )
)

:: Wait for a brief moment to ensure DraftSight is fully loaded
:: Get input file and output path from arguments
set INPUT_PDF=%1
set OUTPUT_DWG=%2

:: Bring DraftSight to the foreground using AutoHotkey v2
start /min "" "C:\Program Files\AutoHotkey\v2\AutoHotkey.exe" "%~dp0focus_draftsight.ahk"

:: Wait for AutoHotkey to bring DraftSight into focus
timeout /t 2 >nul

:: Run the VBScript to execute commands in DraftSight with the input PDF and output DWG paths
cscript //nologo "%~dp0import_catdrawing.vbs" "%INPUT_PDF%" "%OUTPUT_DWG%"

:: Run the VBScript to execute commands in DraftSight
:: cscript //nologo "D:\Data\Scripts\PDF_To_DWG\import_pdf.vbs"

:: echo DraftSight automation executed successfully!
pause
