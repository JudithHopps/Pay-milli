import React, { useState } from "react";
import axios, { AxiosError } from "axios";

const Login: React.FC = () => {
  const [userId, setUserId] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const handleLogin = async () => {
    try {
      const response = await axios.post<{ accessToken: string }>(
        "/user/login",
        {
          userId: userId,
          password: password,
        },
      );

      if (response.status === 200) {
        console.log("로그인 성공:", response.data.accessToken);
        // accessToken을 저장하거나 다음 페이지로 이동하는 로직을 추가합니다.
      }
    } catch (err) {
      const error = err as AxiosError;
      if (error.response && error.response.status === 404) {
        console.log("로그인 실패: 아이디 또는 비밀번호가 잘못되었습니다.");
      } else {
        console.log("로그인 중 오류가 발생했습니다.");
      }
    }
  };

  return (
    <div>
      <h1>로그인 페이지</h1>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleLogin();
        }}
      >
        <div>
          <label htmlFor="userId">아이디:</label>
          <input
            type="text"
            id="userId"
            value={userId}
            onChange={(e) => setUserId(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="password">비밀번호:</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit">로그인</button>
      </form>
    </div>
  );
};

export default Login;
