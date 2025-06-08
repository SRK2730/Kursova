import React from 'react';
import { Button, Card } from "react-bootstrap";

const CardItemComponent = ({ card, onSelect, isSelected }) => {
  const addItem = () => {
    onSelect(card); // Передаємо вибраний елемент у батьківський компонент
  };

  return (
    <div className="col-12 col-sm-6 col-md-4 col-lg-3 mb-4">
      <Card style={{ border: isSelected ? '3px solid green' : 'none' }}>
        <Card.Img variant="top" src={card.imgurl} />
        <Card.Body>
          <Card.Title>{card.name}</Card.Title>
          <Card.Text>
            <strong>{card.price} грн.</strong>
          </Card.Text>
          <Button variant="success" onClick={addItem}>
            {isSelected ? 'Вибрано ✔' : 'Додати'}
          </Button>
        </Card.Body>
      </Card>
    </div>
  );
};

export default CardItemComponent;