// backend/routes/cadRoutes.js
const express = require('express');
const router = express.Router();
const launchCADSoftware = require('../middleware/launchCADSoftware');

// POST endpoint to launch CAD software
router.post('/launch-cad', async (req, res) => {
    try {
        console.log(`Routing to launchCADSoftware function`);
        
        // Await the launchCADSoftware function if it's asynchronous
        await launchCADSoftware(); // Launch the CAD software

        res.status(200).json({ message: 'CAD software launched successfully' });
    } catch (error) {
        console.error('Error launching CAD software:', error);
        res.status(500).json({ message: 'Error launching CAD software', error: error.message });
    }
});

// POST endpoint for Automation API
router.post('/automation', (req, res) => {
    // Core logic for Automation API
    console.log('AutomationAPIService received:', req.body);
    res.status(200).json({ message: 'Automation complete', data: req.body });
});

// POST endpoint for Data Conversion API
router.post('/data-conversion', (req, res) => {
    // Core logic for Data Conversion API
    console.log('DataConversionAPIService received:', req.body);
    res.status(200).json({ message: 'Data conversion complete', data: req.body });
});

// POST endpoint for Draw2D API
router.post('/draw2d', (req, res) => {
    // Core logic for Draw2D API
    console.log('Draw2DAPIService received:', req.body);
    res.status(200).json({ message: 'Draw2D processing complete', data: req.body });
});

module.exports = router;
