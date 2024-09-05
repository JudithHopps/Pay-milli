import { Link } from "react-router-dom";
import styled from "styled-components";
import logo from "../../assets/logo.png";

function NavBar() {
  return (
    <StyledNav>
      <LogoContainer>
        <StyledLink to="/">
          <AppLogo src={logo} alt="Pay-milli 로고" />
        </StyledLink>
      </LogoContainer>
      <Links>
        <StyledLink to="/">홈</StyledLink>
        <StyledLink to="/login">로그인</StyledLink>
        <StyledLink to="/signup">회원가입</StyledLink>
      </Links>
    </StyledNav>
  );
}

export default NavBar;

const StyledNav = styled.nav`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 20px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
`;

const LogoContainer = styled.div``;

const AppLogo = styled.img`
  height: 40px;
  border-radius: 10px;
`;

const Links = styled.div`
  display: flex;
  gap: 10px;
`;

const StyledLink = styled(Link)`
  text-decoration: none;
  font-size: 13px;
  color: gray;
  &:hover {
    color: #6dcef5;
  }
`;
