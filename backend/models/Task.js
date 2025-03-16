// backend/models/Task.js
const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User ' },
    filePath: { type: String, required: true },
    status: { type: String, default: 'pending' },
    resultPath: { type: String },
});

module.exports = mongoose.model('Task', taskSchema);
