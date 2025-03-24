// backend/routes/api.js
const express = require('express');
const mongoose = require('mongoose');
const Product = require('../models/Product'); // Import the Product model
const ApiModel = require('../models/ApiModel'); // Import the new Api model
const PluginsModel = require('../models/PluginsModel'); // Ensure this is the correct model for plugins
const router = express.Router();


// Route to get all APIs from MongoDB
router.get('/apis', async (req, res) => {
    try {
        const apis = await ApiModel.find(); // Fetch all APIs from the database
        res.json(apis);
    } catch (error) {
        console.error('Error fetching APIs:', error);
        res.status(500).json({ message: 'Server error' });
    }
});

// Route to get plugins by type
router.get('/plugins/:type', async (req, res) => { // Changed the route to avoid conflict with the previous route
    
    const type = req.params.type; 
    console.log('/plugins/:type:', { type }); 
    console.log('Fetching plugins for type:', type); 
    try {
        const plugins = await PluginsModel.find({ type }); // Ensure you are using the correct model
        console.log('Query executed:', { type }); 
        console.log('Retrieved plugins:', plugins); 
        if (plugins.length === 0) {
            return res.status(404).json({ message: 'No plugins found for this type' }); // Updated message for clarity
        }
        res.json(plugins);
    } catch (error) {
        console.error('Error fetching plugins:', error);
        res.status(500).json({ message: 'Server error' });
    }
});

// Route to get a plugin by ID
router.get('/plugins/:_id', async (req, res) => {
    try {

        const pluginId = req.params._id;
        console.log('Received ID:', req.params._id);
        const plugin = await PluginsModel.findById(pluginId);
        console.log('/plugins/:_id:', { pluginId }); 
    
        if (!plugin) {
          return res.status(404).send('Plugin not found');
        }
    
        res.json(plugin);
      } catch (error) {
        res.status(500).send('Server error');
      }
}); 

// Define your product route
router.get('/products/:name', async (req, res) => {
    try {
        const productName = req.params.name;
        console.log('Received productName:', productName);
        const product = await Product.find({ name: productName });
        console.log('Received product:', product);
        if (!product) {
            return res.status(404).json({ message: 'product not found' });
        }
        res.json(product);
    } catch (error) {
        console.error('Error fetching product name:', error);
        res.status(500).json({ message: 'Server error' });
    }
});

router.get('/api-listing', async (req, res) => {
    try {
        const apis = await ApiModel.find();
        const plugins = await PluginsModel.find();

        // Combine the data as needed
        const response = {
            apis,
            plugins,
        };

        res.status(200).json(response);
    } catch (error) {
        console.error('Error fetching data:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
});
module.exports = router;
