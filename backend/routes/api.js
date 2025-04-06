// backend/routes/api.js
const express = require('express');
const mongoose = require('mongoose');
const Product = require('../models/Product'); // Import the Product model
const ApiModel = require('../models/ApiModel'); // Import the new Api model
const PluginsModel = require('../models/PluginsModel'); // Ensure this is the correct model for plugins
const { swaggerDocs, swaggerUi } = require('../config/swaggerConfig');
const router = express.Router();


/**
 * @swagger
 * /apis:
 *   get:
 *     summary: Get all APIs
 *     description: Fetch all APIs from the database.
 *     tags: [APIs]
 *     responses:
 *       200:
 *         description: A list of APIs
 *       500:
 *         description: Server error
 */
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

/**
 * @swagger
 * /plugins/{type}:
 *   get:
 *     summary: Get plugins by type
 *     description: Fetch plugins based on the specified type.
 *     tags: [Plugins]
 *     parameters:
 *       - name: type
 *         in: path
 *         required: true
 *         description: The type of plugins to fetch
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: A list of plugins
 *       404:
 *         description: No plugins found for this type
 *       500:
 *         description: Server error
 */
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

/**
 * @swagger
 * /plugins/{_id}:
 *   get:
 *     summary: Get a plugin by ID
 *     description: Fetch a specific plugin by its ID.
 *     tags: [Plugins]
 *     parameters:
 *       - name: _id
 *         in: path
 *         required: true
 *         description: The ID of the plugin to fetch
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: The requested plugin
 *       404:
 *         description: Plugin not found
 *       500:
 *         description: Server error
 */
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


/**
 * @swagger
 * /products/{name}:
 *   get:
 *     summary: Get product details by name
 *     description: Retrieve details of a product by its name.
 *     tags: [Products]
 *     parameters:
 *       - name: name
 *         in: path
 *         required: true
 *         description: The name of the product to retrieve.
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Successful response with product details
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 name:
 *                   type: string
 *                 type:
 *                   type: string
 *                 description:
 *                   type: string
 *                 price:
 *                   type: number
 *                 monthly_subscription:
 *                   type: number
 *                 imageUrl:
 *                   type: string
 *       404:
 *         description: Product not found
 *       500:
 *         description: Internal server error
 */
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

/**
 * @swagger
 * /api-listing:
 *   get:
 *     summary: Get combined API and plugin listing
 *     description: Fetch all APIs and plugins and return them in a single response.
 *     tags: [APIs, Plugins]
 *     responses:
 *       200:
 *         description: Combined list of APIs and plugins
 *       500:
 *         description: Internal Server Error
 */
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

router.get('/swagger.json', (req, res) => {
    //console.log('Before redirection Inside swagger.json:');
    res.setHeader('Content-Type', 'application/json');
    res.status(200).send(swaggerDocs);
    //console.log('After redirection Inside swagger.json:');
  });

router.get('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

module.exports = router;
