// middleware/cadApiMiddleware.js
const express = require('express');
const router = express.Router();
const dataConversionAPI = require('./DataConversionAPIService'); // Import the DataConversionAPIService
const draw2DAPI = require('./Draw2DAPIService'); // Import the Draw2DAPIService
const automationAPI = require('./AutomationAPIService'); // Import the AutomationAPIService
const multer = require('multer');
const path = require('path');



// Configure multer to store files with their original names
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, path.join(__dirname, '../Data/uploads/')); // Directory to store uploaded files
    },
    filename: (req, file, cb) => {
        cb(null, file.originalname); // Use the original filename
    },
});

const upload = multer({ storage }); // Use the custom storage configuration

// Import Swagger documentation
require('../swaggerDocs/invokeServices'); // Import the Swagger documentation for this endpoint

// Route to invoke the microservices
router.post('/invoke-services', upload.single('file'), async (req, res) => {
    const { type, apiName } = req.body;
    const file = req.file; // Get the uploaded file

    console.log('Received file:', file ? file.originalname : 'No file uploaded');

    if (!file) {
        return res.status(400).json({ message: 'File is required' });
    }

    try {
        let response;

        console.log('Routing to service with type:', type);
        console.log('API name:', apiName);
        console.log('file:', file);

        // Route based on the type
        switch (type) {
            case '2DCAD':
                response = await draw2DAPI.processFile(file, apiName); // Call the function from Draw2DAPIService
                break;
            case 'DataConversion':
                response = await dataConversionAPI.convert(file, apiName); // Call the default conversion function
                break;
            case 'Automation':
                response = await automationAPI.processFile(file, apiName); // Call the function from AutomationAPIService
                break;
            default:
                return res.status(400).json({ message: 'Invalid type' });
        }

        // Send the response back to the client
        res.status(200).json(response);
    } catch (error) {
        console.error('Error invoking services:', error);
        res.status(500).json({ message: 'Error invoking services', error: error.message });
    }
});

module.exports = router;
