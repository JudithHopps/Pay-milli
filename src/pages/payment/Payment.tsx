import { useEffect, useState } from "react";
import styled from "styled-components";

export default function Payment() {
  const [paymentAmount, setPaymentAmount] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("credit_card");
  const [isProcessing, setIsProcessing] = useState(false);

  useEffect(() => {
    // todo: 접근 권한 설정 확인
  }, []);

  const handlePayment = () => {
    setIsProcessing(true);
    // 결제 처리 로직 추가
    // 예: API 호출 등
  };

  return (
    <Container>
      <h1>결제 페이지</h1>
      <div>
        <label>
          결제 금액:
          <input
            type="number"
            value={paymentAmount}
            onChange={(e) => setPaymentAmount(e.target.value)}
            required
          />
        </label>
      </div>
      <div>
        <label>
          결제 방법:
          <select
            value={paymentMethod}
            onChange={(e) => setPaymentMethod(e.target.value)}
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
