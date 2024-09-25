import React from "react";
import styled from "styled-components";
import { PaymentItemProps } from "../../types/card/cardTypes";

export default function PaymentItem({
  storeName,
  detail,
  price,
  date,
  paymentStatus,
}: PaymentItemProps) {
  return (
    <PaymentItemContainer>
      <PaymentItemDetail>
        <span>{date}</span>
        <span>{storeName}</span>
        <span>{detail}</span>
        <span>{price.toLocaleString()}원</span>
        <span>{paymentStatus === "payment" ? "결제 완료" : "환불 완료"}</span>
      </PaymentItemDetail>
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

const PaymentItemDetail = styled.div`
  display: flex;
  align-items: center;
`;
