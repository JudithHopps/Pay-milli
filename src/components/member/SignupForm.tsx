import React, { useState } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import { postSignupAPI, postLoginAPI } from "../../api/memberApi";
import { SignupFormData } from "../../types/member/memberTypes";
import InputField from "../common/InputField";
import SelectField from "../common/SelectField";
import SubmitButton from "../common/SubmitButton";
import PaymentPasswordModal from "../modal/PaymentPasswordModal";

enum GenderType {
  MALE = "MALE",
  FEMALE = "FEMALE",
}

export default function SignupForm() {
  const [formData, setFormData] = useState<SignupFormData>({
    memberId: "",
    name: "",
    email: "",
    password: "",
    birthday: "",
    gender: GenderType.MALE,
    phone: "",
    paymentPassword: "",
  });

  const navigate = useNavigate();

  const [confirmPassword, setConfirmPassword] = useState<string>("");
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [isModalOpen, setIsModalOpen] = useState(false);

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
      setFormData({
        ...formData,
        password: "",
      });
      setConfirmPassword("");
      return;
    }

    try {
      const data = await postSignupAPI({
        ...formData,
        gender: formData.gender === GenderType.MALE ? "MALE" : "FEMALE",
      });
      alert("회원가입 성공");
      const loginData = await postLoginAPI({
        memberId: formData.memberId,
        password: formData.password,
      });
      Cookies.set("accessToken", loginData.accessToken, { expires: 1 });
      setErrorMessage("");
      alert(`${formData.name}님, 환영합니다!`);
      navigate("/memberinfo");
    } catch (err) {
      console.error(err);
      alert("회원가입 실패");
    }
  };

  const handlePaymentPasswordClick = () => {
    setFormData({
      ...formData,
      paymentPassword: "",
    });
    setIsModalOpen(true);
  };

  const handleSetPaymentPassword = (password: string) => {
    setFormData({ ...formData, paymentPassword: password });
    setIsModalOpen(false);
  };

  return (
    <>
      <FormContainer onSubmit={handleSubmit}>
        <InputField
          label="이름"
          name="name"
          type="text"
          value={formData.name}
          onChange={handleChange}
          required
          placeholder="신권일"
          maxLength={20}
        />
        <SelectField
          label="성별"
          name="gender"
          value={formData.gender}
          options={[
            { value: GenderType.MALE, label: "남성" },
            { value: GenderType.FEMALE, label: "여성" },
          ]}
          onChange={handleChange}
          required
        />
        <InputField
          label="생년월일"
          name="birthday"
          type="text"
          value={formData.birthday}
          onChange={handleChange}
          required
          placeholder="19980830"
          maxLength={8}
        />
        <InputField
          label="아이디"
          name="memberId"
          type="text"
          value={formData.memberId}
          onChange={handleChange}
          required
          placeholder="gwonil"
          maxLength={20}
        />
        <InputField
          label="비밀번호"
          name="password"
          type="password"
          value={formData.password}
          onChange={handleChange}
          required
          placeholder="password123"
          maxLength={20}
        />
        <InputField
          label="비밀번호 확인"
          name="confirmPassword"
          type="password"
          value={confirmPassword}
          onChange={handleConfirmPasswordChange}
          required
          placeholder="password123"
          maxLength={20}
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
          maxLength={40}
        />
        <InputField
          label="전화번호"
          name="phone"
          type="tel"
          value={formData.phone}
          onChange={handleChange}
          required
          placeholder="01012345678"
          maxLength={11}
        />
        <InputField
          label="결제 비밀번호"
          name="paymentPassword"
          type="password"
          value={formData.paymentPassword}
          onChange={handleChange}
          required
          onClick={handlePaymentPasswordClick}
          placeholder="숫자 6자리"
          maxLength={6}
          readOnly
        />
        <SubmitButtonContainer>
          <SubmitButton label="회원가입" />
        </SubmitButtonContainer>
      </FormContainer>

      {isModalOpen && (
        <PaymentPasswordModal
          onSubmit={handleSetPaymentPassword}
          onClose={() => setIsModalOpen(false)}
          title="결제 비밀번호 설정"
        />
      )}
    </>
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

const ErrorText = styled.p`
  color: red;
  font-size: 14px;
  text-align: center;
  margin-top: 5px;
`;
