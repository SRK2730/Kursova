import React from 'react';
import Button from '../base/Button';
import Checkbox from '../base/Checkbox';

const Task = ({ task, onDelete, onToggle }) => {
  return (
    <div className="d-flex justify-content-between align-items-center p-2 border-bottom">
      <div className="d-flex align-items-center">
        <Checkbox
          id={`task-${task.id}`}
          checked={task.completed}
          onChange={() => onToggle(task.id)}
          className="me-3"
        />
        <span className={task.completed ? 'text-decoration-line-through text-muted' : ''}>
          {task.name}
        </span>
      </div>
      <Button 
        variant="danger" 
        size="sm"
        onClick={() => onDelete(task.id)}
      >
        <i className="bi bi-trash"></i>
      </Button>
    </div>
  );
};

export default Task;



