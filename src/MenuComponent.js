import React from 'react';

const MenuComponent = ({ selectedCount }) => {
  return (
    <nav className="bg-light p-3">
      <h4>Вибрано товарів: {selectedCount}</h4>
    </nav>
  );
};

export default MenuComponent;