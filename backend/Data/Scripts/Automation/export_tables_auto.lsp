(defun c:export_tables_auto (dwg-path output-path)
  (if (findfile dwg-path)
    (progn
      (command "_OPEN" dwg-path "")

      (setq ss (ssget "X" '((0 . "TABLE"))))

      (if ss
        (progn
          (setq len (sslength ss))
          (setq i 0)

          (while (< i len)
            (setq ent (ssname ss i))
            (setq ent-data (entget ent))
            (setq table-name (cdr (assoc 100 ent-data)))
            (setq table-name (cdr (assoc 1 table-name)))

            (if table-name
                (setq csv-path (strcat output-path "\\" table-name ".csv"))
                (setq csv-path (strcat output-path "\\" "Table_" (itoa i) ".csv"))
            )

            (command "_EXPORTTABLE" "" ent csv-path "")
            (princ (strcat "\nTable " table-name " exported to " csv-path))

            (setq i (1+ i))
          )
          (princ "\nAll tables exported.")
        )
        (princ "\nNo tables found in the drawing.")
      )
      (command "_CLOSE" "N")
    )
    (princ "\nDWG file not found.")
  )
  (princ)
)
