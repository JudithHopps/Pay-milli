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
  const [selectedCards, setSelectedCards] = useState<Set<number>>(new Set());
  const location = useLocation();

  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const amount = queryParams.get("amount");

    if (amount) {
      setPaymentAmount(amount);

      // 첫 번째 카드에 전체 금액을 할당
      if (cards.length > 0) {
        setCardAllocations({ [cards[0].id]: amount });
        setSelectedCards(new Set([cards[0].id])); // 첫 번째 카드를 선택 상태로 설정
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
          setSelectedCards(new Set([data[0].id])); // 첫 번째 카드를 선택 상태로 설정
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
    const normalizedAmount = parseFloat(amount).toString();
    setCardAllocations((prev) => ({ ...prev, [cardId]: normalizedAmount }));

    // 금액이 0보다 큰 경우 카드를 선택 상태로 변경
    setSelectedCards((prev) => {
      const updatedSet = new Set(prev);
      if (parseFloat(normalizedAmount) > 0) {
        updatedSet.add(cardId);
      } else {
        updatedSet.delete(cardId);
      }
      return updatedSet;
    });
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
              <input
                type="checkbox"
                checked={selectedCards.has(card.id)}
                onChange={(e) => {
                  if (e.target.checked) {
                    // 카드가 선택될 때, 0원이면 기본값을 1로 설정
                    if (parseFloat(cardAllocations[card.id] || "0") === 0) {
                      handleCardAmountChange(card.id, "1");
                    } else {
                      setSelectedCards((prev) => new Set(prev).add(card.id));
                    }
                  } else {
                    // 카드 선택 해제 시
                    setSelectedCards((prev) => {
                      const updatedSet = new Set(prev);
                      updatedSet.delete(card.id);
                      return updatedSet;
                    });
                  }
                }}
              />
              {card.name}:
              <input
                type="number"
                value={cardAllocations[card.id] || "0"}
                onChange={(e) =>
                  handleCardAmountChange(card.id, e.target.value)
                }
                disabled={!selectedCards.has(card.id)}
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

    input[type="checkbox"] {
      margin-right: 10px;
    }

    input[type="number"] {
      margin-left: 10px;
      width: 100px;
    }
  }
`;
