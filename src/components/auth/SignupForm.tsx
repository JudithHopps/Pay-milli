import axios from "axios";
import React, { useState } from "react";

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

enum GenderType {
  FEMALE = "FEMALE",
  MALE = "MALE",
}

const SignupForm: React.FC = () => {
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

  // 폼 입력값이 변경될 때 호출되는 핸들러.
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  // 폼이 제출될 때 호출되는 비동기 핸들러.
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await axios.post("/user/join", formData);
      if (response.status === 200) {
        console.log("회원가입 성공");
      }
    } catch (error) {
      if (axios.isAxiosError(error) && error.response?.status === 404) {
        console.log("회원가입 실패: 비밀번호가 부적합합니다.");
      } else {
        console.log("회원가입 실패: 서버 오류");
      }
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div>
          <label>아이디: </label>
          <input
            type="text"
            name="userId"
            value={formData.userId}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>이름: </label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>이메일: </label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>비밀번호: </label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>생년월일: </label>
          <input
            type="date"
            name="birthday"
            value={formData.birthday}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>성별: </label>
          <select
            name="gender"
            value={formData.gender}
            onChange={handleChange}
            required
          >
            <option value={GenderType.FEMALE}>여성</option>
            <option value={GenderType.MALE}>남성</option>
          </select>
        </div>
        <div>
          <label>전화번호: </label>
          <input
            type="tel"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>결제 비밀번호: </label>
          <input
            type="password"
            name="paymentPassword"
            value={formData.paymentPassword}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit">회원가입</button>
      </form>
    </div>
  );
};

export default SignupForm;
