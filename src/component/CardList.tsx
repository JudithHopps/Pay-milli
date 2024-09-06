import React from 'react';
import './CardList.css';

interface Card {
  id: number;
  name: string;
  imageUrl: string;
}

interface CardListProps {
  cards: Card[];
  onCardClick: (cardId: number) => void;
  onAddCardClick: () => void;
}

const CardList: React.FC<CardListProps> = ({ cards, onCardClick, onAddCardClick }) => {
  return (
    <div className="card-list">
      {cards.map((card) => (
        <div key={card.id} className="card-item" onClick={() => onCardClick(card.id)}>
          <img src={card.imageUrl} alt={card.name} />
        </div>
      ))}
      <div className="card-item add-card" onClick={onAddCardClick}>
        <div className="add-icon">+</div>
      </div>
    </div>
  );
};

export default CardList;
