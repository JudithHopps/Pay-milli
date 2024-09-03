import React, { useState } from "react";
import axios from "axios";

interface SignupFormData {
  userId: string;
  name: string;
  email: string;
  password: string;
  birthday: string;
  gender: "FEMALE" | "MALE";
  phone: string;
}

const SignupForm: React.FC = () => {
  const [formData, setFormData] = useState<SignupFormData>({
    userId: "",
    name: "",
    email: "",
    password: "",
    birthday: "",
    gender: "FEMALE", // 기본값을 'FEMALE'로 설정
    phone: "",
  });

  const [message, setMessage] = useState<string>("");

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
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
      const response = await axios.post("/user/join", formData); // 서버의 API 엔드포인트를 지정하세요.
      if (response.status === 200) {
        setMessage("회원가입 성공");
      }
    } catch (error) {
      if (axios.isAxiosError(error) && error.response?.status === 404) {
        setMessage("회원가입 실패: 비밀번호가 부적합합니다.");
      } else {
        setMessage("회원가입 실패: 서버 오류");
      }
    }
  };

  return (
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
          <option value="FEMALE">여성</option>
          <option value="MALE">남성</option>
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
      <button type="submit">회원가입</button>
      {message && <p>{message}</p>}
    </form>
  );
};

export default SignupForm;
