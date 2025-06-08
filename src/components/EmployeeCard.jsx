import React from 'react';
import { Card, Button } from 'react-bootstrap';
import { FaTimes } from 'react-icons/fa';

function EmployeeCard({ employee, onSelect, onFire, isSelected }) {
  const { id, name, position, department, email, phone, imgurl } = employee;

  const handleContact = (e) => {
    e.stopPropagation();
    alert(`Повідомлення надіслано співробітнику ${name}`);
  };

  return (
    <div className="col-12 col-sm-6 col-md-4 col-lg-3 mb-4">
      <Card 
        onClick={onSelect}
        className={`h-100 employee-card ${isSelected ? 'selected' : ''}`}
        style={{ cursor: 'pointer', position: 'relative' }}
      >
        {/* Кнопка звільнення у верхньому правому куті */}
        <Button 
          variant="outline-danger" 
          className="position-absolute top-0 end-0 m-2 p-1"
          style={{ zIndex: 2, borderRadius: '50%', width: '32px', height: '32px' }}
          onClick={(e) => {
            e.stopPropagation();
            onFire(employee);
          }}
        >
          <FaTimes style={{ marginBottom: '2px' }} />
        </Button>
        
        <div className="card-img-container">
          <Card.Img variant="top" src={imgurl} alt={name} className="card-img-top" />
        </div>
        
        <Card.Body>
          <Card.Title>{name}</Card.Title>
          <Card.Text>
            <strong>Посада:</strong> {position}<br />
            <strong>Відділ:</strong> {department}<br />
            <strong>Email:</strong> {email}<br />
            <strong>Телефон:</strong> {phone}
          </Card.Text>
          
          <div className="d-grid">
            <Button variant="primary" onClick={handleContact} className="w-100">
              Надіслати повідомлення
            </Button>
          </div>
        </Card.Body>
      </Card>
    </div>
  );
}

export default EmployeeCard;