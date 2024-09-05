import styled from "styled-components";
import SignupForm from "../../components/auth/SignupForm";

function Signup() {
  return (
    <SignupContainer>
      <SignupTitle>회원가입</SignupTitle>
      <SignupForm />
    </SignupContainer>
  );
}

export default Signup;

const SignupContainer = styled.div`
  max-width: 400px;
  margin: 50px auto;
  padding: 20px;
  background-color: #ccc;
  border-radius: 10px;
`;

const SignupTitle = styled.h1`
  text-align: center;
  color: #333;
`;
