import React, { useState } from 'react';
import CardList from '../component/CardList';
import AddCardForm from '../component/AddCardForm';
import './CardManagementPage.css';

const CardManagementPage: React.FC = () => {
  const [cards, setCards] = useState([
    { id: 1, name: '신한카드', imageUrl: '/images/card1.png' },
    { id: 2, name: '국민카드', imageUrl: '/images/card2.png' },
  ]);

  const [showAddCardForm, setShowAddCardForm] = useState(false);

  const handleAddCardClick = () => {
    setShowAddCardForm(true);
  };

  const handleAddCardSubmit = (name: string, imageUrl: string) => {
    const newCard = { id: cards.length + 1, name, imageUrl };
    setCards([...cards, newCard]);
    setShowAddCardForm(false);
  };

  return (
    <div className="card-management-page">
      <div className="left-section">
        <CardList
          cards={cards}
          onCardClick={() => {}}
          onAddCardClick={handleAddCardClick}
        />
      </div>
      <div className="right-section">
        {showAddCardForm && (
          <AddCardForm
            onSubmit={handleAddCardSubmit}
            onCancel={() => setShowAddCardForm(false)}
          />
        )}
      </div>
    </div>
  );
};

export default CardManagementPage;
