/**
 * @swagger
 * /invoke-services:
 *   post:
 *     summary: Invoke microservices
 *     description: Upload a file and invoke the appropriate microservice based on the type.
 *     tags: [Microservices]
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               file:
 *                 type: string
 *                 format: binary
 *               type:
 *                 type: string
 *               apiName:
 *                 type: string
 *     responses:
 *       200:
 *         description: Successful response
 *       400:
 *         description: Bad request
 *       500:
 *         description: Internal server error
 */
