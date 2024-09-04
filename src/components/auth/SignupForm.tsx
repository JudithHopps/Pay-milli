import React, { useState } from "react";
import { signup } from "../../api/authApi";
import InputField from "../common/InputField";
import SelectField from "../common/SelectField";
import SubmitButton from "../common/SubmitButton";

enum GenderType {
  FEMALE = "FEMALE",
  MALE = "MALE",
}

function SignupForm() {
  const [formData, setFormData] = useState({
    userId: "",
    name: "",
    email: "",
    password: "",
    birthday: "",
    gender: GenderType.FEMALE,
    phone: "",
    paymentPassword: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await signup({
        ...formData,
        gender: formData.gender === GenderType.FEMALE ? "FEMALE" : "MALE",
      });
      alert("회원가입 성공");
    } catch (err) {
      console.error(err);
      alert("회원가입 실패");
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
}

export default SignupForm;
