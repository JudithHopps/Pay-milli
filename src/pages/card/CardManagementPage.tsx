import React, { useState } from "react";
import styled from "styled-components";
import CardList from "../../components/card/CardList";
import AddCardForm from "../../components/card/AddCardForm";

export default function CardManagementPage() {
  const [cards, setCards] = useState([
    { id: 1, name: "신한카드", imageUrl: "../../assets/young.png" },
    { id: 2, name: "국민카드", imageUrl: "../../assets/young.png" },
  ]);

  const [showAddCardForm, setShowAddCardForm] = useState(false);

  const handleAddCardClick = () => {
    setShowAddCardForm(true);
  };

  const handleAddCardSubmit = (name: string, imageUrl: string) => {
    const newCard = { id: cards.length + 1, name, imageUrl };
    setCards([...cards, newCard]);
    setShowAddCardForm(false);
  };

  return (
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
  );
}

const CardManagementPageContainer = styled.div`
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
