import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import NotFound from "pages/NotFound";
import Main from "pages/Main";
import Signup from "pages/auth/Signup";
import Login from "pages/auth/Login";
import UserInfo from "pages/auth/UserInfo";
import NavBar from "components/layout/NavBar";

function App() {
  return (
    <Router>
      <div>
        <NavBar />
        <Routes>
          <Route path="/" element={<Main />} />
          <Route path="*" element={<NotFound />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          <Route path="/userinfo" element={<UserInfo />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
