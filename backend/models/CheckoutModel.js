// models/CheckoutModel.js
const mongoose = require('mongoose');

const checkoutSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true },
    address: { type: String, required: true },
    cardNumber: { type: String, required: true },
    expiryDate: { type: String, required: true },
    cvv: { type: String, required: true },
    price: { type: Number, required: true },
    createdAt: { type: Date, default: Date.now } // Automatically set the date when the entry is created
});

// Create a model from the schema
const CheckoutModel = mongoose.model('Checkout', checkoutSchema);

module.exports = CheckoutModel;
