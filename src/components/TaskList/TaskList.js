import React, { useState } from 'react';
import './TaskList.css';

function TaskList({ tasks, setTasks }) {
    const [filter, setFilter] = useState('all'); // Default filter state
    const [editingTask, setEditingTask] = useState(null); // State for tracking which task is being edited
    const [editedText, setEditedText] = useState(''); // State for edited task text
    const [editedDays, setEditedDays] = useState(''); // State for edited task days
    const [editedStatus, setEditedStatus] = useState(''); // State for edited task status

    // Filter tasks based on selected filter
    const filteredTasks = () => {
        const currentDate = new Date();
        switch (filter) {
            case 'completed':
                return tasks.filter(task => task.status === "Finished"); // Only show Finished tasks
            case 'pending':
                return tasks.filter(task => task.status === "In Progress");
            case 'overdue':
                return tasks.filter(task => new Date(task.dueDate) < currentDate);
            default:
                return tasks;
        }
    };

    // Handle filter change
    const handleFilterChange = (filterValue) => {
        setFilter(filterValue);
    };

    // Handle task status change
    const handleStatusChange = (taskId, newStatus) => {
        const updatedTasks = tasks.map(task =>
            task.id === taskId ? { ...task, status: newStatus } : task
        );
        setTasks(updatedTasks);
    };

    // Handle delete task
    const handleDeleteTask = (taskId) => {
        const updatedTasks = tasks.filter(task => task.id !== taskId);
        setTasks(updatedTasks);
    };

    // Enable editing of task
    const handleEditTask = (task) => {
        setEditingTask(task.id);
        setEditedText(task.text);
        setEditedDays(task.daysNeeded);
        setEditedStatus(task.status);
    };

    // Save edited task
    const handleSaveTask = (taskId) => {
        const updatedTasks = tasks.map(task =>
            task.id === taskId ? { ...task, text: editedText, daysNeeded: editedDays, status: editedStatus } : task
        );
        setTasks(updatedTasks);
        setEditingTask(null); // Exit edit mode
    };

    // Cancel editing
    const handleCancelEdit = () => {
        setEditingTask(null); // Exit edit mode without saving
    };

    return (
        <div className="task-list-container">
            <h2>My Tasks</h2>

            {/* Filter Dropdown */}
            <div className="filter-dropdown">
                <select onChange={(e) => handleFilterChange(e.target.value)} value={filter}>
                    <option value="all">All Tasks</option>
                    <option value="completed">Completed Tasks</option>
                    <option value="pending">Pending Tasks</option>
                    <option value="overdue">Overdue Tasks</option>
                </select>
            </div>

            {/* Task List */}
            <ul className="task-list">
                {filteredTasks().length === 0 ? (
                    <p>No tasks available.</p>
                ) : (
                    filteredTasks().map((task) => (
                        <li key={task.id} className="task-item">
                            {editingTask === task.id ? (
                                // Edit Mode
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
                                // View Mode
                                <div>
                                    <span>{task.text}</span>
                                    <p>Created: {task.creationDate}</p>
                                    <p>Days to complete: {task.daysNeeded}</p>
                                    <p>Status: <span className={`status ${task.status.toLowerCase()}`}>{task.status}</span></p>

                                    {/* Status Dropdown */}
                                    <select
                                        value={task.status}
                                        onChange={(e) => handleStatusChange(task.id, e.target.value)}
                                    >
                                        <option value="In Progress">In Progress</option>
                                        <option value="Finished">Finished</option>
                                        <option value="Delayed">Delayed</option>
                                        <option value="Updated">Updated</option>
                                    </select>

                                    {/* Edit and Delete Buttons */}
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
