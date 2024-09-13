import { useState, useEffect, useMemo } from "react";
import styled from "styled-components";
import DescriptionComponent from "components/shoppingmall/shoppingBasket/EmptyCart";
import HeaderComponent from "components/shoppingmall/Header";
import ButtonComponent from "components/shoppingmall/Button";

interface CartType {
  id: string;
  itemTitle: string;
  imgUrl: string;
  price: number;
  oriPrice: number;
  sale: number;
  count: number;
}

const THE_FREE_SHIPPING_MINIMUM_AMOUNT = 30000;
const THE_DELIVERY_CHARGE = 3000;

export default function OrderSheet() {
  const [cartList, setCartList] = useState<CartType[] | null>(null);

  useEffect(() => {
    const preCartList = localStorage.getItem("cartList");
    if (preCartList) {
      setCartList(JSON.parse(preCartList));
    }
  }, []);

  const updateCartList = (newCartList: CartType[]): void => {
    setCartList(newCartList);
    localStorage.setItem("cartList", JSON.stringify(newCartList));
  };

  const totalCost = useMemo(() => {
    return (
      (cartList &&
        cartList.reduce((acc, item) => acc + item.price * item.count, 0)) ||
      0
    );
  }, [cartList]);

  return (
    <>
      <S.pageNav>주문/결제</S.pageNav>
      <S.container>
        {!cartList || cartList.length === 0 ? (
          <DescriptionComponent description="잘못된 요청입니다. 구매하고자 하는 상품을 담아주세요" />
        ) : (
          <S.orderSummary>
            <S.orderTitle>주문 상품</S.orderTitle>
            <S.cartItems>
              {cartList.map((item) => (
                <S.cartItem key={item.id}>
                  <S.itemImage src={item.imgUrl} alt={item.itemTitle} />
                  <S.itemDetails>
                    <S.itemTitle>{item.itemTitle}</S.itemTitle>
                    <S.itemPrice>
                      {item.price.toLocaleString()} 원 x {item.count}개 총{" "}
                      {item.price * item.count}원
                    </S.itemPrice>
                  </S.itemDetails>
                </S.cartItem>
              ))}
            </S.cartItems>
            <S.totalCost>
              총 주문 금액: {totalCost.toLocaleString()} 원
            </S.totalCost>
          </S.orderSummary>
        )}
      </S.container>
    </>
  );
}

const S = {
  container: styled.div`
    background-color: #f3f5f7;
    padding: 20px;
    border-radius: 8px;
  `,
  title: styled.h1`
    font-size: 1.7vw;
    margin: 70px 0 7px 0;
  `,
  pageNav: styled.p`
    font-size: 15px;
    font-weight: 600;
    color: #000;
    width: 100%;
    background-color: #fff;
    border-radius: 4px;
    text-align: center;
  `,
  orderSummary: styled.div`
    background-color: #fff;
    border-radius: 8px;
    padding: 20px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  `,
  orderTitle: styled.h2`
    font-size: 18px;
    margin-bottom: 15px;
  `,
  cartItems: styled.div`
    margin-bottom: 20px;
  `,
  cartItem: styled.div`
    display: flex;
    align-items: center;
    margin-bottom: 15px;
    border-bottom: 1px solid #e0e0e0;
    padding-bottom: 10px;
  `,
  itemImage: styled.img`
    width: 60px;
    height: 60px;
    object-fit: cover;
    margin-right: 10px;
  `,
  itemDetails: styled.div`
    flex: 1;
  `,
  itemTitle: styled.p`
    font-size: 16px;
    margin: 0;
  `,
  itemPrice: styled.p`
    font-size: 14px;
    color: #666;
  `,
  totalCost: styled.div`
    font-size: 16px;
    font-weight: bold;
    text-align: right;
  `,
};
