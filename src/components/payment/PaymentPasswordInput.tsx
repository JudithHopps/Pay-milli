import React, { useState } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import BackIcon from "../common/BackIcon";

interface PaymentPasswordInputProps {
  nickName: string;
  onSubmit: (password: string) => void;
}

export default function PaymentPasswordInput({
  nickName,
  onSubmit,
}: PaymentPasswordInputProps) {
  const [password, setPassword] = useState<string>("");
  const navigate = useNavigate();

  const handleNumberClick = (num: string) => {
    if (password.length < 6) {
      setPassword((prev) => prev + num);
    }
    if (password.length === 5) {
      onSubmit(password + num);
    }
  };

  const handleDeleteClick = () => {
    setPassword((prev) => prev.slice(0, -1));
  };

  const handleClearClick = () => {
    setPassword("");
  };

  const handleBackClick = () => {
    navigate(-1);
  };

  return (
    <Wrapper>
      <Content>
        <BackButton onClick={handleBackClick}>
          <BackIcon />
        </BackButton>
        <Description>
          <p>{nickName}님의</p>
          <p>비밀번호 입력</p>
          <PasswordDisplay>
            {Array(6)
              .fill("")
              .map((_, index) => (
                <Dot key={index} filled={index < password.length} />
              ))}
          </PasswordDisplay>
          <p>{"비밀번호 재설정 >"}</p>
        </Description>

        <PasswordInputContainer>
          {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((num) => (
            <Button key={num} onClick={() => handleNumberClick(num.toString())}>
              {num}
            </Button>
          ))}
          <Button onClick={handleClearClick}>전체삭제</Button>
          <Button onClick={() => handleNumberClick("0")}>0</Button>
          <Button onClick={handleDeleteClick}>del</Button>
        </PasswordInputContainer>
      </Content>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  flex-direction: column;
`;

const Content = styled.div`
  position: relative;
  max-width: 400px;
  padding: 20px;
  border: 1px solid #ddd;
  border-radius: 15px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
`;

const BackButton = styled.button`
  position: absolute;
  top: 15px;
  left: 15px;
  background: none;
  border: none;
`;

const Description = styled.div`
  margin-bottom: 40px;
  text-align: center;
`;

const PasswordDisplay = styled.div`
  display: flex;
  justify-content: center;
  margin: 20px 0;
`;

const Dot = styled.div<{ filled: boolean }>`
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background-color: ${({ filled }) => (filled ? "darkgray" : "lightgray")};
  margin: 0 5px;
`;

const PasswordInputContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1px;
  justify-content: center;
  align-items: center;
`;

const Button = styled.button`
  border: none;
  background-color: var(--main-color);
  color: white;
  height: 50px;
  font-size: 18px;
  margin: 0px;
  cursor: pointer;
`;
