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

:: Define paths
set "DWG_FILE=%~1"

if "%DWG_FILE%"=="" (
    echo Usage: run_lisp.bat "path\to\your.dwg"
    exit /b
)

:: Store DWG file path for LISP to read
echo %DWG_FILE% > "%temp%\dwg_input.txt"

:: Ensure DraftSight is active using AutoHotkey
start /min "" "C:\Program Files\AutoHotkey\v2\AutoHotkey.exe" "%~dp0focus_draftsight.ahk"
timeout /t 2 >nul

:: Run the LISP script inside DraftSight
(
    echo (vlax-ldata-put "DraftSight" "InputFile" "%temp%\dwg_input.txt")
    echo (load "%%~dp0export_tables_bom.lsp%")
    echo (ExportTablesBOM)
    echo (exit)
) > "%temp%\ds_commands.scr"

:: Send script to DraftSight without relaunching
start "" /WAIT "%DRAFTSIGHT_EXE%" /s "%temp%\ds_commands.scr"

echo LISP script executed successfully!
pause
