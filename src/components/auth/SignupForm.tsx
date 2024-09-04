import React, { useState } from "react";
import axios, { AxiosError } from "axios";
import InputField from "./InputField";
import SelectField from "./SelectField";
import SubmitButton from "./SubmitButton";

enum GenderType {
  FEMALE = "FEMALE",
  MALE = "MALE",
}

// 회원가입 폼 데이터 타입 정의
interface SignupFormData {
  userId: string; // 아이디
  name: string; // 이름
  email: string; // 이메일
  password: string; // 비밀번호
  birthday: string; // 생년월일
  gender: GenderType; // 성별
  phone: string; // 전화번호
  paymentPassword: string; // 결제비밀번호(6자리)
}

const SignupForm: React.FC = () => {
  // 폼 데이터를 관리하는 상태
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

  // 폼 입력값이 변경될 때 상태 업데이트
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  // 폼이 제출될 때 실행되는 함수
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await axios.post("/user/join", formData);

      if (response.status === 200) {
        console.log("회원가입 성공");
        // 회원가입 성공 후 처리 로직 추가
      }
    } catch (err) {
      const error = err as AxiosError;

      if (error.response?.status === 404) {
        console.log("회원가입 실패: 비밀번호가 부적합합니다.");
      } else {
        console.log("회원가입 실패: 서버 오류가 발생했습니다.");
      }
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
        label="이름"
        name="name"
        type="text"
        value={formData.name}
        onChange={handleChange}
        required
      />
      <InputField
        label="이메일"
        name="email"
        type="email"
        value={formData.email}
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
      <InputField
        label="생년월일"
        name="birthday"
        type="date"
        value={formData.birthday}
        onChange={handleChange}
        required
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
        label="전화번호"
        name="phone"
        type="tel"
        value={formData.phone}
        onChange={handleChange}
        required
      />
      <InputField
        label="결제 비밀번호"
        name="paymentPassword"
        type="password"
        value={formData.paymentPassword}
        onChange={handleChange}
        required
      />
      <SubmitButton label="회원가입" />
    </form>
  );
};

export default SignupForm;
