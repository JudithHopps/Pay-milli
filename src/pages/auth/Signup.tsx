import React from "react";
import SignupForm from "../../components/auth/SignupForm";

const Signup: React.FC = () => {
  return (
    <div style={{ maxWidth: "500px", margin: "0 auto" }}>
      <h1>회원가입</h1>
      <SignupForm />
    </div>
  );
};

export default Signup;
