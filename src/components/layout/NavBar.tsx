import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { useEffect, useState } from "react";
import { logout } from "../../api/memberApi";
import Header from "./Header";

export default function NavBar() {
  const [isLogin, setIsLogin] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    setIsLogin(!!localStorage.getItem("accessToken"));
  }, []);

  const handleLogout = async () => {
    const accessToken = localStorage.getItem("accessToken");

    if (!accessToken) {
      alert("이미 로그아웃 상태입니다.");
      navigate("/login");
      return;
    }

    try {
      await logout(accessToken);
      setIsLogin(false);
      alert("로그아웃 되었습니다.");
      navigate("/login");
    } catch (err) {
      console.error(err);
      alert("로그아웃 실패");
    }
  };

  return (
    <Nav>
      <TopNavBar>
        <MemberLinks>
          {isLogin ? (
            <>
              <MemberNavLink to="/Memberinfo">내 정보</MemberNavLink>
              <MemberNavLink
                to="/logout"
                onClick={(e) => {
                  e.preventDefault();
                  handleLogout();
                }}
              >
                로그아웃
              </MemberNavLink>
            </>
          ) : (
            <>
              <MemberNavLink to="/login">로그인</MemberNavLink>
              <MemberNavLink to="/signup">회원가입</MemberNavLink>
            </>
          )}
        </MemberLinks>
      </TopNavBar>

      <Header />
    </Nav>
  );
}

const Nav = styled.nav`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  background-color: #fff;
  z-index: 1000;
`;

const TopNavBar = styled.nav`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  padding: 10px 20px;
`;

const MemberLinks = styled.div`
  display: flex;
  margin-right: 100px;
  gap: 20px;
`;

const MemberNavLink = styled(Link)`
  text-decoration: none;
  font-size: 12px;
  color: #222;
  position: relative;

  &::after {
    content: "";
    position: absolute;
    top: 4px;
    right: -10px;
    height: 60%;
    width: 1px;
    background-color: #ccc;
  }

  &:last-child::after {
    display: none;
  }

  &:hover {
    color: #ccc;
  }
`;
