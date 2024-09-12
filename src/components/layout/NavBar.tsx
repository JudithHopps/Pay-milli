import { Link } from "react-router-dom";
import styled from "styled-components";
import { useEffect, useState } from "react";

export default function NavBar() {
  const [isLogin, setIsLogin] = useState(false);

  useEffect(() => {
    setIsLogin(!!localStorage.getItem("accessToken"));
  }, []);

  return (
    <Nav>
      <TopNavBar>
        <UserLinks>
          {isLogin ? (
            <>
              <UserNavLink to="/userinfo">내 정보</UserNavLink>
              <UserNavLink to="/logout">로그아웃</UserNavLink>
            </>
          ) : (
            <>
              <UserNavLink to="/login">로그인</UserNavLink>
              <UserNavLink to="/signup">회원가입</UserNavLink>
            </>
          )}
        </UserLinks>
      </TopNavBar>

      <HeaderContainer>
        <ServiceLinks>
          <ServiceNavLink to="/">서비스 소개</ServiceNavLink>
          <ServiceNavLink to="/paymenthistory">전체 결제 내역</ServiceNavLink>
          <ServiceNavLink to="/cardmanagement">내 카드 관리</ServiceNavLink>
        </ServiceLinks>
      </HeaderContainer>
    </Nav>
  );
}

const Nav = styled.nav`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  z-index: 1000;
`;

const TopNavBar = styled.nav`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  padding: 10px 20px;
  background-color: #fff;
`;

const UserLinks = styled.div`
  display: flex;
  margin-right: 100px;
  gap: 20px;
`;

const UserNavLink = styled(Link)`
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

const HeaderContainer = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-bottom: 20px;
  border-bottom: 2px solid #007bff;
`;

const ServiceLinks = styled.nav`
  flex-grow: 1;
  display: flex;
  justify-content: center;
`;

const ServiceNavLink = styled(Link)`
  margin: 0px 15px;
  text-decoration: none;
  color: black;
  font-size: 20px;
  font-weight: 500;

  &:hover {
    color: #007bff;
  }
`;
