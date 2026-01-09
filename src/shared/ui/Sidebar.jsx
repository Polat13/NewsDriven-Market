import IconButton from "./IconButton";

export default function Sidebar({ activeMode, onChange }) {
  return (
    <div className="fixed top-0 right-0 h-screen w-16 bg-gray-800 text-white flex flex-col justify-between items-center py-4 z-30 border-l border-gray-700 shadow-lg">
      {/* Üst butonlar */}
      <div className="flex flex-col items-center gap-3">
        <IconButton
          title="Hisse Senetleri (S)"
          active={activeMode === "stocks"}
          onClick={() => onChange("stocks")}
        >
          📊
        </IconButton>

        <IconButton
          title="Haberler (N)"
          active={activeMode === "news"}
          onClick={() => onChange("news")}
        >
          📰
        </IconButton>

        <IconButton
          title="Analizler (A)"
          active={activeMode === "analysis"}
          onClick={() => onChange("analysis")}
        >
          📈
        </IconButton>
      </div>

      {/* Alt buton */}
      <IconButton
        title="Ayarlar (⚙)"
        active={activeMode === "settings"}
        onClick={() => onChange("settings")}
      >
        ⚙️
      </IconButton>
    </div>
  );
}
