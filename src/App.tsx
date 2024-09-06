import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Header from "./component/Header";

import NotFound from "./pages/NotFound";
import Main from "./pages/Main";
import PaymentHistoryPage from "./pages/PaymentHistoryPage";
import CardManagementPage from './pages/CardManagementPage';

function App() {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path={"/"} element={<Main />} />
        <Route path={"*"} element={<NotFound />} />
        <Route path={"/total"} element={<PaymentHistoryPage />} />
        <Route path="/cardmanagement" element={<CardManagementPage />} />
      </Routes>
    </Router>
  );
}

export default App;
