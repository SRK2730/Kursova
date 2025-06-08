import React from 'react';
import { Card } from 'react-bootstrap';

function TaskCard({ task, onSelect, isSelected }) {
  const { id, title, description, assignee, dueDate, status, imgurl } = task;

  return (
    <div className="col-12 col-sm-6 col-md-4 col-lg-3 mb-4">
      <Card 
        onClick={onSelect}
        className={`h-100 task-card ${isSelected ? 'border-success border-3' : ''}`}
        style={{ cursor: 'pointer' }}
      >
        <div className="card-img-container">
          <Card.Img variant="top" src={imgurl} alt={title} className="card-img-top" />
        </div>
        <Card.Body>
          <Card.Title>{title}</Card.Title>
          <Card.Text>
            {description}<br />
            <strong>Виконує:</strong> {assignee}<br />
            <strong>Термін:</strong> {dueDate}<br />
            <strong>Статус:</strong> {status}
          </Card.Text>
        </Card.Body>
      </Card>
    </div>
  );
}

export default TaskCard;