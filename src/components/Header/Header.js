import React from 'react';
import './Header.css';

function Header() {
    return (
        <header className="header">
            <div className="header-logo">
                <img src="https://cdn.icon-icons.com/icons2/1603/PNG/96/note-task-comment-message-edit-write_108613.png" alt="Task Manager Logo" />
                <h1>Task Manager</h1>
            </div>
            <nav className="header-nav">
                <ul>
                    <li><a href="#home">Home</a></li>
                    <li><a href="#tasks">My Tasks</a></li>
                    <li><a href="#about">About</a></li>
                    <li><a href="#contact">Contact</a></li>
                </ul>
            </nav>
        </header>
    );
}

export default Header;
