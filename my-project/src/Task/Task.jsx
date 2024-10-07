import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const Task = () => {
    const [tasks, setTasks] = useState([]);
    const [stor, setStor] = useState(false);
    let storage = localStorage.getItem('token');

    useEffect(() => {
        fetchTasks();
        auth();
    }, []);

    const fetchTasks = async () => {
        try {
            const response = await axios.get('http://localhost:3000/api/tasks');
            setTasks(response.data);
        } catch (error) {
            console.error('Error fetching tasks:', error);
        }
    };

    const auth = () => {
        if (storage === null) {
            setStor(true); 
        } else {
            setStor(false); 
        }
    };

    const handleUpdate = async (id) => {
        try {
            await axios.get(`http://localhost:3000/api/tasks/${id}`);
            fetchTasks();
        } catch (error) {
            console.error('Error updating task:', error);
        }
    };

    const handleDelete = async (id) => {
        try {
            await axios.delete(`http://localhost:3000/api/tasks/${id}`);
            fetchTasks();
        } catch (error) {
            console.error('Error deleting task:', error);
        }
    };

    return (
        <div className="container mx-auto px-4">
            {stor ? (
                <h1>Access Denied</h1>
            ) : (
                <>
                    <h1 className="text-3xl font-bold text-center mb-8">Task Management</h1>
                    <div className="flex justify-end mb-4">
                        <Link to="/TaskAdd" className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
                            Add Task
                        </Link>
                    </div>

                    <ul className="space-y-4">
                        {tasks.map((task) => (
                            <li key={task._id} className="bg-white p-4 shadow-md rounded-lg">
                                <h3 className="text-xl font-semibold">{task.title}</h3>
                                <p className="text-gray-700">{task.description}</p>
                                <p className="text-gray-500">Status: {task.status}</p>
                                <p className="text-gray-500">Due: {new Date(task.dueDate).toLocaleDateString()}</p>

                                <div className="flex space-x-4 mt-4">
                                    <Link
                                        to={`/TaskAdd/${task._id}`}
                                        className="bg-yellow-500 text-white px-4 py-2 rounded hover:bg-yellow-600"
                                    >
                                        Edit
                                    </Link>

                                    <button
                                        onClick={() => handleDelete(task._id)}
                                        className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
                                    >
                                        Delete
                                    </button>
                                </div>
                            </li>
                        ))}
                    </ul>
                </>
            )}
        </div>
    );
};

export default Task;
