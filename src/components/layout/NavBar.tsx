import { Link } from "react-router-dom";
import styled from "styled-components";
import { useEffect, useState } from "react";

export default function NavBar() {
  const [isLogin, setIsLogin] = useState(false);

  useEffect(() => {
    setIsLogin(!!localStorage.getItem("accessToken"));
  }, []);

  return (
    <StyledNav>
      <Links>
        <StyledLink to="/">홈</StyledLink>
        {isLogin ? (
          <>
            <StyledLink to="/userinfo">내 정보</StyledLink>
            <StyledLink to="/logout">로그아웃</StyledLink>
          </>
        ) : (
          <>
            <StyledLink to="/userinfo">내 정보</StyledLink>
            <StyledLink to="/login">로그인</StyledLink>
            <StyledLink to="/signup">회원가입</StyledLink>
          </>
        )}
      </Links>
    </StyledNav>
  );
}

const StyledNav = styled.nav`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  z-index: 1000;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  padding: 10px 20px;
  background-color: #fff;
`;

const Links = styled.div`
  display: flex;
  margin-right: 100px;
  gap: 20px;
`;

const StyledLink = styled(Link)`
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
