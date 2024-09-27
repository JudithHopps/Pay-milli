import React from "react";
import styled from "styled-components";
import { CardInfoData } from "../../types/card/cardTypes";

interface CardDetailProps {
  card: CardInfoData | null;
}

const CardDetail: React.FC<CardDetailProps> = ({ card }) => {
  if (!card) {
    return <EmptyState>확인하실 카드를 선택해주세요.</EmptyState>;
  }

  return (
    <CardDetailContainer>
      <CardImage src={card.cardImage} alt={card.cardName} />
      <CardName>{card.cardName}</CardName>
      <CardType>
        {card.cardType === "CREDIT" ? "신용카드" : "체크카드"}
      </CardType>
      <CardLastNum>카드 뒷자리: {card.cardLastNum}</CardLastNum>
    </CardDetailContainer>
  );
};

const CardDetailContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 15px;
  padding: 20px;
  background-color: #f9f9f9;
  border-radius: 8px;
  width: 100%;
`;

const CardImage = styled.img`
  width: 150px;
  height: auto;
  border-radius: 4px;
`;

const CardName = styled.h2`
  font-size: 20px;
  color: #333;
`;

const CardType = styled.div`
  font-size: 16px;
  color: #666;
`;

const CardLastNum = styled.div`
  font-size: 16px;
  color: #666;
`;

const EmptyState = styled.div`
  font-size: 16px;
  color: #999;
  text-align: center;
  padding: 20px;
  border: 1px solid #ddd;
  background-color: #f0f4ff;
`;

export default CardDetail;
