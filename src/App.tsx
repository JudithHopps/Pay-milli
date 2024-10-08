import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import NotFound from "pages/NotFound";
import Main from "pages/Main";
import Login from "pages/member/Login";
import Signup from "pages/member/Signup";
import MemberInfo from "pages/member/MemberInfo";
import Payment from "pages/payment/Payment";
import RefundProcess from "pages/refund/RefundProcess";
import CardManagementPage from "pages/card/CardManagementPage";
import PaymentHistoryPage from "pages/card/PaymentHistoryPage";
import ProductList from "pages/shoppingmall/ProductList";
import ShoppingBasket from "pages/shoppingmall/Basket";
import OrderSheet from "pages/shoppingmall/OrderSheet";
import OrderComplete from "pages/shoppingmall/OrderComplete";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="*" element={<NotFound />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
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
    </Router>
  );
}

export default App;
