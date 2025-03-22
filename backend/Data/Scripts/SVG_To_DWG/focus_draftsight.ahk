SetTitleMatchMode(2)  ; Allow partial title matching

; Loop until DraftSight is found and brought to the foreground
Loop {
    ; Attempt to bring DraftSight window to the foreground
    if WinExist("DraftSight")  ; Corrected syntax for WinExist in v2
    {
		; Activate and bring the DraftSight window to the foreground
        WinActivate("DraftSight")
        WinWaitActive("DraftSight", "", 10)  ; Wait up to 10 seconds for it to become active
		Sleep(1000)  ; Pause to ensure it's properly focused
        Send("{Enter}")  ; Send an Enter key to ensure focus in the command window
		
        ; Get the window style to check if it's maximized		
        style := WinGetStyle("DraftSight")
        
        ; Check if the window is maximized (0x20000 is the style bit for maximized)
        if (style & 0x20000)  ; 0x20000 is the "maximized" style
        {
            WinMinimize("DraftSight")  ; Minimize DraftSight if it's maximized
            Sleep(500)  ; Pause to allow the minimize action to complete
        }
		Send("{ESC}")  ;
		
		if WinExist("ahk_exe hh.exe") {
            WinClose("ahk_exe hh.exe")  ; Close the HELP window (hh.exe)
        }


        break  ; Exit the loop once DraftSight is focused
    }
    
    ; If DraftSight is not found, wait 1 second and try again
    Sleep(1000)
}

ExitApp  ; Exit the script after bringing DraftSight to the foreground
