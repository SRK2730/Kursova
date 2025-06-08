import React from 'react';
import { Modal, Button } from 'react-bootstrap';

const FireEmployeeModal = ({ show, employee, onClose, onConfirm }) => {
  if (!employee) return null;
  
  return (
    <Modal show={show} onHide={onClose} centered>
      <Modal.Header closeButton>
        <Modal.Title>Підтвердження звільнення</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className="text-center mb-4">
          <img 
            src={employee.imgurl} 
            alt={employee.name} 
            className="rounded-circle mb-3"
            style={{ width: '100px', height: '100px', objectFit: 'cover' }}
          />
          <h4>{employee.name}</h4>
          <p className="text-muted">{employee.position}, {employee.department}</p>
        </div>
        
        <p className="text-center">
          Ви дійсно бажаєте звільнити цього співробітника? Ця дія є незворотною.
        </p>
      </Modal.Body>
      <Modal.Footer className="justify-content-center">
        <Button variant="secondary" onClick={onClose} className="me-3">
          Скасувати
        </Button>
        <Button variant="danger" onClick={() => onConfirm(employee.id)}>
          <i className="bi bi-person-x me-2"></i>
          Звільнити
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default FireEmployeeModal;