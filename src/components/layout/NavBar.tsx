import { Link } from "react-router-dom";
import styled from "styled-components";
import { useEffect, useState } from "react";
import Header from "./Header";

export default function NavBar() {
  const [isLogin, setIsLogin] = useState(false);

  useEffect(() => {
    setIsLogin(!!localStorage.getItem("accessToken"));
  }, []);

  return (
    <Nav>
      <TopNavBar>
        <MemberLinks>
          {isLogin ? (
            <>
              <MemberNavLink to="/Memberinfo">내 정보</MemberNavLink>
              <MemberNavLink to="/logout">로그아웃</MemberNavLink>
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
