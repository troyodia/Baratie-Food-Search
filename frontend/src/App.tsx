import { Routes, Route, BrowserRouter, Navigate } from "react-router-dom";
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<div>Home</div>}></Route>
        <Route path="/user-profile" element={<div>Profile</div>}></Route>
        <Route path="*" element={<Navigate to="/" />}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
