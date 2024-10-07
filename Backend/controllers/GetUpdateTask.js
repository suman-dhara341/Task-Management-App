const Task = require('../models/Task');

const GetUpdateTask = async (req, res) => {
    try {
        const { id } = req.params;
        
        const task = await Task.findById(id);


        if (!id) {
            return res.status(400).json({ message: 'Invalid Task ID' });
        }


        if (!task) {
            return res.status(404).json({ message: 'Task not found' });
        }

        res.status(200).json(task);
    } catch (error) {
        console.error('Error fetching task:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};

module.exports = GetUpdateTask;
