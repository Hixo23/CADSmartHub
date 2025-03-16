// backend/controllers/checkoutController.js
const Checkout = require('../models/CheckoutModel'); // Adjust the path as necessary

// Handle checkout process
exports.processCheckout = async (req, res) => {
    const { name, email, address, cardNumber, expiryDate, cvv, price } = req.body;

    try {
        // Create a new checkout entry
        const newCheckout = new Checkout({
            name,
            email,
            address,
            cardNumber,
            expiryDate,
            cvv,
            price
        });

        // Save the entry to the database
        await newCheckout.save();
        console.log('Received checkout data:', req.body);
        
        // Respond with success message
        res.status(201).json({ message: 'Checkout successful', data: newCheckout });
    } catch (error) {
        console.error('Error during checkout:', error);
        res.status(500).json({ message: 'Error during checkout', error: error.message });
    }
};

