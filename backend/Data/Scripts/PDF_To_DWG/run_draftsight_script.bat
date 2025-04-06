@echo off
cd /d "%~dp0"

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

:: Check if input and output paths are provided
if "%INPUT_PDF%"=="" (
    echo Error: No input PDF file provided.
    exit /b 1
)

if "%OUTPUT_DWG%"=="" (
    echo Error: No output DWG file path provided.
    exit /b 1
)

:: Bring DraftSight to the foreground using AutoHotkey v2
start /min "" "C:\Program Files\AutoHotkey\v2\AutoHotkey.exe" "%~dp0focus_draftsight.ahk"

:: Wait for AutoHotkey to bring DraftSight into focus
::timeout /t 2 >nul

:: Run the VBScript to execute commands in DraftSight with the input PDF and output DWG paths
cscript //nologo "%~dp0import_pdf.vbs" "%INPUT_PDF%" "%OUTPUT_DWG%"

if %ERRORLEVEL% NEQ 0 (
    echo Error: Failed to run the VBScript for PDF import.
    exit /b %ERRORLEVEL%
)

:: Wait for a brief moment to ensure the process completes
::timeout /t 5 >nul 

echo DraftSight automation executed successfully!

:: Exit the batch file
exit /b 0
