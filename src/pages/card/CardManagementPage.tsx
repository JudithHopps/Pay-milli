import React, { useState, useEffect } from "react";
import styled from "styled-components";
import CardList from "../../components/card/CardList";
import AddCardForm from "../../components/card/AddCardForm";
import CardDetail from "../../components/card/CardDetail";
import NavBar from "components/layout/NavBar";
import { AddCardFormData, CardInfoData } from "../../types/card/cardTypes";
import { getCardListAPI, addCardAPI } from "../../api/cardApi";

export default function CardManagementPage() {
  const [showAddCardForm, setShowAddCardForm] = useState(false);
  const [cards, setCards] = useState<CardInfoData[]>([]);
  const [selectedCard, setSelectedCard] = useState<CardInfoData | null>(null);
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
          cardId: card.cardId,
          cardName: `${card.cardName} (끝자리 ${card.cardLastNum})`,
          cardType: card.cardType,
          cardLastNum: card.cardLastNum,
          cardImage: card.cardImage,
        })),
      );
    } catch (error) {
      console.error("Error fetching card list:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleCardClick = (cardId: string) => {
    const clickedCard = cards.find((card) => card.cardId === cardId);
    if (clickedCard) {
      setSelectedCard(clickedCard);
      setShowAddCardForm(false);
    }
  };

  const handleAddCardSubmit = async (formData: AddCardFormData) => {
    try {
      const accessToken = localStorage.getItem("accessToken");
      if (!accessToken) {
        throw new Error("Access token is missing");
      }

      const newCardFromServer: CardInfoData = await addCardAPI(
        accessToken,
        formData,
      );

      setCards([...cards, newCardFromServer]);
      setSelectedCard(newCardFromServer);
      setShowAddCardForm(false);
    } catch (error) {
      console.error("Error adding new card:", error);
    }
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
            onCardClick={handleCardClick}
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
          {!showAddCardForm && <CardDetail card={selectedCard} />}
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
