// middleware/taskProcessor.js
const Task = require('../models/Task');
const { processCadTask } = require('../services/cadService');

const taskProcessor = async (req, res, next) => {
    const { taskId } = req.params;

    try {
        const task = await Task.findById(taskId);
        if (!task) {
            return res.status(404).json({ message: 'Task not found' });
        }

        // Process the CAD task
        const result = await processCadTask(task);
        task.status = 'completed';
        task.result = result;
        await task.save();

        res.status(200).json({ message: 'Task processed successfully', result });
    } catch (error) {
        console.error('Error processing task:', error);
        return res.status(500).json({ message: 'Error processing task' });
    }
};

module.exports = taskProcessor;
