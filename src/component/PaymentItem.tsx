import React from "react";
import "./PaymentItem.css";

interface PaymentItemProps {
  date: string;
  name: string;
  amount: number;
  cards: { cardName: string; amount: number }[];
}

const PaymentItem: React.FC<PaymentItemProps> = ({
  date,
  name,
  amount,
  cards,
}) => {
  return (
    <div className={"payment-item"}>
      <div className={"payment-item-header"}>
        <span className={"payment-date"}>{date}</span>
      </div>
      <div className={"payment-item-content"}>
        <div className={"payment-item-detail"}>
          <span className={"payment-item-name"}>{name}</span>
          <span className={"payment-item-amount"}>
            {amount.toLocaleString()}
            {"원\r"}
          </span>
        </div>
        <div className={"payment-item-cards"}>
          {cards.map((card, index) => (
            <div key={index} className={"payment-card-detail"}>
              <span>{card.cardName}</span>
              <span>
                {card.amount.toLocaleString()}
                {"원"}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PaymentItem;
