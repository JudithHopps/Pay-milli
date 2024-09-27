import React, { useState, useEffect } from "react";
import styled from "styled-components";
import XmarkIcon from "../common/XmarkIcon";

interface PaymentPasswordModalProps {
  onSubmit: (password: string) => void;
  onClose: () => void;
  title: string;
}

export default function PaymentPasswordModal({
  onSubmit,
  onClose,
  title,
}: PaymentPasswordModalProps) {
  const [password, setPassword] = useState("");

  useEffect(() => {
    setPassword("");
  }, [title]);

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

  return (
    <Wrapper>
      <Content>
        <CloseButton onClick={onClose}>
          <XmarkIcon />
        </CloseButton>
        <Description>
          <p>{title}</p>
          <PasswordDisplay>
            {Array(6)
              .fill("")
              .map((_, index) => (
                <Dot key={index} filled={index < password.length} />
              ))}
          </PasswordDisplay>
        </Description>

        <PasswordInputContainer>
          {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((num) => (
            <Button key={num} onClick={() => handleNumberClick(num.toString())}>
              {num}
            </Button>
          ))}
          <Button onClick={handleClearClick}>전체 삭제</Button>
          <Button onClick={() => handleNumberClick("0")}>0</Button>
          <Button onClick={handleDeleteClick}>삭제</Button>
        </PasswordInputContainer>
      </Content>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: rgba(0, 0, 0, 0.6);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;

const Content = styled.div`
  background-color: white;
  position: relative;
  max-width: 400px;
  padding: 20px;
  border: 1px solid #ddd;
  border-radius: 15px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
`;

const CloseButton = styled.button`
  position: absolute;
  top: 15px;
  right: 15px;
  background: none;
  border: none;
`;

const Description = styled.h2`
  font-size: 20px;
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
  }
`;
