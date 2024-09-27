import { NavLink } from "react-router-dom";
import styled from "styled-components";
import logo from "../../assets/favicon.png";

export default function Header() {
  return (
    <HeaderContainer>
      <ServiceLinks>
        <ServiceNavLink to="/">
          서비스 소개
          <LogoImg className="home" />
        </ServiceNavLink>
        <ServiceNavLink to="/paymenthistory">
          전체 결제 내역
          <LogoImg className="paymenthistory" />
        </ServiceNavLink>
        <ServiceNavLink to="/cardmanagement">
          내 카드 관리
          <LogoImg className="cardmanagement" />
        </ServiceNavLink>
      </ServiceLinks>
    </HeaderContainer>
  );
}

const HeaderContainer = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 20px;
  border-bottom: 2px solid var(--main-color);
`;

const ServiceLinks = styled.nav`
  flex-grow: 1;
  display: flex;
  justify-content: center;
`;

const ServiceNavLink = styled(NavLink)`
  margin: 0px 50px;
  text-decoration: none;
  color: #000;
  font-size: 18px;
  font-weight: 700;
  position: relative;

  &:hover {
    color: var(--hover-color);
  }

  &.active {
    color: var(--main-color);
    font-weight: bold;

    .home,
    .paymenthistory,
    .cardmanagement {
      display: block;
    }
  }
`;

const LogoImg = styled.img.attrs({
  src: logo,
  alt: "로고",
})`
  position: absolute;
  top: -40px;
  left: 50%;
  transform: translateX(-50%);
  width: 45px;
  height: 45px;
  opacity: 0.8;
  pointer-events: none;
  display: none;
`;
