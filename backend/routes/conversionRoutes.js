// backend/routes/conversionRoutes.js
const express = require('express');
const router = express.Router();
const path = require('path');
const { convert } = require('../middleware/DataConversionAPIService'); // Adjust the path as necessary

// Define the /convert route
router.post('/convert', async (req, res) => {
    const { filename, apiName } = req.body; // Assuming data contains the filename and the API name
    try {
        const result = await convert({ filename }, apiName); // Call the appropriate conversion function
        // Construct the download link
        const downloadLink = `/downloads/${path.basename(result.output)}`;
        
        // Render a success message with a download link
        res.send(`
            <!DOCTYPE html>
            <html lang="en">
            <head>
                <meta charset="UTF-8">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <title>Conversion Status</title>
                <style>
                    body { font-family: Arial, sans-serif; margin: 20px; }
                    .status { margin-bottom: 20px; }
                    .success { color: green; }
                    .error { color: red; }
                    a { display: inline-block; margin-top: 10px; }
                </style>
            </head>
            <body>
                <h1>Conversion Status</h1>
                <div class="status success">
                    <p>${result.message}</p>
                </div>
                <a href="${downloadLink}" download>Download Converted File</a>
                <br>
                <a href="/">Go Back</a>
            </body>
            </html>
        `);
    } catch (error) {
        // Render an error message
        res.send(`
            <!DOCTYPE html>
            <html lang="en">
            <head>
                <meta charset="UTF-8">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <title>Conversion Status</title>
                <style>
                    body { font-family: Arial, sans-serif; margin: 20px; }
                    .status { margin-bottom: 20px; }
                    .error { color: red; }
                    a { display: inline-block; margin-top: 10px; }
                </style>
            </head>
            <body>
                <h1>Conversion Status</h1>
                <div class="status error">
                    <p>Error: ${error.message}</p>
                </div>
                <a href="/">Go Back</a>
            </body>
            </html>
        `);
    }
});

module.exports = router;