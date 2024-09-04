import { useEffect, useState } from "react";
import styled from "styled-components";
import { useLocation } from "react-router-dom";
import { formatCurrency } from "util/formatCurrency";

interface Card {
  id: number;
  name: string;
}

const CARD_DATA: Card[] = [
  {
    id: 1,
    name: "SSAFY",
  },
  {
    id: 2,
    name: "11기",
  },
  {
    id: 3,
    name: "서울",
  },
];

export default function Payment() {
  const [paymentAmount, setPaymentAmount] = useState<string>("");
  const [isProcessing, setIsProcessing] = useState<boolean>(false);
  const [cards, setCards] = useState<Card[]>(CARD_DATA);
  const [cardAllocations, setCardAllocations] = useState<{
    [key: string]: string;
  }>({});
  const location = useLocation();

  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const amount = queryParams.get("amount");

    if (amount) {
      setPaymentAmount(amount);

      // 첫 번째 카드에 전체 금액을 할당
      if (cards.length > 0) {
        setCardAllocations({ [cards[0].id]: amount });
      }
    }

    // 카드 목록을 API 호출로 가져오기
    const fetchCards = async () => {
      try {
        const response = await fetch("/api/cards"); // 카드 API 호출
        const data = await response.json();
        setCards(data);

        // 첫 번째 카드에 전체 금액을 세팅
        if (amount && data.length > 0) {
          setCardAllocations({ [data[0].id]: amount });
        } else {
          // 각 카드에 0원 설정
          const initialAllocations = data.reduce(
            (acc: { [key: string]: string }, card: Card) => {
              acc[card.id] = "0";
              return acc;
            },
            {},
          );
          setCardAllocations(initialAllocations);
        }
      } catch (error) {
        console.error("카드 목록 가져오기 실패:", error);
      }
    };

    fetchCards();
  }, [location.search]);

  const handleCardAmountChange = (cardId: number, amount: string) => {
    // 입력값이 숫자로 변환될 수 있는지 확인하고, 앞에 0이 없도록 처리
    const normalizedAmount = parseFloat(amount).toString();

    setCardAllocations((prev) => ({ ...prev, [cardId]: normalizedAmount }));
  };

  const handlePayment = () => {
    const totalAllocatedAmount = Object.values(cardAllocations).reduce(
      (acc, amount) => acc + parseFloat(amount),
      0,
    );

    if (totalAllocatedAmount !== parseFloat(paymentAmount)) {
      alert("각 카드에 분배된 금액의 합이 총 결제 금액과 일치해야 합니다.");
      return;
    }

    setIsProcessing(true);

    // 결제 처리 로직 추가: 각 카드에 대해 분배된 금액을 API로 전송
    console.log("결제 처리 시작:", cardAllocations);

    // 결제 완료 후 상태 리셋 등 추가 처리 필요
  };

  return (
    <Container>
      <h1>결제 페이지</h1>
      <div>
        <h2>최종 결제 금액: {formatCurrency(paymentAmount)}</h2>
      </div>
      <div>
        <h2>카드 선택:</h2>
        {cards.map((card) => (
          <CardAllocation key={card.id}>
            <label>
              {card.name}:
              <input
                type="number"
                value={cardAllocations[card.id] || "0"}
                onChange={(e) =>
                  handleCardAmountChange(card.id, e.target.value)
                }
              />
            </label>
          </CardAllocation>
        ))}
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

const CardAllocation = styled.div`
  margin-bottom: 10px;

  label {
    display: flex;
    align-items: center;

    input {
      margin-left: 10px;
      width: 100px;
    }
  }
`;
