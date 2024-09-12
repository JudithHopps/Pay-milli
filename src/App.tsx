import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import NotFound from "pages/NotFound";
import Main from "pages/Main";
import Payment from "pages/payment/Payment";
import RefundProcess from "pages/refund/RefundProcess";
import ProductList from "pages/shoppingmall/ProductList";
import ShoppingBasket from "pages/shoppingmall/Basket";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/payment" element={<Payment />} />
        <Route path="/refund" element={<RefundProcess />} />
        <Route path="/mall/shopping" element={<ProductList />} />
        <Route path="/mall/basket" element={<ShoppingBasket />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
}

export default App;
