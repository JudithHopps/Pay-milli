import React, { useEffect, useState } from "react";
import styled from "styled-components";
import PaymentItem, {
  PaymentItemProps,
} from "../../components/card/PaymentItem";
import axios from "axios";

export default function PaymentHistoryPage() {
  const [paymentsdata, setPayments] = useState<PaymentItemProps[]>([]);
  const [loading, setLoading] = useState(true);

  const accessToken = localStorage.getItem("accessToken");

  const fetchPayments = async () => {
    try {
      const response = await axios.get(
        "http://j11a702.p.ssafy.io/api/v1/paymilli/payment",
        {
          headers: {
            accessToken,
          },
        },
      );
      if (response.status === 200) {
        setPayments(response.data.transactions);
      }
    } catch (error) {
      console.error("Error fetching payment data:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPayments();
  }, []);

  if (loading) {
    return <div>로딩 중...</div>;
  }

  return (
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
  );
}

const PaymentHistoryContainer = styled.div`
  margin: 20px auto;
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
