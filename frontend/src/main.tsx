import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import GoogleAuthWrapper from "./auth/GoogleAuthWrapper.tsx";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      refetchOnMount: false,
      refetchOnReconnect: false,
    },
  },
});
createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <GoogleAuthWrapper>
      <QueryClientProvider client={queryClient}>
        <App />
      </QueryClientProvider>
    </GoogleAuthWrapper>
  </StrictMode>
);
