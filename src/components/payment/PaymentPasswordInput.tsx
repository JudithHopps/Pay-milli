import React, { useState } from "react";
import styled from "styled-components";

interface PaymentPasswordInputProps {
  nickName: string;
  onSubmit: (password: string) => void;
}

export default function PaymentPasswordInput({
  nickName,
  onSubmit,
}: PaymentPasswordInputProps) {
  const [password, setPassword] = useState<string>("");

  const handleNumberClick = (num: string) => {
    if (password.length < 6) {
      setPassword((prev) => prev + num);
    }
    if (password.length == 6) {
      onSubmit(password + num);
    }
  };

  const handleDeleteClick = () => {
    setPassword((prev) => prev.slice(0, -1));
  };

  const handleClearClick = () => {
    setPassword("");
  };

  return (
    <Wrapper>
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
    </Wrapper>
  );
}

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  width: 100%;
  flex-direction: column;
`;
const Description = styled.div`
  margin-bottom: 80px;
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
