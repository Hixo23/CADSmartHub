(defun c:ExportTablesBOM ()
    (setq inputFile (vlax-ldata-get "DraftSight" "InputFile"))  ; Read input from batch file
    (if inputFile
        (progn
            (setq dwgFilePath inputFile)
            (princ "\nOpening DWG file: ")
            (princ dwgFilePath)
            (command "OPEN" dwgFilePath)  ; Open the DWG file

            ;; Select all Table objects and export BOM
            (setq ss (ssget "X"))
            (if ss
                (progn
                    (setq i 0)
                    (while (< i (sslength ss))
                        (setq obj (vlax-ename->vla-object (ssname ss i)))
                        (if (eq (vla-get-ObjectName obj) "AcDbTable")
                            (progn
                                (princ "\nExporting table BOM...\n")
                                (command "EXPORTBOM" obj)  ; Call EXPORTBOM for table object
                            )
                        )
                        (setq i (1+ i))
                    )
                )
            )
        )
    )
    (princ "\nBOM export completed!\n")
    (princ)
)
