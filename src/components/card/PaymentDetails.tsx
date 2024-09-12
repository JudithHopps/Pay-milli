import React from "react";
import styled from "styled-components";

export default function PaymentDetails({ payments }: PaymentDetailsProps) {
  return (
    <PaymentDetailsContainer>
      {payments.map((payment, index) => (
        <PaymentDetail key={index}>
          <span>{payment.date}</span>
          <span>{payment.description}</span>
          <span>{payment.amount.toLocaleString()}원</span>
          <span>잔액 {payment.balance.toLocaleString()}원</span>
        </PaymentDetail>
      ))}
    </PaymentDetailsContainer>
  );
}

interface Payment {
  date: string;
  description: string;
  amount: number;
  balance: number;
}

interface PaymentDetailsProps {
  payments: Payment[];
}

const PaymentDetailsContainer = styled.div`
  margin-top: 20px;
`;

const PaymentDetail = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 10px;
`;
