// backend/middleware/cadApiMiddleware.js
const express = require('express');
const router = express.Router();
const dataConversionAPI = require('./DataConversionAPIService'); // Import the DataConversionAPIService
const draw2DAPI = require('./Draw2DAPIService'); // Import the Draw2DAPIService
const automationAPI = require('./AutomationAPIService'); // Import the AutomationAPIService
const multer = require('multer');
const upload = multer({ dest: 'uploads/' }); // Stores files in 'uploads/' directory

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

        // console.log('Routing to service with type:', type);
        // console.log('API name:', apiName);
        // console.log('file:', file);
        // //console.log('req.body:', req.body);
        // console.log('req.body.type:', req.body.type);
        // Route based on the type
        switch (type) {
            case '2DCAD':
                //console.log('2DCAD called with file:', file);
                response = await draw2DAPI.processFile(file,apiName); // Call the function from Draw2DAPIService
                break;
            case 'DataConversion':
                //console.log('DataConversion called with file:', file);
                response = await dataConversionAPI.convert(file,apiName); // Call the default conversion function
                break;
            case 'Automation':
                //console.log('automationAPI called with file:', file);
                response = await automationAPI.processFile(file,apiName); // Call the function from AutomationAPIService
                break;
            default:
        }    
        // Send the response back to the client
        res.status(200).json(response);
    } catch (error) {
        console.error('Error invoking services:', error);
        res.status(500).json({ message: 'Error invoking services', error: error.message });
    }
});

module.exports = router;
