const Task = require('../models/Task');

const TaskGet = async (req, res) => {
    try {
        const tasks = await Task.find({});

        res.json(tasks);
    } catch (error) {
        console.error('Error fetching tasks:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};

module.exports = TaskGet;
