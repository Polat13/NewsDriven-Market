import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="mt-16 border-t border-white/10 py-6 text-center text-sm text-gray-400">
      <p>
        © {new Date().getFullYear()} NewsDriven ·{" "}
        <Link to="/privacy" className="hover:text-blue-500 underline">
          Gizlilik Politikası
        </Link>{" "}
        ·{" "}
        <Link to="/terms" className="hover:text-blue-500 underline">
          Kullanım Şartları
        </Link>
      </p>
    </footer>
  );
}
