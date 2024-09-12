import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

export default function Header() {
  return (
    <HeaderContainer>
      <Logo>{"PAY-milli"}</Logo>

      <Nav>
        <StyledLink to={"/"}>{"서비스 소개"}</StyledLink>
        <StyledLink to={"/paymenthistory"}>{"전체 결제 내역"}</StyledLink>
        <StyledLink to={"/cardmanagement"}>{"내 카드 관리"}</StyledLink>
      </Nav>
    </HeaderContainer>
  );
}

const HeaderContainer = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 20px;
  border-bottom: 2px solid #007bff;
`;

const Logo = styled.div`
  font-size: 24px;
  font-weight: bold;
`;

const Nav = styled.nav`
  display: flex;
`;

const StyledLink = styled(Link)`
  margin-left: 20px;
  text-decoration: none;
  color: black;
  font-weight: 500;

  &:hover {
    color: #007bff;
  }
`;
