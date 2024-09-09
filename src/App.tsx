import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import NotFound from "pages/NotFound";
import Main from "pages/Main";
import Signup from "pages/auth/Signup";
import Login from "pages/auth/Login";
import Logout from "pages/auth/Logout";
import UserInfo from "pages/auth/UserInfo";
import NavBar from "components/layout/NavBar";
import Payment from "pages/payment/Payment";
import RefundProcess from "pages/refund/RefundProcess";
import styled from "styled-components";

function App() {
  return (
    <Router>
      <div>
        <StyledNavBar>
          <NavBar />
        </StyledNavBar>
        <Routes>
          <Route path="/" element={<Main />} />
          <Route path="*" element={<NotFound />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          <Route path="/logout" element={<Logout />} />
          <Route path="/userinfo" element={<UserInfo />} />
          <Route path="/payment" element={<Payment />} />
          <Route path="/refund" element={<RefundProcess />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;

const StyledNavBar = styled.div`
  margin-bottom: 50px;
`;
