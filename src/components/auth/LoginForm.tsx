import React, { useState } from "react";
import { login } from "../../api/authApi";
import InputField from "../common/InputField";
import SubmitButton from "../common/SubmitButton";

function LoginForm() {
  const [formData, setFormData] = useState({
    userId: "",
    password: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await login(formData);
      alert("로그인 성공");
    } catch (err) {
      console.error(err);
      alert("로그인 실패");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <InputField
        label="아이디"
        name="userId"
        type="text"
        value={formData.userId}
        onChange={handleChange}
        required
      />
      <InputField
        label="비밀번호"
        name="password"
        type="password"
        value={formData.password}
        onChange={handleChange}
        required
      />
      <SubmitButton label="로그인" />
    </form>
  );
}

export default LoginForm;
