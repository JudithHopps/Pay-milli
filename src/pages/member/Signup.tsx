import styled from "styled-components";
import SignupForm from "../../components/member/SignupForm";
import NavBar from "components/layout/NavBar";

export default function Signup() {
  return (
    <>
      <NavBar />
      <SignupContainer>
        <SignupTitle>회원가입</SignupTitle>
        <SignupForm />
      </SignupContainer>
    </>
  );
}

const SignupContainer = styled.div`
  max-width: 400px;
  margin: 110px auto;
  padding: 20px;
  background-color: white;
  border-radius: 15px;
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.1);
  margin-bottom: 24px;
`;

const SignupTitle = styled.h1`
  text-align: center;
  margin: 10px;
  font-size: 24px;
  color: var(--main-color);
`;
