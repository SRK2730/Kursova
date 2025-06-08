import React from 'react';
import { Form, Button, Row, Col } from 'react-bootstrap';

const HireEmployeeForm = ({ show, onClose, onSubmit }) => {
  const [formData, setFormData] = React.useState({
    name: '',
    position: '',
    department: 'IT',
    email: '',
    phone: '',
    imgurl: 'https://cdn-icons-png.flaticon.com/512/4140/4140047.png'
  });

  const departments = [
    'IT', 'Відділ продажів', 'Фінанси', 'Маркетинг', 
    'Аналітика', 'HR', 'Розробка', 'Правовий відділ'
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
    setFormData({
      name: '',
      position: '',
      department: 'IT',
      email: '',
      phone: '',
      imgurl: 'https://cdn-icons-png.flaticon.com/512/4140/4140047.png'
    });
  };

  if (!show) return null;

  return (
    <div className="card mb-4 p-4 shadow">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h3>Найм нового співробітника</h3>
        <Button variant="outline-secondary" onClick={onClose}>
          <i className="bi bi-x-lg"></i>
        </Button>
      </div>
      
      <Form onSubmit={handleSubmit}>
        <Row>
          <Col md={6}>
            <Form.Group className="mb-3">
              <Form.Label>Повне ім'я</Form.Label>
              <Form.Control
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                placeholder="Іван Петренко"
              />
            </Form.Group>
          </Col>
          
          <Col md={6}>
            <Form.Group className="mb-3">
              <Form.Label>Посада</Form.Label>
              <Form.Control
                type="text"
                name="position"
                value={formData.position}
                onChange={handleChange}
                required
                placeholder="Менеджер"
              />
            </Form.Group>
          </Col>
        </Row>
        
        <Row>
          <Col md={6}>
            <Form.Group className="mb-3">
              <Form.Label>Відділ</Form.Label>
              <Form.Select 
                name="department" 
                value={formData.department} 
                onChange={handleChange}
                required
              >
                {departments.map(dept => (
                  <option key={dept} value={dept}>{dept}</option>
                ))}
              </Form.Select>
            </Form.Group>
          </Col>
          
          <Col md={6}>
            <Form.Group className="mb-3">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                placeholder="ivan@example.com"
              />
            </Form.Group>
          </Col>
        </Row>
        
        <Row>
          <Col md={6}>
            <Form.Group className="mb-3">
              <Form.Label>Телефон</Form.Label>
              <Form.Control
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                required
                placeholder="+380991234567"
              />
            </Form.Group>
          </Col>
          
          <Col md={6}>
            <Form.Group className="mb-3">
              <Form.Label>Фото (URL)</Form.Label>
              <Form.Control
                type="url"
                name="imgurl"
                value={formData.imgurl}
                onChange={handleChange}
                placeholder="Посилання на фото"
              />
            </Form.Group>
          </Col>
        </Row>
        
        <div className="text-center mt-4">
          <Button variant="success" type="submit" size="lg">
            <i className="bi bi-person-plus me-2"></i>
            Найняти співробітника
          </Button>
        </div>
      </Form>
    </div>
  );
};

export default HireEmployeeForm;