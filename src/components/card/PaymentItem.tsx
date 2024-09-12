import React from "react";
import styled from "styled-components";

interface CardPayment {
  cardName: string;
  amount: number;
}

interface PaymentItemProps {
  date: string;
  name: string;
  amount: number;
  cards: CardPayment[];
}

export default function PaymentItem({
  date,
  name,
  amount,
  cards,
}: PaymentItemProps) {
  return (
    <PaymentItemContainer>
      <PaymentItemHeader>
        <PaymentDate>{date}</PaymentDate>
      </PaymentItemHeader>
      <PaymentItemContent>
        <PaymentItemDetail>
          <PaymentItemName>{name}</PaymentItemName>
          <PaymentItemAmount>{amount.toLocaleString()}원</PaymentItemAmount>
        </PaymentItemDetail>
        <PaymentItemCards>
          {cards.map((card, index) => (
            <PaymentCardDetail key={index}>
              <span>{card.cardName}</span>
              <span>{card.amount.toLocaleString()}원</span>
            </PaymentCardDetail>
          ))}
        </PaymentItemCards>
      </PaymentItemContent>
    </PaymentItemContainer>
  );
}

const PaymentItemContainer = styled.div`
  background-color: #f0f4ff;
  padding: 10px;
  margin-bottom: 10px;
  border-radius: 8px;
  display: flex;
  flex-direction: column;
`;

const PaymentItemHeader = styled.div`
  margin-bottom: 8px;
`;

const PaymentDate = styled.span`
  font-size: 14px;
  color: #333;
`;

const PaymentItemContent = styled.div`
  display: flex;
  justify-content: space-between;
`;

const PaymentItemDetail = styled.div`
  display: flex;
  align-items: center;
`;

const PaymentItemName = styled.span`
  font-weight: bold;
  margin-right: 10px;
  font-size: 16px;
`;

const PaymentItemAmount = styled.span`
  font-size: 16px;
`;

const PaymentItemCards = styled.div`
  display: flex;
  flex-direction: column;
`;

const PaymentCardDetail = styled.div`
  display: flex;
  justify-content: space-between;
  font-size: 14px;
  margin-top: 5px;
`;
