import React, { useState } from "react";
import styled from "styled-components";

interface AddCardFormProps {
  onSubmit: (name: string, imageUrl: string) => void;
  onCancel: () => void;
}

export default function AddCardForm({ onSubmit, onCancel }: AddCardFormProps) {
  const [cardType, setCardType] = useState("체크카드");
  const [cardNumber, setCardNumber] = useState(["", "", "", ""]);
  const [expiryDate, setExpiryDate] = useState("");
  const [cvc, setCvc] = useState("");
  const [password, setPassword] = useState("");

  const handleCardNumberChange = (index: number, value: string) => {
    const newCardNumber = [...cardNumber];
    newCardNumber[index] = value;
    setCardNumber(newCardNumber);
  };

  const handleSubmit = () => {
    onSubmit("새로운 카드", "/images/new_card.png");
  };

  return (
    <FormContainer>
      <Title>카드 정보를 입력해 주세요.</Title>
      <CardTypeContainer>
        <label>
          <input
            type="radio"
            value="체크카드"
            checked={cardType === "체크카드"}
            onChange={(e) => setCardType(e.target.value)}
          />
          체크카드
        </label>
        <label>
          <input
            type="radio"
            value="신용카드"
            checked={cardType === "신용카드"}
            onChange={(e) => setCardType(e.target.value)}
          />
          신용카드
        </label>
      </CardTypeContainer>

      <CardNumberContainer>
        <label>카드 번호</label>
        <div>
          {cardNumber.map((num, index) => (
            <CardInput
              key={index}
              type="text"
              maxLength={4}
              value={num}
              onChange={(e) => handleCardNumberChange(index, e.target.value)}
            />
          ))}
        </div>
      </CardNumberContainer>

      <InputContainer>
        <label>유효기간</label>
        <InputField
          type="text"
          placeholder="MM/YY"
          value={expiryDate}
          onChange={(e) => setExpiryDate(e.target.value)}
        />
      </InputContainer>

      <InputContainer>
        <label>CVC</label>
        <InputField
          type="text"
          maxLength={3}
          value={cvc}
          onChange={(e) => setCvc(e.target.value)}
        />
      </InputContainer>

      <InputContainer>
        <label>카드 비밀번호</label>
        <InputField
          type="password"
          maxLength={4}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </InputContainer>

      <ButtonContainer>
        <Button onClick={handleSubmit}>등록</Button>
        <CancelButton onClick={onCancel}>취소</CancelButton>
      </ButtonContainer>
    </FormContainer>
  );
}

const FormContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 15px;
  background-color: #f9f9f9;
  padding: 20px;
  border-radius: 8px;
`;

const Title = styled.h2`
  font-size: 18px;
  margin-bottom: 15px;
`;

const CardTypeContainer = styled.div`
  display: flex;
  gap: 10px;
`;

const CardNumberContainer = styled.div`
  margin-top: 10px;
`;

const CardInput = styled.input`
  width: 60px;
  padding: 5px;
  margin-right: 5px;
`;

const InputContainer = styled.div`
  margin-top: 10px;

  label {
    margin-bottom: 5px;
  }
`;

const InputField = styled.input`
  width: 100%;
  padding: 5px;
`;

const ButtonContainer = styled.div`
  margin-top: 20px;
  display: flex;
  justify-content: flex-start;
`;

const Button = styled.button`
  padding: 10px;
  margin-right: 10px;
  background-color: #007bff;
  color: white;
  border: none;
  cursor: pointer;
`;

const CancelButton = styled(Button)`
  background-color: #ddd;
  color: black;
`;
