import { useLocation } from "react-router-dom";

export default function BottomNav({ value, onChange }) {
  const location = useLocation();

  // Pathname'den aktif tab'ı belirle (fallback)
  function getActiveMode() {
    if (location.pathname.startsWith("/stocks")) return "stocks";
    if (location.pathname.startsWith("/news")) return "news";
    if (location.pathname.startsWith("/analysis")) return "analysis";
    if (location.pathname.startsWith("/settings")) return "settings";
    return null;
  }

  const activeMode = value || getActiveMode();

  const navItems = [
    { id: "stocks", icon: "📊", label: "Hisse" },
    { id: "news", icon: "📰", label: "Haber" },
    { id: "analysis", icon: "📈", label: "Analiz" },
    { id: "settings", icon: "⚙️", label: "Ayarlar" },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 h-16 bg-white border-t border-gray-200 flex items-center justify-around sm:hidden z-30 shadow-lg">
      {navItems.map((item) => (
        <button
          key={item.id}
          onClick={() => onChange?.(item.id)}
          className={`flex flex-col items-center justify-center gap-1 flex-1 h-full transition-colors ${
            activeMode === item.id
              ? "text-blue-600 bg-blue-50 border-t-2 border-blue-600"
              : "text-gray-600 hover:bg-gray-50"
          }`}
          title={item.label}
        >
          <span className="text-xl">{item.icon}</span>
          <span className="text-xs font-medium">{item.label}</span>
        </button>
      ))}
    </nav>
  );
}
