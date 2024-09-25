import styled from "styled-components";
import LoginForm from "../../components/member/LoginForm";
import NavBar from "components/layout/NavBar";

export default function Login() {
  return (
    <>
      <NavBar />
      <LoginContainer>
        <LoginTitle>로그인</LoginTitle>
        <LoginForm />
      </LoginContainer>
    </>
  );
}

const LoginContainer = styled.div`
  max-width: 400px;
  margin: 150px auto;
  padding: 20px;
  background-color: white;
  border-radius: 15px;
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.1);
`;

const LoginTitle = styled.h1`
  text-align: center;
  margin: 10px;
  font-size: 24px;
  color: var(--main-color);
`;
