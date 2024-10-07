import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useNavigate, useParams } from 'react-router-dom';

const TaskAdd = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [stor, setStor] = useState(false);
    let storage = localStorage.getItem('token');

    const [Task, setTask] = useState({
        title: '',
        description: '',
        status: 'Pending',
        dueDate: ''
    });

    useEffect(() => {
        if (id) {
            fetchTaskData();
        }
        auth()
    }, [id]);


    const auth = () => {
        if (storage === null) {
            setStor(true);
        } else {
            setStor(false);
        }
    };

    const fetchTaskData = async () => {
        try {
            const response = await axios.get(`http://localhost:3000/api/tasks/${id}`);
            const { title, description, status, dueDate } = response.data;

            let formattedDate = '';
            if (dueDate && !isNaN(Date.parse(dueDate))) {
                formattedDate = new Date(dueDate).toISOString().split('T')[0];
            }

            setTask({
                title,
                description,
                status,
                dueDate: formattedDate,
            });
        } catch (error) {
            console.error('Error fetching task data:', error);
            toast.error('Failed to fetch task data.');
        }
    };

    const handleData = (e) => {
        const { name, value } = e.target;
        setTask({ ...Task, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            if (id) {
                await axios.put(`http://localhost:3000/api/tasks/${id}`, {
                    title: Task.title,
                    description: Task.description,
                    status: Task.status,
                    dueDate: Task.dueDate
                });
                toast.success('Task updated successfully!');
            } else {
                await axios.post('http://localhost:3000/api/tasks', {
                    title: Task.title,
                    description: Task.description,
                    status: Task.status,
                    dueDate: Task.dueDate
                });
                toast.success('Task added successfully!');
                setTask({
                    title: '',
                    description: '',
                    status: 'Pending',
                    dueDate: ''
                });
            }
            navigate('/Task');
        } catch (error) {
            console.error('Error submitting task:', error.response?.data || error.message);
            toast.error('Failed to submit task. Please try again.');
        }
    };

    return (
        <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-md">
            {
                stor ?
                    <h1>Access Denied</h1>
                    :
                    <>
                        <h2 className="text-2xl font-bold mb-4 text-center">{id ? 'Edit Task' : 'Add New Task'}</h2>
                        <form onSubmit={handleSubmit} className="space-y-4">
                            <input
                                type="text"
                                value={Task.title}
                                name='title'
                                onChange={handleData}
                                placeholder="Title"
                                required
                                className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-500"
                            />
                            <textarea
                                value={Task.description}
                                onChange={handleData}
                                name='description'
                                placeholder="Description"
                                required
                                className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-500"
                            />
                            <select
                                value={Task.status}
                                name='status'
                                onChange={handleData}
                                className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-500"
                            >
                                <option value="Pending">Pending</option>
                                <option value="In Progress">In Progress</option>
                                <option value="Completed">Completed</option>
                            </select>
                            <input
                                type="date"
                                value={Task.dueDate}
                                name='dueDate'
                                onChange={handleData}
                                required
                                className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-500"
                            />
                            <button
                                type="submit"
                                className="w-full p-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring focus:ring-blue-300"
                            >
                                {id ? 'Update Task' : 'Add Task'}
                            </button>
                        </form>
                    </>
            }

        </div>
    );
};

export default TaskAdd;
