import { Navigate } from "react-router-dom";
import { useAuthStore } from "../model/authStore";
import Spinner from "../../../shared/ui/Spinner";

export function requireAuth(element) {
  return <AuthGate>{element}</AuthGate>;
}

function AuthGate({ children }) {
  const status = useAuthStore((s) => s.status);

  if (status === "idle" || status === "loading") {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <Spinner />
      </div>
    );
  }

  if (status === "guest" || status === "error") {
    return <Navigate to="/auth/login" replace />;
  }

  if (status === "authed") {
    return children;
  }

  return null;
}

export default AuthGate;
