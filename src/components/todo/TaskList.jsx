import React from 'react';
import Task from './Task';

const TaskList = ({ tasks, onDelete, onToggle }) => {
  if (tasks.length === 0) {
    return (
      <div className="text-center p-4 text-muted">
        <i className="bi bi-inbox fs-1"></i>
        <p>Задач немає</p>
        <small>Створіть призначення, щоб додати задачі</small>
      </div>
    );
  }

  return (
    <div className="task-list">
      {tasks.map(task => (
        <Task 
          key={task.id} 
          task={task} 
          onDelete={onDelete} 
          onToggle={onToggle} 
        />
      ))}
    </div>
  );
};

export default TaskList;