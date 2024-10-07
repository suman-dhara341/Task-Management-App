const Task = require('../models/Task');

const TaskUpdate = async (req, res) => {
    const id = req.params.id;
    const { title, description, status, dueDate } = req.body;

    try {
        const task = await Task.findById(id);

        if (!task) {
            return res.status(404).json({ message: 'Task not found' });
        }

        task.title = title || task.title;
        task.description = description || task.description;
        task.status = status || task.status;
        task.dueDate = dueDate || task.dueDate;

        const updatedTask = await task.save();

        res.status(200).json(updatedTask);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error', error });
    }
};

module.exports = TaskUpdate;
