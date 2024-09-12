import React from "react";
import styled from "styled-components";
import PaymentItem from "../../components/card/PaymentItem";

export default function PaymentHistoryPage() {
  const Initialpaymentsdata = [
    {
      date: "2024-08-30",
      name: "Apple",
      amount: 1000000,
      cards: [
        { cardName: "국민 A ddd체크카드", amount: 400000 },
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
    <PaymentHistoryContainer>
      <h1>전체 결제 내역</h1>
      <PaymentSummary>총 승인 {Initialpaymentsdata.length}건</PaymentSummary>
      <hr />
      {Initialpaymentsdata.length === 0 ? (
        <NoData>조회된 거래내역이 없습니다.</NoData>
      ) : (
        Initialpaymentsdata.map((Initialpaymentsdata, index) => (
          <PaymentItem
            key={index}
            date={Initialpaymentsdata.date}
            name={Initialpaymentsdata.name}
            amount={Initialpaymentsdata.amount}
            cards={Initialpaymentsdata.cards}
          />
        ))
      )}
      <hr />
    </PaymentHistoryContainer>
  );
}

const PaymentHistoryContainer = styled.div`
  margin: 20px;
  font-family: Arial, sans-serif;
`;

const PaymentSummary = styled.div`
  font-size: 16px;
  margin-bottom: 10px;
`;

const NoData = styled.div`
  text-align: center;
  font-size: 18px;
  color: #666;
  padding: 50px 0;
  border: 1px solid #ddd;
`;

const Hr = styled.hr`
  border: none;
  border-top: 1px solid #ddd;
  margin: 20px 0;
`;
