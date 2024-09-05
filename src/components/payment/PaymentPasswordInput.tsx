import styled from "styled-components";

interface PaymentPasswordInputProps {
  nickName: string;
  onSubmit: (password: string) => void;
}

export default function PaymentPasswordInput({
  nickName,
  onSubmit,
}: PaymentPasswordInputProps) {
  return (
    <>
      <div>
        <p>{nickName}님의</p>
        <p>비밀번호 입력</p>
        <p>{"비밀번호 재설정 >"}</p>
      </div>

      <PasswordInputContainer>
        <Button>1</Button>
        <Button>1</Button>
        <Button>1</Button>
        <Button>1</Button>
        <Button>1</Button>
        <Button>1</Button>
        <Button>1</Button>
        <Button>1</Button>
        <Button>1</Button>
        <Button>1</Button>
        <Button>1</Button>
        <Button>1</Button>
        <Button>1</Button>
        <Button>1</Button>
        <Button>1</Button>
      </PasswordInputContainer>
    </>
  );
}

const PasswordInputContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
`;

const Button = styled.button`
  border: none;
  background-color: var(--main-color);
  color: white;
  height: 50px;
  margin: 0px;
`;
