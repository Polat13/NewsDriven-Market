import { useState, useEffect } from "react";
import SearchModal from "./Search";
import Dropdown from "./Dropdownmenu";
import { useAuth } from "../../features/auth/hooks/useAuth";
import { useNavigate } from "react-router-dom";
import logo from "../../assets/logo.png";

export default function Navbar() {
  const [searchOpen, setSearchOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);

  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const avatarLetter = (user?.name || user?.email || "U").slice(0, 1).toUpperCase();

  return (
    <>
      <header className="h-16 border-b border-gray-200 bg-white flex items-center justify-between px-4 sm:px-6 sm:pr-24 relative z-30 shadow-sm">
              {/* Sol: Logo + App adı */}
            <button
              onClick={() => navigate("/")}
              className="flex items-center gap-3 hover:opacity-80 transition-opacity cursor-pointer"
              title="Ana Sayfa"
            >
        <img
          src={logo}
          alt="NewsDriven Market"
          className="h-8 w-auto"
        />

        <span className="text-lg font-semibold hidden sm:inline">
          <span className="text-blue-600">NewsDriven</span>
          <span className="text-green-600"> Market</span>
        </span>
        <span className="sm:hidden text-sm font-semibold text-blue-600">
          NewsDriven
        </span>
        <span className="sm:hidden text-sm font-semibold text-green-600">
        Market
        </span>
      </button>

        <button
          onClick={() => setSearchOpen(true)}
          className="hidden sm:flex items-center justify-between gap-3 border border-gray-200 rounded-full px-20 py-2 text-sm text-gray-600 bg-white hover:bg-gray-50 hover:border-gray-300 transition-colors"
        >
          <span>Ara: hisse / haber</span>
        </button>

        {/* Sağda: Avatar + Dropdown */}
        <div className="flex items-center gap-3">
          {/* Mobile search */}
          <button
            onClick={() => setSearchOpen(true)}
            className="sm:hidden h-10 w-10 flex items-center justify-center bg-blue-600 text-white rounded-full hover:bg-blue-700 transition-colors"
            title="Ara"
          >
            🔍
          </button>

          {/* Avatar */}
          <div className="relative">
            <button
              onClick={() => setProfileOpen((p) => !p)}
              className="h-10 w-10 rounded-full bg-blue-600 text-white flex items-center justify-center text-sm font-semibold hover:bg-blue-700 transition-colors"
              title="Profil"
            >
              {avatarLetter}
            </button>

            <Dropdown open={profileOpen} onClose={() => setProfileOpen(false)} align="right">
              <button
                onClick={() => navigate("/settings")}
                className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
              >
                ⚙️ Ayarlar
              </button>
              <button
                onClick={() => {
                  logout();
                  navigate("/auth/login", { replace: true });
                }}
                className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors border-t border-gray-200"
              >
                ← Çıkış
              </button>
            </Dropdown>
          </div>
        </div>
      </header>

      <SearchModal open={searchOpen} onClose={() => setSearchOpen(false)} />
    </>
  );
}
