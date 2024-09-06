import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Header from "./component/Header";
import PaymentHistoryPage from "./pages/PaymentHistoryPage";
import CardManagementPage from "./pages/CardManagementPage";
import NotFound from "pages/NotFound";
import Main from "pages/Main";
import Payment from "pages/payment/Payment";
import RefundProcess from "pages/refund/RefundProcess";

function App() {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/total" element={<PaymentHistoryPage />} />
        <Route path="/cardmanagement" element={<CardManagementPage />} />
        <Route path="/payment" element={<Payment />} />
        <Route path="/refund" element={<RefundProcess />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
}

export default App;
