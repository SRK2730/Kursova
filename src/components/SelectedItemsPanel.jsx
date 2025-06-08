import React from 'react';
import { Badge } from 'react-bootstrap';

function SelectedItemsPanel({ employees, tasks }) {
  return (
    <div className="bg-light p-3 mb-4 rounded shadow-sm">
      <h4 className="d-flex justify-content-between align-items-center">
        Вибрані елементи
        <Badge bg="primary" pill>
          {employees.length + tasks.length}
        </Badge>
      </h4>
      
      {employees.length > 0 && (
        <div className="mb-3">
          <h5>Співробітники:</h5>
          <ul className="list-group">
            {employees.map(emp => (
              <li 
                key={`emp-${emp.id}`} 
                className="list-group-item d-flex justify-content-between align-items-center"
              >
                {emp.name} ({emp.position})
                <Badge bg="info" pill>{emp.department}</Badge>
              </li>
            ))}
          </ul>
        </div>
      )}
      
      {tasks.length > 0 && (
        <div>
          <h5>Завдання:</h5>
          <ul className="list-group">
            {tasks.map(task => (
              <li 
                key={`task-${task.id}`} 
                className="list-group-item d-flex justify-content-between align-items-center"
              >
                {task.title} 
                <Badge bg={task.status === 'Завершено' ? 'success' : 'warning'} pill>
                  {task.status}
                </Badge>
              </li>
            ))}
          </ul>
        </div>
      )}
      
      {employees.length === 0 && tasks.length === 0 && (
        <p className="text-muted">Оберіть співробітників та завдання кліком на картках</p>
      )}
    </div>
  );
}

export default SelectedItemsPanel;