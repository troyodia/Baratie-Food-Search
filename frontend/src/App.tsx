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
import SeachResultsPage from "./pages/SeachResultsPage";
import RestaurantProfile from "./pages/RestaurantProfile";
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
            <Route path="/results" element={<SeachResultsPage />}></Route>
            <Route
              path="/:restaurant/:id"
              element={<RestaurantProfile />}
            ></Route>
          </Route>
        </Route>
        <Route path="*" element={<Navigate to="/welcome" />}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
