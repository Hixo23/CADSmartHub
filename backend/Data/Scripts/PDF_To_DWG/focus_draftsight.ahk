SetTitleMatchMode(2)  ; Allow partial title matching

maxAttempts := 30  ; Maximum number of attempts to find DraftSight
attempts := 0

; Loop until DraftSight is found and brought to the foreground
Loop {
    attempts++
    
    ; Attempt to bring DraftSight window to the foreground
    if WinExist("DraftSight") {
        ; Activate and bring the DraftSight window to the foreground
        WinActivate("DraftSight")
        WinWaitActive("DraftSight", "", 10)  ; Wait up to 10 seconds for it to become active
        Sleep(1000)  ; Pause to ensure it's properly focused
        Send("{Enter}")  ; Send an Enter key to ensure focus in the command window
        
        ; Get the window style to check if it's maximized
        style := WinGetStyle("DraftSight")
        
        ; Check if the window is maximized (0x20000 is the style bit for maximized)
        if (style & 0x20000) {
            WinMinimize("DraftSight")  ; Minimize DraftSight if it's maximized
            Sleep(500)  ; Pause to allow the minimize action to complete
        }
        Send("{ESC}")  ; Send Escape key
        
        ; Close the HELP window (hh.exe) if it exists
        if WinExist("ahk_exe hh.exe") {
            WinClose("ahk_exe hh.exe")
        }
		
		; Close the HELP window (hh.exe) if it exists
		if WinExist("ahk_exe hh.exe") {
			WinClose("ahk_exe hh.exe")
		}
        
        break  ; Exit the loop once DraftSight is focused
    }
    
    ; Close the HELP window (hh.exe) if it exists
    if WinExist("ahk_exe hh.exe") {
        WinClose("ahk_exe hh.exe")
    }
    
    ; If DraftSight is not found, wait 1 second and try again
    Sleep(1000)
    
    ; Check if maximum attempts have been reached
    if (attempts >= maxAttempts) {
        MsgBox("DraftSight not found after %maxAttempts% attempts")
        ExitApp  ; Exit the script if DraftSight is not found
    }
}

ExitApp  ; Exit the script after bringing DraftSight to the foreground
