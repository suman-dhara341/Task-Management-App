const Task = require('../models/Task');

const taskController = async (req, res) => {
    try {
        const { title, description, status, dueDate } = req.body;

        if (!title || !description || !dueDate) {
            return res.status(400).json({ message: 'Title, description, and due date are required' });
        }

        const newTask = new Task({
            title,
            description,
            status: status, 
            dueDate,
        });

        await newTask.save();

        res.status(201).json({ message: 'Task created successfully', task: newTask });

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
};

module.exports = taskController;
