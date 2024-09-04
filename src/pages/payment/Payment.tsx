import { useEffect, useState, useRef } from "react";
import styled from "styled-components";
import { useLocation } from "react-router-dom";
import { formatCurrency } from "util/formatCurrency";

interface Card {
  id: number;
  img: string;
  name: string;
}

const CARD_DATA: Card[] = [
  {
    id: 1,
    img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS7CSl1FTZlb3n9cjxIS-8JtTZY0mLK1-ucbA&s",
    name: "SSAFY",
  },
  {
    id: 2,
    img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRW7Ywl2SlW7v5hO171wEsh3OoHABlxagdwpQ&s",
    name: "11기",
  },
  {
    id: 3,
    img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS9eJg6IqyETzLjkEjcYfEgwA6Zl_3NmsS_eQ&s",
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
  const [rotateImage, setRotateImage] = useState<{ [key: number]: boolean }>(
    {},
  );
  const location = useLocation();

  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const amount = queryParams.get("amount");

    if (amount) {
      setPaymentAmount(amount);

      if (cards.length > 0) {
        setCardAllocations({ [cards[0].id]: amount });
        setSelectedCards(new Set([cards[0].id]));
      }
    }

    const fetchCards = async () => {
      try {
        const response = await fetch("/api/cards");
        const data = await response.json();
        setCards(data);

        if (amount && data.length > 0) {
          setCardAllocations({ [data[0].id]: amount });
          setSelectedCards(new Set([data[0].id]));
        } else {
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

  useEffect(() => {
    const checkImageOrientation = () => {
      cards.forEach((card) => {
        const img = document.getElementById(
          `card-img-${card.id}`,
        ) as HTMLImageElement;

        if (img) {
          img.onload = () => {
            if (img.naturalWidth > img.naturalHeight) {
              setRotateImage((prev) => ({ ...prev, [card.id]: true }));
            } else {
              setRotateImage((prev) => ({ ...prev, [card.id]: false }));
            }
          };
        }
      });
    };

    checkImageOrientation();
  }, [cards]);

  const handleCardAmountChange = (cardId: number, amount: string) => {
    const normalizedAmount = parseFloat(amount).toString();
    setCardAllocations((prev) => ({ ...prev, [cardId]: normalizedAmount }));

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

  const handleCheckboxChange = (cardId: number, checked: boolean) => {
    if (checked) {
      if (parseFloat(cardAllocations[cardId] || "0") === 0) {
        handleCardAmountChange(cardId, "1");
      } else {
        setSelectedCards((prev) => new Set(prev).add(cardId));
      }
    } else {
      setCardAllocations((prev) => ({ ...prev, [cardId]: "0" }));
      setSelectedCards((prev) => {
        const updatedSet = new Set(prev);
        updatedSet.delete(cardId);
        return updatedSet;
      });
    }
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

    console.log("결제 처리 시작:", cardAllocations);
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
          <CardAllocation
            key={card.id}
            selected={selectedCards.has(card.id)}
            rotate={rotateImage[card.id] || false}
          >
            <label>
              <input
                type="checkbox"
                checked={selectedCards.has(card.id)}
                onChange={(e) =>
                  handleCheckboxChange(card.id, e.target.checked)
                }
              />
              <CardImage
                id={`card-img-${card.id}`}
                src={card.img}
                alt={"카드 이미지"}
                rotate={rotateImage[card.id]}
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
      <SubmitButton onClick={handlePayment} disabled={isProcessing}>
        {isProcessing ? "결제 처리 중..." : "결제하기"}
      </SubmitButton>
    </Container>
  );
}

const Container = styled.div`
  max-width: 600px;
  margin: auto;
`;

const CardAllocation = styled.div<{ selected: boolean; rotate: boolean }>`
  margin-bottom: 10px;
  border: ${(props) =>
    props.selected ? "2px solid var(--main-color)" : "1px solid #ccc"};
  padding: 10px;
  border-radius: 8px;

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

const CardImage = styled.img<{ rotate: boolean }>`
  //transform: ${(props) => (props.rotate ? "rotate(90deg)" : "none")};
  max-width: 100px;
  max-height: 100px;
  object-fit: cover;
`;

const SubmitButton = styled.button`
  background-color: var(--main-color);
  border: none;
  display: flex;
  border-radius: 40px;
  width: 600px;
  height: 56px;
  padding: 10px 20px;
  justify-content: center;
  align-items: center;
  gap: 10px;
  cursor: pointer;
  color: white;
  font-size: 20px;
  position: fixed;
  bottom: 50px;
`;
