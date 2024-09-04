import React from "react";
import { Link } from "react-router-dom";
import "../../styles/components/NavBar.css";
import logo1 from "../../assets/logo1.png";
import logo2 from "../../assets/logo2.png";

const NavBar: React.FC = () => {
  return (
    <nav className="navbar">
      <div className="logo-container">
        <Link to="/" className="logo-link">
          <img src={logo1} alt="Pay-milli 로고" className="logo" />
          <span className="app-name">Pay-milli</span>
        </Link>
      </div>
      <div className="auth-links">
        <Link to="/login" className="link">
          로그인
        </Link>
        <Link to="/signup" className="link">
          회원가입
        </Link>
      </div>
    </nav>
  );
};

export default NavBar;
