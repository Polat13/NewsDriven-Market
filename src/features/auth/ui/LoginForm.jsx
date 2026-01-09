import { useState } from "react";
import { useAuth } from "../hooks/useAuth";
import { Link, useNavigate } from "react-router-dom";

export default function LoginForm() {
  const { login, error, status } = useAuth();
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const loading = status === "loading";

  async function onSubmit(e) {
    e.preventDefault();
    try {
      await login({ email, password });
      navigate("/", { replace: true });
    } catch (_) {
       setPassword("");
    }
  }

  return (
    <form onSubmit={onSubmit} className="flex flex-col gap-3">
      <div className="text-xl font-semibold text-gray-700">Giriş Yap</div>

      <label className="text-sm text-gray-600">Email</label>
      <input
        className="border border-gray-200 rounded-xl px-3 py-2 outline-none focus:ring-2 focus:ring-blue-200 text-gray-700"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        type="email"
        required
      />

      <label className="text-sm text-gray-600">Şifre</label>
      <input
        className="border border-gray-200 rounded-xl px-3 py-2 outline-none focus:ring-2 focus:ring-blue-200 text-gray-700"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        type="password"
        required
      />

      {error && <div className="text-sm text-red-600">{error}</div>}

      <button
        type="submit"
        disabled={loading}
        className="bg-blue-600 text-white px-3 py-2 rounded-xl text-sm hover:bg-blue-700 disabled:opacity-60"
      >
        {loading ? "Giriş yapılıyor..." : "Giriş Yap"}
      </button>

      <div className="text-sm text-gray-600">
        Hesabın yok mu?{" "}
        <Link to="/auth/register" className="text-blue-600 hover:text-blue-700">
          Kayıt Ol
        </Link>
      </div>
    </form>
  );
}
