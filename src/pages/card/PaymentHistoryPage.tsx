import React, { useEffect, useState } from "react";
import styled from "styled-components";
import PaymentItem from "../../components/card/PaymentItem";
import NavBar from "components/layout/NavBar";
import { PaymentItemProps } from "../../types/card/cardTypes";
import { PaymentHistory } from "../../api/cardApi";

export default function PaymentHistoryPage() {
  const [paymentsdata, setPayments] = useState<PaymentItemProps[]>([]);
  const [loading, setLoading] = useState(true);

  const accessToken = localStorage.getItem("accessToken");

  const loadPayments = async () => {
    try {
      const transactions = await PaymentHistory(accessToken || "");
      setPayments(transactions);
    } catch (error) {
      console.error("Error fetching payment data:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadPayments();
  }, []);

  if (loading) {
    return <div>로딩 중...</div>;
  }

  return (
    <>
      <NavBar />
      <PaymentHistoryContainer>
        <PaymentSummary>총 승인 {paymentsdata.length}건</PaymentSummary>
        <hr />
        {paymentsdata.length === 0 ? (
          <NoData>조회된 거래내역이 없습니다.</NoData>
        ) : (
          paymentsdata.map((paymentsdata, index) => (
            <PaymentItem
              key={index}
              storeName={paymentsdata.storeName}
              detail={paymentsdata.detail}
              price={paymentsdata.price}
              date={paymentsdata.date}
              paymentStatus={paymentsdata.paymentStatus}
            />
          ))
        )}
        <hr />
      </PaymentHistoryContainer>
    </>
  );
}

const PaymentHistoryContainer = styled.div`
  margin: 20px;
  font-family: Arial, sans-serif;
  width: 700px;
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
  background-color: #f0f4ff;
`;

const Hr = styled.hr`
  border: none;
  border-top: 1px solid #ddd;
  margin: 20px 0;
`;
