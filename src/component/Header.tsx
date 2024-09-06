import React from "react";
import { Link } from "react-router-dom";
import "./Header.css";

const Header: React.FC = () => {
  return (
    <header className={"header"}>
      <div className={"logo"}>
        <span>{"PAY-milli"}</span>
      </div>

      <nav className={"nav"}>
        <Link to={"/"}>{"서비스 소개"}</Link>
        <Link to={"/total"}>{"전체 결제 내역"}</Link>
        <Link to={"/cardmanagement"}>{"내 카드 관리"}</Link>
      </nav>
    </header>
  );
};

export default Header;
