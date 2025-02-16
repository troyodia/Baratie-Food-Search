import { Routes, Route, BrowserRouter, Navigate } from "react-router-dom";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import SignUpPage from "./pages/SignUpPage";
import PrivateRoutes from "./auth/PrivateRoutes";
import PersistLogin from "./auth/PersistLogin";
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login-page" element={<LoginPage />}></Route>
        <Route path="/signup-page" element={<SignUpPage />}></Route>

        {/*Private routes*/}
        <Route element={<PersistLogin />}>
          <Route element={<PrivateRoutes />}>
            <Route path="/" element={<HomePage />}></Route>
            <Route path="/user-profile" element={<div>Profile</div>}></Route>
          </Route>
        </Route>
        <Route path="*" element={<Navigate to="/" />}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
