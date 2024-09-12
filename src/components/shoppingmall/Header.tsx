import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";

const S = {
  HeaderComponent: styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    padding: 40px 10px 0px;
  `,
};

const HeaderComponent: React.FC = () => {
  return (
    <S.HeaderComponent>
      <Link to="/product">
        <img
          src={"/img/logo_shopingmall.png"}
          alt="shoppingmall Logo"
          style={{ width: 194, height: 70 }}
        />
      </Link>
      <Link to="/mypage/shoppingBasket">
        <img
          src={"/img/shoppingCartIcon.jpeg"}
          alt="장바구니 아이콘"
          style={{ width: 40, height: 40 }}
        />
      </Link>
    </S.HeaderComponent>
  );
};

export default HeaderComponent;
