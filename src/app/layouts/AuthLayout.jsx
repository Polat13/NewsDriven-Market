import { Outlet, Link, Navigate } from "react-router-dom";
import { useAuthStore } from "../../features/auth/model/authStore";

export default function AuthLayout() {
  const status = useAuthStore((s) => s.status);

  // Redirect authenticated users to dashboard
  if (status === "authed") {
    return <Navigate to="/" replace />;
  }

  return (
    <div className="min-h-screen bg-white flex items-center justify-center p-6">
      <div className="w-full max-w-md border border-gray-200 rounded-2xl p-6 shadow-sm">
        <div className="flex items-center justify-between">
          <div className="text-lg font-semibold text-gray-700">NewsDriven Market</div>
          <Link to="/" className="text-sm text-blue-600 hover:text-blue-700">
            Ana sayfa
          </Link>
        </div>
        <div className="pt-6">
          <Outlet />
        </div>
      </div>
    </div>
  );
}
