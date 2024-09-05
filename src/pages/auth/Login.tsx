import styled from "styled-components";
import LoginForm from "../../components/auth/LoginForm";

function Login() {
  return (
    <LoginContainer>
      <LoginTitle>로그인</LoginTitle>
      <LoginForm />
    </LoginContainer>
  );
}

export default Login;

const LoginContainer = styled.div`
  max-width: 400px;
  margin: 100px auto;
  padding: 20px;
  background-color: #ccc;
  border-radius: 10px;
`;

const LoginTitle = styled.h1`
  text-align: center;
  color: #333;
`;
