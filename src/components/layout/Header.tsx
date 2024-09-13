import { Link } from "react-router-dom";
import styled from "styled-components";

export default function Header() {
  return (
    <HeaderContainer>
      <ServiceLinks>
        <ServiceNavLink to="/">서비스 소개</ServiceNavLink>
        <ServiceNavLink to="/paymenthistory">전체 결제 내역</ServiceNavLink>
        <ServiceNavLink to="/cardmanagement">내 카드 관리</ServiceNavLink>
      </ServiceLinks>
    </HeaderContainer>
  );
}

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
