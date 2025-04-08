/**
 * @swagger
 * /invoke-services:
 *   post:
 *     summary: Invoke CAD Smart Hub microservices
 *     description: |
 *       Dynamically route CAD-related requests to internal services based on `type` and `apiName`.
 *       Supported types: DataConversion, 2DCAD, Automation.
 *       
 *       - **DataConversion**: Converts PDF, SVG, DGN, STEP, CATDrawing to DWG
 *       - **2DCAD**: Smart dimensioning, fastener creation, cleaning layers, etc.
 *       - **Automation**: BOM extraction, G-code generation, batch print/export, draw compare.
 *       
 *       The output will be sent via email.
 *     tags:
 *       - DataConversion
 *       - 2DCAD
 *       - Automation
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             required:
 *               - type
 *               - apiName
 *               - file
 *               - email
 *             properties:
 *               type:
 *                 type: string
 *                 enum: [DataConversion, 2DCAD, Automation]
 *                 example: DataConversion
 *               apiName:
 *                 type: string
 *                 description: API to invoke based on selected type
 *                 example: pdfToDWG
 *               file:
 *                 type: string
 *                 format: binary
 *                 description: Upload DWG, PDF, SVG, ZIP etc. depending on API
 *               email:
 *                 type: string
 *                 format: email
 *                 example: user@example.com
 *     responses:
 *       200:
 *         description: File received. Output will be sent via email.
 *       400:
 *         description: Missing file or email.
 *       500:
 *         description: Server error during processing.
 */
