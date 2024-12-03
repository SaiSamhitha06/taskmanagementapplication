import React, { useState } from 'react';
import './TaskCard.css';
import TaskList from '../TaskList/TaskList';

function TaskCard() {
    const [tasks, setTasks] = useState([]);
    const [newTask, setNewTask] = useState("");
    const [newTaskDays, setNewTaskDays] = useState("");

    // Add task function
    const addTask = () => {
        if (newTask.trim() !== "" && newTaskDays.trim() !== "") {
            const task = {
                id: Date.now(),
                text: newTask,
                daysNeeded: newTaskDays,
                creationDate: new Date().toLocaleDateString(),
                status: "In Progress", // Default status
                dueDate: new Date(new Date().setDate(new Date().getDate() + parseInt(newTaskDays))) // Add due date
            };

            // Update tasks state
            setTasks([...tasks, task]);

            // Reset input fields
            setNewTask(""); 
            setNewTaskDays(""); 
        }
    };

    return (
        <div className="task-card-content">
            <div className="task-card">
                <h2>Task Manager</h2>

                {/* Task Input Form */}
                <div className="task-input">
                    <input
                        type="text"
                        value={newTask}
                        onChange={(e) => setNewTask(e.target.value)}
                        placeholder="Add a new task"
                    />
                    <input
                        type="number"
                        value={newTaskDays}
                        onChange={(e) => setNewTaskDays(e.target.value)}
                        placeholder="Days to complete"
                    />
                    <button onClick={addTask}>Add Task</button>
                </div>

                {/* Display Task List */}
                <TaskList tasks={tasks} setTasks={setTasks} />
            </div>
        </div>
    );
}

export default TaskCard;
