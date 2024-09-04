import React, { useState } from "react";
import axios, { AxiosError } from "axios";
import InputField from "./InputField";
import SubmitButton from "./SubmitButton";

interface LoginFormData {
  userId: string;
  password: string;
}

const LoginForm: React.FC = () => {
  // 폼 데이터를 관리하는 상태
  const [formData, setFormData] = useState<LoginFormData>({
    userId: "",
    password: "",
  });

  // 폼 입력값이 변경될 때 상태 업데이트
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  // 로그인 처리 함수
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault(); // 폼 제출 시 새로고침 방지
    try {
      const response = await axios.post<{ accessToken: string }>(
        "/user/login",
        {
          userId: formData.userId,
          password: formData.password,
        },
      );

      if (response.status === 200) {
        console.log("로그인 성공:", response.data.accessToken);
        // accessToken을 저장하거나 다음 페이지로 이동하는 로직 추가
      }
    } catch (err) {
      const error = err as AxiosError;

      if (error.response?.status === 404) {
        console.log("로그인 실패: 아이디 또는 비밀번호가 잘못되었습니다.");
      } else {
        console.log("로그인 실패: 서버 오류가 발생했습니다.");
      }
    }
  };

  return (
    <form onSubmit={handleLogin}>
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
};

export default LoginForm;
