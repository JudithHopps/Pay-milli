import React, { useState } from "react";
import styled from "styled-components";
import CardList from "../../components/card/CardList";
import AddCardForm from "../../components/card/AddCardForm";
import NavBar from "components/layout/NavBar";

export default function CardManagementPage() {
  const [showAddCardForm, setShowAddCardForm] = useState(false);

  const [cards, setCards] = useState([
    { id: 1, name: "신한카드", imageUrl: "../../assets/young.png" },
  ]);

  const handleAddCardClick = () => {
    setShowAddCardForm(true);
  };

  const handleAddCardSubmit = (name: string, imageUrl: string) => {
    const newCard = { id: cards.length + 1, name, imageUrl };
    setCards([...cards, newCard]);
    setShowAddCardForm(false);
  };

  return (
    <>
      <NavBar />
      <CardManagementPageContainer>
        <LeftSection>
          <CardList
            cards={cards}
            onCardClick={() => {}}
            onAddCardClick={handleAddCardClick}
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
`;

const LeftSection = styled.div`
  width: 30%;
`;

const RightSection = styled.div`
  width: 65%;
`;
