import { useEffect } from "react";
import { RouterProvider } from "react-router-dom";
import { router } from "./router";
import { useAuthStore } from "../features/auth/model/authStore"; 

export function App() {
  useEffect(() => {
    useAuthStore.getState().bootstrap();
  }, []);

  return <RouterProvider router={router} />;
}

export default App;
