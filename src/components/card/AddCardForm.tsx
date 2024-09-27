import React, { useState } from "react";
import styled from "styled-components";
import { AddCardFormData } from "../../types/card/cardTypes";

interface AddCardFormProps {
  onSubmit: (formData: AddCardFormData) => void;
  onCancel: () => void;
}

export default function AddCardForm({ onSubmit, onCancel }: AddCardFormProps) {
  const [cardNumber, setCardNumber] = useState(["", "", "", ""]);
  const [expiryDate, setExpiryDate] = useState("");
  const [cvc, setCvc] = useState("");
  const [password, setPassword] = useState("");
  const [cardHolderName, setCardHolderName] = useState("");

  const handleCardNumberChange = (index: number, value: string) => {
    const newCardNumber = [...cardNumber];
    if (/^[0-9]*$/.test(value)) {
      newCardNumber[index] = value;
      setCardNumber(newCardNumber);
    }
  };

  const handleExpiryDateChange = (value: string) => {
    const formattedValue = value.replace(/\D/g, "").slice(0, 4);
    if (formattedValue.length >= 3) {
      setExpiryDate(`${formattedValue.slice(0, 2)}/${formattedValue.slice(2)}`);
    } else {
      setExpiryDate(formattedValue);
    }
  };

  const handleCvcChange = (value: string) => {
    if (/^[0-9]*$/.test(value) && value.length <= 3) {
      setCvc(value);
    }
  };

  const handlePasswordChange = (value: string) => {
    if (/^[0-9]*$/.test(value) && value.length <= 2) {
      setPassword(value);
    }
  };

  const handleCardHolderNameChange = (value: string) => {
    setCardHolderName(value);
  };

  const handleSubmit = () => {
    const formData: AddCardFormData = {
      cardNumber: cardNumber.join(""),
      cvc,
      expirationDate: expiryDate.replace("/", ""),
      cardHolderName,
      cardPassword: password,
    };
    onSubmit(formData);
  };

  return (
    <FormContainer>
      <Title>카드 정보를 입력해 주세요.</Title>
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
        <div>
          <ExpiryInputField
            type="text"
            placeholder="MM/YY"
            value={expiryDate}
            onChange={(e) => handleExpiryDateChange(e.target.value)}
          />
        </div>
      </InputContainer>

      <InputContainer>
        <label>CVC</label>
        <div>
          <CvcInputField
            type="password"
            maxLength={3}
            value={cvc}
            onChange={(e) => handleCvcChange(e.target.value)}
          />
        </div>
      </InputContainer>

      <InputContainer>
        <label>카드 비밀번호 (앞2자리)</label>
        <div>
          <PasswordInputField
            type="password"
            maxLength={4}
            value={password}
            onChange={(e) => handlePasswordChange(e.target.value)}
          />
        </div>
      </InputContainer>

      <InputContainer>
        <label>카드 소유자 이름</label>
        <div>
          <NameInputField
            type="text"
            value={cardHolderName}
            onChange={(e) => handleCardHolderNameChange(e.target.value)}
          />
        </div>
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

const ExpiryInputField = styled(InputField)`
  width: 80px;
`;

const CvcInputField = styled(InputField)`
  width: 60px;
`;

const PasswordInputField = styled(InputField)`
  width: 50px;
`;

const NameInputField = styled(InputField)`
  width: 80px;
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
