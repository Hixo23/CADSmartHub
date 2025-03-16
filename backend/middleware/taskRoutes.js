// routes/taskRoutes.js

const express = require('express');
const router = express.Router();
const cadApiMiddleware = require('../middleware/cadApiMiddleware');
const taskProcessor = require('../middleware/taskProcessor');
const launchCADSoftware = require('../launchCADSoftware');

// Route to launch CADSoftware
router.post('/launch-draftsight', (req, res) => {
    try {
        launchCADSoftware();
        res.status(200).json({ message: 'CADSoftware is launching...' });
    } catch (error) {
        console.error('Error launching CADSoftware:', error);
        res.status(500).json({ message: 'Failed to launch CADSoftware' });
    }
});

// Example route for creating a CADSoftware task
router.post('/tasks', cadApiMiddleware, async (req, res) => {
    // Here, you can handle the logic for creating a task
    // For example, you might want to save the task to a database
    const { operation, data } = req.body;

    // You can create a new task in your database (assuming you have a Task model)
    const newTask = new Task({
        operation,
        data,
        status: 'pending'
    });

    await newTask.save();

    res.status(201).json({ message: 'Task created successfully', task: newTask });
});

// Example route for processing a CADSoftware task
router.get('/tasks/:taskId', taskProcessor);

// Example route for getting the result of a CADSoftware operation
router.get('/tasks/:taskId/result', async (req, res) => {
    const { taskId } = req.params;

    try {
        const task = await Task.findById(taskId);
        if (!task) {
            return res.status(404).json({ message: 'Task not found' });
        }

        res.status(200).json({ message: 'Task result retrieved successfully', result: task.result });
    } catch (error) {
        console.error('Error retrieving task result:', error);
        return res.status(500).json({ message: 'Error retrieving task result' });
    }
});

// Export the router
module.exports = router;

/*const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/authMiddleware');
const cadApiMiddleware = require('../middleware/cadApiMiddleware');
const taskProcessor = require('../middleware/taskProcessor');

// Example route for creating a CAD task
router.post('/tasks', authMiddleware, cadApiMiddleware, async (req, res) => {
    // Handle task creation logic here
});

// Example route for processing a CAD task
router.get('/tasks/:taskId', authMiddleware, taskProcessor);

module.exports = router;*/
