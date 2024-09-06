import React, { useEffect, useState } from "react";
import axios from "axios";

import PaymentItem from "../component/PaymentItem";

interface Payment {
  id: string;
  storeName: string;
  detail: string;
  price: number;
  date: string;
  paymentStatus: string;
}

const PaymentHistoryPage: React.FC = () => {
  const [payments, setPayments] = useState<Payment[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  // 백엔드에서 전체 결제 내역을 가져오는 함수
  const fetchPayments = async () => {
    try {
      const response = await axios.get("/payment", {
        headers: {
          accessToken: "qwer1234", // 헤더에 토큰 포함
        },
        params: {
          sort: "desc", // 정렬 방식 예시
          page: 1, // 기본 페이지 번호
          size: 10, // 페이지별 문서 수 (기본값을 10으로 가정)
          startDate: "2024-01-01", // 검색 시작 기간 예시
          endDate: "2024-12-31", // 검색 종료 기간 예시
        },
      });
      if (response.status === 200) {
        setPayments(response.data.transactions); // 백엔드에서 받은 결제 데이터를 상태에 저장
      }
    } catch (error) {
      console.error("결제 내역을 가져오는 중 오류가 발생했습니다:", error);
    } finally {
      setLoading(false);
    }
  };

  // 컴포넌트가 마운트되었을 때 결제 내역을 가져옴
  useEffect(() => {
    fetchPayments();
  }, []);

  if (loading) {
    return <div>로딩 중...</div>;
  }

  return (
    <div>
      <h1>{"전체 결제 내역"}</h1>
      {payments.length === 0 ? (
        <div>결제 내역이 없습니다.</div>
      ) : (
        payments.map((payment) => (
          <PaymentItem
            key={payment.id}
            date={payment.date}
            name={payment.storeName}
            amount={payment.price}
            cards={[]} // 카드 정보는 응답에 없으므로 빈 배열로 설정
          />
        ))
      )}
    </div>
  );

  // const payments = [
  //   {
  //     date: "2024-08-30",
  //     name: "Apple",
  //     amount: 1000000,
  //     cards: [
  //       { cardName: "국민 A 체크카드", amount: 400000 },
  //       { cardName: "신한 B 신용카드", amount: 600000 },
  //     ],
  //   },
  //   {
  //     date: "2024-08-29",
  //     name: "Apple",
  //     amount: 1500000,
  //     cards: [
  //       { cardName: "국민 A 체크카드", amount: 400000 },
  //       { cardName: "신한 B 신용카드", amount: 600000 },
  //       { cardName: "하나 C 신용카드", amount: 500000 },
  //     ],
  //   },
  //   {
  //     date: "2024-08-29",
  //     name: "롯데백화점",
  //     amount: 1200000,
  //     cards: [{ cardName: "우리 D 신용카드", amount: 1200000 }],
  //   },
  // ];

  // return (
  //   <div>
  //     <h1>{"전체 결제 내역"}</h1>
  //     {payments.map((payment, index) => (
  //       <PaymentItem
  //         key={index}
  //         date={payment.date}
  //         name={payment.name}
  //         amount={payment.amount}
  //         cards={payment.cards}
  //       />
  //     ))}
  //   </div>
  // );
};

export default PaymentHistoryPage;
