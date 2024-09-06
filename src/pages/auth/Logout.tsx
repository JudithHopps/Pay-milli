import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { logout } from "../../api/authApi";

function Logout() {
  const navigate = useNavigate();

  useEffect(() => {
    const handleLogout = async () => {
      const token = localStorage.getItem("accessToken");
      if (token) {
        try {
          await logout(token);
        } catch (err) {
          console.error("로그아웃 실패:", err);
        }
      }
      localStorage.removeItem("accessToken");
      navigate("/");
    };

    handleLogout();
  }, [navigate]);

  return <div>로그아웃 중...</div>;
}

export default Logout;
