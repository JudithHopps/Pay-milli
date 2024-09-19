import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import NotFound from "pages/NotFound";
import Main from "pages/Main";
import Payment from "pages/payment/Payment";
import RefundProcess from "pages/refund/RefundProcess";
import ProductList from "pages/shoppingmall/ProductList";
import ShoppingBasket from "pages/shoppingmall/Basket";
import OrderSheet from "pages/shoppingmall/OrderSheet";
import OrderComplete from "pages/shoppingmall/OrderComplete";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/payment" element={<Payment />} />
        <Route path="/refund" element={<RefundProcess />} />
        <Route path="/mall/shopping" element={<ProductList />} />
        <Route path="/mall/basket" element={<ShoppingBasket />} />
        <Route path="/mall/order" element={<OrderSheet />} />
        <Route path="/mall/order/complete" element={<OrderComplete />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
}

export default App;
