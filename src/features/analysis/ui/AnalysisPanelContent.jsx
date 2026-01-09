export default function AnalysisPanelContent({ onClose, onSelect }) {
  const items = [
    { id: "a1", symbol: "AAPL", text: "Haber sonrası 3 günde düşüş trendi", confidence: "85%" },
    { id: "a2", symbol: "TSLA", text: "Haber sonrası 1 günde yükseliş trendi", confidence: "72%" },
    { id: "a3", symbol: "MSFT", text: "Teknik seviye desteği güçlü", confidence: "91%" },
  ];

  return (
    <div className="flex flex-col h-full sm:h-screen sm:bg-gray-900">
      {/* Başlık - Desktop sadece */}
      <div className="hidden sm:flex items-center justify-between p-5 border-b border-gray-700 bg-gray-900">
        <div>
          <h2 className="text-lg font-semibold text-white">Analizler</h2>
          <p className="text-xs text-white/60 mt-1">Güncel analiz raporları</p>
        </div>
        <button
          onClick={onClose}
          className="p-2 text-white/60 hover:text-white hover:bg-white/10 rounded-xl transition-colors"
          title="Kapat"
        >
          ✕
        </button>
      </div>

      {/* İçerik - Mobile: light theme, Desktop: dark theme */}
      <div className="flex-1 overflow-y-auto">
        <div className="flex flex-col gap-2 p-4 sm:gap-2 sm:p-4 sm:bg-gray-900">
          {items.map((x) => (
            <button
              key={x.id}
              onClick={() => onSelect?.(x.id)}
              className="text-left p-3 rounded-2xl transition-all hover:shadow-lg sm:bg-white/10 sm:hover:bg-white/15 bg-white hover:bg-gray-50 border border-gray-200 sm:border-none"
            >
              <div className="flex items-center justify-between gap-2">
                <div className="flex-1">
                  <div className="text-sm font-semibold sm:text-white">{x.symbol}</div>
                  <div className="text-xs sm:text-white/60 text-gray-600 mt-0.5 leading-snug">{x.text}</div>
                </div>
                <div className="text-right">
                  <div className="text-xs font-semibold sm:text-blue-400 sm:bg-blue-500/20 text-blue-600 bg-blue-100 px-2 py-1 rounded-lg whitespace-nowrap">
                    {x.confidence}
                  </div>
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
