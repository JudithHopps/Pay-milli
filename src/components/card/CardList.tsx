import React from "react";
import styled from "styled-components";

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

export default function CardList({
  cards,
  onCardClick,
  onAddCardClick,
}: CardListProps) {
  return (
    <CardListContainer>
      <AddCardItem onClick={onAddCardClick}>
        <AddIcon>+</AddIcon>
      </AddCardItem>
      {cards.map((card) => (
        <CardItem key={card.id} onClick={() => onCardClick(card.id)}>
          <CardImage src={card.imageUrl} alt={card.name} />
        </CardItem>
      ))}
    </CardListContainer>
  );
}

const CardListContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  height: auto;
  padding: 0;
  overflow: visible;
`;

const CardItem = styled.div`
  width: 200px;
  height: 120px;
  background-color: #f0f0f0;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  border: none;
  box-shadow: none;
`;

const CardImage = styled.img`
  width: 100%;
  height: auto;
`;

const AddCardItem = styled(CardItem)`
  border: 2px dashed #999;
`;

const AddIcon = styled.div`
  font-size: 24px;
`;
