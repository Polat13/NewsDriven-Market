import React from "react";
import ReactDOM from "react-dom/client";
import App from "./app/App";
import "./index.css";
import { useAuthStore } from "./features/auth/model/authStore";
import "./shared/lib/chartjs";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
const queryClient = new QueryClient();

function Bootstrapper({ children }) {
  React.useEffect(() => {
    useAuthStore.getState().bootstrap();
  }, []);

  return children;
}

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Bootstrapper>
      <QueryClientProvider client={queryClient}>
       <App />
      </QueryClientProvider>
    </Bootstrapper>
  </React.StrictMode>
);
