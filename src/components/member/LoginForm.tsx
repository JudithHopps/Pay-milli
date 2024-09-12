import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { login } from "../../api/memberApi";
import { LoginFormData } from "../../types/memberTypes";
import InputField from "../common/InputField";
import SubmitButton from "../common/SubmitButton";

export default function LoginForm() {
  const [formData, setFormData] = useState<LoginFormData>({
    memberId: "",
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
      const data = await login(formData);
      localStorage.setItem("accessToken", data.accessToken);
      alert("로그인 성공");
    } catch (err) {
      console.error(err);
      alert("로그인 실패");
    }
  };

  //임시 로그인 상태 확인 용
  useEffect(() => {
    const accessToken = "123456";
    localStorage.setItem("accessToken", accessToken);
  }, []);

  return (
    <FormContainer onSubmit={handleSubmit}>
      <InputField
        label="아이디"
        name="userId"
        type="text"
        value={formData.memberId}
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
      <SubmitButtonContainer>
        <SubmitButton label="로그인" />
      </SubmitButtonContainer>
    </FormContainer>
  );
}

const FormContainer = styled.form`
  display: flex;
  flex-direction: column;
  max-width: 100%;
  margin: auto;
  padding: 20px;
`;

const SubmitButtonContainer = styled.div`
  margin-top: 10px;
  display: flex;
  justify-content: center;
`;
