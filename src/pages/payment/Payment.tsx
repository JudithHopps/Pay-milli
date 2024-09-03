import { useEffect, useState } from "react";
import styled from "styled-components";
import { useLocation } from "react-router-dom";
import { formatCurrency } from "util/formatCurrency";

export default function Payment() {
  const [paymentAmount, setPaymentAmount] = useState("");
  const [paymentStore, setPaymentStore] = useState("credit_card");
  const [isProcessing, setIsProcessing] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const amount = queryParams.get("amount");
    const store = queryParams.get("store");

    if (amount) {
      setPaymentAmount(amount);
    }
    if (store) {
      setPaymentStore(store);
    }
  }, [location.search]);

  const handlePayment = () => {
    setIsProcessing(true);
    // 결제 처리 로직 추가
    // 예: API 호출 등
  };

  return (
    <Container>
      <h1>결제 페이지</h1>
      <div>
        <h1>최종 결제 금액: {formatCurrency(paymentAmount)} </h1>
      </div>
      <div>
        <label>
          결제 방법:
          <select
            value={paymentStore}
            onChange={(e) => setPaymentStore(e.target.value)}
          >
            <option value="credit_card">신용카드</option>
            <option value="bank_transfer">은행 이체</option>
            {/* 다른 결제 방법 추가 */}
          </select>
        </label>
      </div>
      <button onClick={handlePayment} disabled={isProcessing}>
        {isProcessing ? "결제 처리 중..." : "결제하기"}
      </button>
    </Container>
  );
}

const Container = styled.div`
  max-width: 600px;
  margin: auto;
`;
