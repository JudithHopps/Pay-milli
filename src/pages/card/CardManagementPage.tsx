import React, { useState, useEffect } from "react";
import styled from "styled-components";
import CardList from "../../components/card/CardList";
import AddCardForm from "../../components/card/AddCardForm";
import NavBar from "components/layout/NavBar";
import { AddCardFormData, CardInfoData } from "../../types/card/cardTypes";
import { getCardListAPI } from "../../api/cardApi";

export default function CardManagementPage() {
  const [showAddCardForm, setShowAddCardForm] = useState(false);
  const [cards, setCards] = useState<CardInfoData[]>([]);
  const [loading, setLoading] = useState(true);

  const getCardList = async () => {
    try {
      const accessToken = localStorage.getItem("accessToken");
      if (!accessToken) {
        throw new Error("Access token is missing");
      }

      const cardsData = await getCardListAPI(accessToken);

      setCards(
        cardsData.map((card: CardInfoData) => ({
          id: card.cardId,
          name: `${card.cardName} (끝자리 ${card.cardLastNum})`,
          imageUrl: card.cardImage,
        })),
      );
    } catch (error) {
      console.error("Error fetching card list:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleAddCardSubmit = (formData: AddCardFormData) => {
    const newCard: CardInfoData = {
      cardId: `${cards.length + 1}`,
      cardName: formData.cardHolderName,
      cardType: "CREDIT",
      cardLastNum: formData.cardNumber.slice(-4),
      cardImage: "/images/new_card.png",
    };

    setCards([...cards, newCard]);
    setShowAddCardForm(false);
  };

  useEffect(() => {
    getCardList();
  }, []);

  if (loading) {
    return <div>로딩 중...</div>;
  }

  return (
    <>
      <NavBar />
      <CardManagementPageContainer>
        <LeftSection>
          <CardList
            cards={cards}
            onCardClick={() => {}}
            onAddCardClick={() => setShowAddCardForm(true)}
          />
        </LeftSection>
        <RightSection>
          {showAddCardForm && (
            <AddCardForm
              onSubmit={handleAddCardSubmit}
              onCancel={() => setShowAddCardForm(false)}
            />
          )}
        </RightSection>
      </CardManagementPageContainer>
    </>
  );
}

const CardManagementPageContainer = styled.div`
  margin: 150px auto;
  display: flex;
  justify-content: space-between;
  padding: 20px;
  width: 800px;
  margin: 0 auto;
  margin-top: 120px;
`;

const LeftSection = styled.div`
  width: 30%;
`;

const RightSection = styled.div`
  width: 65%;
`;
