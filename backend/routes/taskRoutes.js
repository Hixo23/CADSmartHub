const express = require('express');
const router = express.Router();
const taskController = require('../controllers/taskController');
const { verifyToken } = require('../middleware/authMiddleware.js');

// Route to upload a CAD file and create a task
router.post('/upload', verifyToken, taskController.uploadCADFile, taskController.createTask);

// Route to get the status of a specific task by task ID
router.get('/:taskId/status', verifyToken, taskController.getTaskStatus);

// Route to update the status of a specific task by task ID
router.put('/:taskId/status', verifyToken, taskController.updateTaskStatus);

// Route to get all tasks for the authenticated user
router.get('/', verifyToken, taskController.getUserTasks);

module.exports = router;
