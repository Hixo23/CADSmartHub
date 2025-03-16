// backend/routes/checkoutRoutes.js
const express = require('express');
const router = express.Router();
const CheckoutController = require('../controllers/checkoutController'); // Ensure this path is correct

// POST endpoint to handle checkout
router.post('/', CheckoutController.processCheckout); // Use '/' to match the base path

module.exports = router;
