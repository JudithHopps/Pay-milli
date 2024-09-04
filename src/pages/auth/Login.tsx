import React from "react";
import LoginForm from "../../components/auth/LoginForm";

const Login: React.FC = () => {
  return (
    <div style={{ maxWidth: "500px", margin: "0 auto" }}>
      <h1>로그인</h1>
      <LoginForm />
    </div>
  );
};

export default Login;
