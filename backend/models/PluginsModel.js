// backend/models/PluginsModel.js
const mongoose = require('mongoose');

const pluginSchema = new mongoose.Schema({    
    name: { type: String, required: true },
    type: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: Number, required: true },
    monthly_subscription: { type: Number, required: true },   
    imageUrl: { type: String, required: true },
});

module.exports = mongoose.model('Plugin', pluginSchema);
