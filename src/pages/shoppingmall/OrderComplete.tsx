import HeaderComponent from "components/shoppingmall/Header";
import styled from "styled-components";
// import { AiOutlineCheckCircle } from "react-icons/ai"; // 체크 아이콘 사용

export default function OrderComplete() {
  return (
    <S.Container>
      <HeaderComponent />
      <S.Content>
        <img src="/img/check.png" width={50} height={50} />
        <S.Description>
          <h1>결제가 완료되었습니다!</h1>
          <p>주문이 정상적으로 처리되었습니다. 이용해주셔서 감사합니다.</p>
        </S.Description>
        <S.Button onClick={() => (window.location.href = "/shopping")}>
          쇼핑 계속하기
        </S.Button>
      </S.Content>
    </S.Container>
  );
}

const S = {
  Container: styled.div`
    width: 100vw;
    margin: 0px 20px;
    display: flex;
    flex-direction: column;
    align-items: center;
  `,
  Content: styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;
    margin-top: 50px;
  `,
  Description: styled.div`
    margin-top: 20px;

    h1 {
      font-size: 24px;
      color: #333;
      font-weight: bold;
    }

    p {
      margin-top: 10px;
      font-size: 16px;
      color: #666;
    }
  `,
  Button: styled.button`
    margin-top: 30px;
    background-color: var(--sub-color);
    color: white;
    border: none;
    border-radius: 5px;
    padding: 10px 20px;
    font-size: 18px;
    cursor: pointer;

    &:hover {
      background-color: var(--main-color);
    }
  `,
};
