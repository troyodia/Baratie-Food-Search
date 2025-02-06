import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import AuthZeroProviderWithNaviagte from "./auth/AuthZeroProviderWithNaviagte.tsx";
createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <AuthZeroProviderWithNaviagte>
      <App />
    </AuthZeroProviderWithNaviagte>
  </StrictMode>
);
