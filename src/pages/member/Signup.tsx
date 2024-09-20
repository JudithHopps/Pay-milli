import styled from "styled-components";
import SignupForm from "../../components/member/SignupForm";

export default function Signup() {
  return (
    <SignupContainer>
      <SignupTitle>회원가입</SignupTitle>
      <SignupForm />
    </SignupContainer>
  );
}

const SignupContainer = styled.div`
  max-width: 400px;
  margin: 100px auto;
  padding: 20px;
  background-color: white;
  border-radius: 15px;
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.1);
`;

const SignupTitle = styled.h1`
  text-align: center;
  margin: 10px;
  font-size: 24px;
  color: var(--main-color);
`;
