import React, { useState } from 'react';
import './TaskList.css';

function TaskList({ tasks, setTasks }) {
    const [filter, setFilter] = useState('all');
    const [editingTask, setEditingTask] = useState(null);
    const [editedText, setEditedText] = useState('');
    const [editedDays, setEditedDays] = useState('');
    const [editedStatus, setEditedStatus] = useState('');

    const filteredTasks = () => {
        const currentDate = new Date();
        switch (filter) {
            case 'completed':
                return tasks.filter(task => task.status === "Finished");
            case 'pending':
                return tasks.filter(task => task.status === "In Progress");
            case 'overdue':
                return tasks.filter(task => 
                    new Date(task.dueDate) < currentDate || task.status === "Delayed"
                );
            default:
                return tasks;
        }
    };

    const handleFilterChange = (filterValue) => {
        setFilter(filterValue);
    };

    const handleStatusChange = (taskId, newStatus) => {
        const updatedTasks = tasks.map(task =>
            task.id === taskId ? { ...task, status: newStatus } : task
        );
        setTasks(updatedTasks);
    };

    const handleDeleteTask = (taskId) => {
        const updatedTasks = tasks.filter(task => task.id !== taskId);
        setTasks(updatedTasks);
    };

    const handleEditTask = (task) => {
        setEditingTask(task.id);
        setEditedText(task.text);
        setEditedDays(task.daysNeeded);
        setEditedStatus(task.status);
    };

    const handleSaveTask = (taskId) => {
        const updatedTasks = tasks.map(task =>
            task.id === taskId ? { ...task, text: editedText, daysNeeded: editedDays, status: editedStatus } : task
        );
        setTasks(updatedTasks);
        setEditingTask(null);
    };

    const handleCancelEdit = () => {
        setEditingTask(null);
    };

    return (
        <div className="task-list-container">
            <h2>My Tasks</h2>

            <div className="filter-dropdown">
                <select onChange={(e) => handleFilterChange(e.target.value)} value={filter}>
                    <option value="all">All Tasks</option>
                    <option value="completed">Completed Tasks</option>
                    <option value="pending">Pending Tasks</option>
                    <option value="overdue">Overdue Tasks</option>
                </select>
            </div>

            <ul className="task-list">
                {filteredTasks().length === 0 ? (
                    <p>No tasks available.</p>
                ) : (
                    filteredTasks().map((task) => (
                        <li key={task.id} className="task-item">
                            {editingTask === task.id ? (
                                <div>
                                    <input
                                        type="text"
                                        value={editedText}
                                        onChange={(e) => setEditedText(e.target.value)}
                                    />
                                    <input
                                        type="number"
                                        value={editedDays}
                                        onChange={(e) => setEditedDays(e.target.value)}
                                    />
                                    <select
                                        value={editedStatus}
                                        onChange={(e) => setEditedStatus(e.target.value)}
                                    >
                                        <option value="In Progress">In Progress</option>
                                        <option value="Finished">Finished</option>
                                        <option value="Delayed">Delayed</option>
                                        <option value="Updated">Updated</option>
                                    </select>
                                    <button onClick={() => handleSaveTask(task.id)}>Save</button>
                                    <button onClick={handleCancelEdit}>Cancel</button>
                                </div>
                            ) : (
                                <div>
                                    <span>{task.text}</span>
                                    <p>Created: {task.creationDate}</p>
                                    <p>Days to complete: {task.daysNeeded}</p>
                                    <p>Status: <span className={`status ${task.status.toLowerCase()}`}>{task.status}</span></p>

                                    <select
                                        value={task.status}
                                        onChange={(e) => handleStatusChange(task.id, e.target.value)}
                                    >
                                        <option value="In Progress">In Progress</option>
                                        <option value="Finished">Finished</option>
                                        <option value="Delayed">Delayed</option>
                                        <option value="Updated">Updated</option>
                                    </select>

                                    <button onClick={() => handleEditTask(task)}>Edit</button>
                                    <button onClick={() => handleDeleteTask(task.id)}>Delete</button>
                                </div>
                            )}
                        </li>
                    ))
                )}
            </ul>
        </div>
    );
}

export default TaskList;
