const Task = require('../models/Task');
const multer = require('multer');
const path = require('path');

// Configure multer for file uploads
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/'); // Directory to store uploaded files
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname)); // Unique filename
    },
});

const upload = multer({ storage });

// Upload CAD file and create a task
exports.uploadCADFile = upload.single('file');

exports.createTask = async (req, res) => {
    try {
        const task = new Task({
            userId: req.user.id, // Get user ID from the authenticated user
            filePath: req.file.path,
            status: 'pending', // Initial status
        });
        await task.save();
        res.status(201).json({ message: 'Task created', taskId: task._id });
    } catch (error) {
        console.error('Error creating task:', error);
        res.status(500).json({ message: 'Error creating task' });
    }
};

// Get task status by task ID
exports.getTaskStatus = async (req, res) => {
    try {
        const task = await Task.findById(req.params.taskId);
        if (!task) {
            return res.status(404).json({ message: 'Task not found' });
        }
        res.json(task);
    } catch (error) {
        console.error('Error fetching task status:', error);
        res.status(500).json({ message: 'Error fetching task status' });
    }
};

// Update task status (for example, after processing)
exports.updateTaskStatus = async (req, res) => {
    try {
        const { status, resultPath } = req.body; // Expecting status and resultPath in the request body
        const task = await Task.findByIdAndUpdate(
            req.params.taskId,
            { status, resultPath },
            { new: true } // Return the updated document
        );
        if (!task) {
            return res.status(404).json({ message: 'Task not found' });
        }
        res.json({ message: 'Task updated', task });
    } catch (error) {
        console.error('Error updating task status:', error);
        res.status(500).json({ message: 'Error updating task status' });
    }
};

// Get all tasks for a user
exports.getUserTasks = async (req, res) => {
    try {
        const tasks = await Task.find({ userId: req.user.id }); // Find tasks by user ID
        res.json(tasks);
    } catch (error) {
        console.error('Error fetching user tasks:', error);
        res.status(500).json({ message: 'Error fetching user tasks' });
    }
};

