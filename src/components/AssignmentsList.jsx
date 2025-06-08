import React from 'react';
import { Card, Badge } from 'react-bootstrap';

const AssignmentsList = ({ assignments }) => {
  if (assignments.length === 0) {
    return (
      <section className="mb-5">
        <h2>Призначення</h2>
        <div className="text-center text-muted p-4 border rounded">
          <i className="bi bi-inbox fs-1"></i>
          <p>Призначень ще немає</p>
          <small>Оберіть співробітників та завдання, щоб створити призначення</small>
        </div>
      </section>
    );
  }

  return (
    <section className="mb-5">
      <h2>Призначення</h2>
      <div className="row">
        {assignments.map(assignment => (
          <div key={assignment.id} className="col-12 col-md-6 col-lg-4 mb-4">
            <Card className="h-100 shadow-sm">
              <Card.Header className="bg-primary text-white">
                <Card.Title>{assignment.name}</Card.Title>
                <small className="d-block">
                  {new Date(assignment.createdAt).toLocaleDateString()}
                </small>
              </Card.Header>
              <Card.Body>
                <h5>Співробітники:</h5>
                <ul className="list-group list-group-flush mb-3">
                  {assignment.employees.map(employee => (
                    <li key={employee.id} className="list-group-item d-flex justify-content-between align-items-center">
                      {employee.name}
                      <Badge bg="info" pill>{employee.position}</Badge>
                    </li>
                  ))}
                </ul>
                
                <h5>Завдання:</h5>
                <ul className="list-group list-group-flush">
                  {assignment.tasks.map(task => (
                    <li key={task.id} className="list-group-item d-flex justify-content-between align-items-center">
                      {task.title}
                      <Badge 
                        bg={task.status === 'Завершено' ? 'success' : 'warning'} 
                        pill
                      >
                        {task.status}
                      </Badge>
                    </li>
                  ))}
                </ul>
              </Card.Body>
            </Card>
          </div>
        ))}
      </div>
    </section>
  );
};

export default AssignmentsList;