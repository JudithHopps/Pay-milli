import React, { useState } from "react";
import styled from "styled-components";
import { signup } from "../../api/authApi";
import { SignupFormData } from "../../types/types";
import InputField from "../common/InputField";
import SelectField from "../common/SelectField";
import SubmitButton from "../common/SubmitButton";

enum GenderType {
  FEMALE = "FEMALE",
  MALE = "MALE",
}

function SignupForm() {
  const [formData, setFormData] = useState<SignupFormData>({
    userId: "",
    name: "",
    email: "",
    password: "",
    birthday: "",
    gender: GenderType.FEMALE,
    phone: "",
    paymentPassword: "",
  });

  const [confirmPassword, setConfirmPassword] = useState<string>("");
  const [errorMessage, setErrorMessage] = useState<string>("");

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleConfirmPasswordChange = (
    e: React.ChangeEvent<HTMLInputElement>,
  ) => {
    setConfirmPassword(e.target.value);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (formData.password !== confirmPassword) {
      setErrorMessage("비밀번호가 일치하지 않습니다.");
      return;
    }

    try {
      await signup({
        ...formData,
        gender: formData.gender === GenderType.FEMALE ? "FEMALE" : "MALE",
      });
      alert("회원가입 성공");
      setErrorMessage("");
    } catch (err) {
      console.error(err);
      alert("회원가입 실패");
    }
  };

  return (
    <FormContainer onSubmit={handleSubmit}>
      <InputField
        label="이름"
        name="name"
        type="text"
        value={formData.name}
        onChange={handleChange}
        required
        placeholder="신권일"
      />
      <SelectField
        label="성별"
        name="gender"
        value={formData.gender}
        options={[
          { value: GenderType.FEMALE, label: "여성" },
          { value: GenderType.MALE, label: "남성" },
        ]}
        onChange={handleChange}
        required
      />
      <InputField
        label="생년월일"
        name="birthday"
        type="date"
        value={formData.birthday}
        onChange={handleChange}
        required
      />
      <InputField
        label="아이디"
        name="userId"
        type="text"
        value={formData.userId}
        onChange={handleChange}
        required
        placeholder="gwonil"
      />
      <InputField
        label="비밀번호"
        name="password"
        type="password"
        value={formData.password}
        onChange={handleChange}
        required
        placeholder="password123"
      />
      <InputField
        label="비밀번호 확인"
        name="confirmPassword"
        type="password"
        value={confirmPassword}
        onChange={handleConfirmPasswordChange}
        required
        placeholder="password123"
      />
      {errorMessage && <ErrorText>{errorMessage}</ErrorText>}
      <InputField
        label="이메일"
        name="email"
        type="email"
        value={formData.email}
        onChange={handleChange}
        required
        placeholder="honggil@example.com"
      />
      <InputField
        label="전화번호"
        name="phone"
        type="tel"
        value={formData.phone}
        onChange={handleChange}
        required
        placeholder="01012345678"
      />
      <InputField
        label="결제 비밀번호"
        name="paymentPassword"
        type="password"
        value={formData.paymentPassword}
        onChange={handleChange}
        required
        placeholder="숫자 6자리"
      />
      <SubmitButtonContainer>
        <SubmitButton label="회원가입" />
      </SubmitButtonContainer>
    </FormContainer>
  );
}

export default SignupForm;

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

const ErrorText = styled.p`
  color: red;
  font-size: 14px;
  text-align: center;
  margin-top: 5px;
`;
