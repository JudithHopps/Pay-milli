import React, { useState } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import { postLoginAPI, getMemberInfoAPI } from "../../api/memberApi";
import { LoginFormData } from "../../types/member/memberTypes";
import InputField from "../common/InputField";
import SubmitButton from "../common/SubmitButton";

export default function LoginForm() {
  const [formData, setFormData] = useState<LoginFormData>({
    memberId: "",
    password: "",
  });

  const navigate = useNavigate();

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
      const data = await postLoginAPI(formData);
      Cookies.set("accessToken", data.accessToken, { expires: 1 });
      const accessToken = Cookies.get("accessToken");
      if (accessToken) {
        const memberInfo = await getMemberInfoAPI(accessToken);
        alert(`${memberInfo.name}님, 안녕하세요!`);
        navigate("/");
      } else {
        alert("accessToken이 존재하지 않습니다. 다시 시도해주세요.");
      }
    } catch (err) {
      console.error(err);
      alert("로그인 실패");
    }
  };

  return (
    <FormContainer onSubmit={handleSubmit}>
      <InputField
        label="아이디"
        name="memberId"
        type="text"
        value={formData.memberId}
        onChange={handleChange}
        required
        maxLength={20}
      />
      <InputField
        label="비밀번호"
        name="password"
        type="password"
        value={formData.password}
        onChange={handleChange}
        required
        maxLength={20}
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
