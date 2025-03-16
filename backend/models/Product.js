// backend/models/Product.js
const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({    
    name: { type: String, required: true },
    type: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: Number, required: true },
    monthly_subscription: { type: Number, required: true },    
    url: { type: String, required: true },
    max_files: {type: Number, required: true}    
});

module.exports = mongoose.model('Product', productSchema);
