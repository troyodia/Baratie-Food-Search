import { Routes, Route, BrowserRouter, Navigate } from "react-router-dom";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import SignUpPage from "./pages/SignUpPage";
import PrivateRoutes from "./auth/PrivateRoutes";
import PersistLogin from "./auth/PersistLogin";
import WelcomePage from "./pages/WelcomePage";
import NaviagteToHome from "./auth/NaviagteToHome";
import ProfilePage from "./pages/ProfilePage";
import MyResturantPage from "./pages/MyResturantPage";
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/welcome" element={<WelcomePage />}></Route>
        {/*Navigate to home sends user back to HomePage if the user is already signed in but goes to the logout page or tries to login from the welcome page*/}
        <Route element={<NaviagteToHome />}>
          <Route path="/login-page" element={<LoginPage />}></Route>
        </Route>
        <Route path="/signup-page" element={<SignUpPage />}></Route>

        {/*Private routes*/}
        <Route element={<PersistLogin />}>
          <Route element={<PrivateRoutes />}>
            <Route path="/" element={<HomePage />}></Route>
            <Route path="/user-profile" element={<ProfilePage />}></Route>
            <Route path="/my-resturant" element={<MyResturantPage />}></Route>
          </Route>
        </Route>
        <Route path="*" element={<Navigate to="/" />}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
