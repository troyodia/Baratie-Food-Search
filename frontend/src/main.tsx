import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import GoogleAuthWrapper from "./auth/GoogleAuthWrapper.tsx";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import { ToastContainer } from "react-toastify";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      staleTime: 1000 * 10,
      refetchInterval: 1000 * 30,
      refetchIntervalInBackground: false,

      refetchOnMount: true,
      // refetchOnReconnect: false,
    },
  },
});
createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <GoogleAuthWrapper>
      <QueryClientProvider client={queryClient}>
        <App />
        <ToastContainer />
      </QueryClientProvider>
    </GoogleAuthWrapper>
  </StrictMode>
);
