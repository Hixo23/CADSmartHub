// backend/models/ApiModel.js
const mongoose = require('mongoose');

const apiSchema = new mongoose.Schema({
    name: { type: String, required: true },
    description: { type: String, required: true },
    endpoint: { type: String, required: true },
});

const ApiModel = mongoose.model('Api', apiSchema);

module.exports = ApiModel;
