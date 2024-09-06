import React from "react";
import PaymentItem from "../component/PaymentItem";

const PaymentHistoryPage: React.FC = () => {
  const payments = [
    {
      date: "2024-08-30",
      name: "Apple",
      amount: 1000000,
      cards: [
        { cardName: "국민 A 체크카드", amount: 400000 },
        { cardName: "신한 B 신용카드", amount: 600000 },
      ],
    },
    {
      date: "2024-08-29",
      name: "Apple",
      amount: 1500000,
      cards: [
        { cardName: "국민 A 체크카드", amount: 400000 },
        { cardName: "신한 B 신용카드", amount: 600000 },
        { cardName: "하나 C 신용카드", amount: 500000 },
      ],
    },
    {
      date: "2024-08-29",
      name: "롯데백화점",
      amount: 1200000,
      cards: [{ cardName: "우리 D 신용카드", amount: 1200000 }],
    },
  ];

  return (
    <div>
      <h1>{"전체 결제 내역"}</h1>
      {payments.map((payment, index) => (
        <PaymentItem
          key={index}
          date={payment.date}
          name={payment.name}
          amount={payment.amount}
          cards={payment.cards}
        />
      ))}
    </div>
  );
};

export default PaymentHistoryPage;
