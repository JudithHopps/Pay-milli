import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import NotFound from "pages/NotFound";
import Main from "pages/Main";
import Signup from "pages/member/Signup";
import Login from "pages/member/Login";
import Logout from "pages/member/Logout";
import MemberInfo from "pages/member/MemberInfo";
import NavBar from "components/layout/NavBar";
import Payment from "pages/payment/Payment";
import RefundProcess from "pages/refund/RefundProcess";
import CardManagementPage from "pages/card/CardManagementPage";
import PaymentHistoryPage from "pages/card/PaymentHistoryPage";
import styled from "styled-components";
import ProductList from "pages/shoppingmall/ProductList";
import ShoppingBasket from "pages/shoppingmall/Basket";
import OrderSheet from "pages/shoppingmall/OrderSheet";
import OrderComplete from "pages/shoppingmall/OrderComplete";

function App() {
  return (
    <Router>
      <div>
        <NavBar />
        <MainContent>
          <Routes>
            <Route path="/" element={<Main />} />
            <Route path="*" element={<NotFound />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/login" element={<Login />} />
            <Route path="/logout" element={<Logout />} />
            <Route path="/memberinfo" element={<MemberInfo />} />
            <Route path="/payment" element={<Payment />} />
            <Route path="/refund" element={<RefundProcess />} />
            <Route path="/cardmanagement" element={<CardManagementPage />} />
            <Route path="/paymenthistory" element={<PaymentHistoryPage />} />
            <Route path="/mall/shopping" element={<ProductList />} />
            <Route path="/mall/basket" element={<ShoppingBasket />} />
            <Route path="/mall/order" element={<OrderSheet />} />
            <Route path="/mall/order/complete" element={<OrderComplete />} />
          </Routes>
        </MainContent>
      </div>
    </Router>
  );
}

export default App;

const MainContent = styled.div`
  margin-top: 150px;
`;
