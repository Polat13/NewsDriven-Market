export default function StocksPanelContent({ onClose, onSelect }) {
  const items = [
    { symbol: "AAPL", name: "Apple Inc.", price: 195.42, change: "+2.5%" },
    { symbol: "MSFT", name: "Microsoft", price: 378.91, change: "-1.2%" },
    { symbol: "TSLA", name: "Tesla Inc.", price: 242.84, change: "+5.8%" },
    { symbol: "NVDA", name: "NVIDIA Corp.", price: 589.16, change: "+3.1%" },
  ];

  return (
    <div className="flex flex-col h-full sm:h-screen sm:bg-gray-900">
      {/* Başlık - Desktop sadece */}
      <div className="hidden sm:flex items-center justify-between p-5 border-b border-gray-700 bg-gray-900">
        <div>
          <h2 className="text-lg font-semibold text-white">Hisse Senetleri</h2>
          <p className="text-xs text-white/60 mt-1">Popüler hisse senetleri</p>
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
              key={x.symbol}
              onClick={() => onSelect?.(x.symbol)}
              className="text-left p-3 rounded-2xl transition-all hover:shadow-lg sm:bg-white/10 sm:hover:bg-white/15 bg-white hover:bg-gray-50 border border-gray-200 sm:border-none"
            >
              <div className="flex items-center justify-between gap-2">
                <div>
                  <div className="text-sm font-semibold sm:text-white">{x.symbol}</div>
                  <div className="text-xs sm:text-white/60 text-gray-600 mt-0.5">{x.name}</div>
                </div>
                <div className="text-right">
                  <div className="text-sm font-semibold sm:text-white">${x.price}</div>
                  <div className={`text-xs font-medium ${x.change.startsWith("+") ? "text-green-600 sm:text-green-400" : "text-red-600 sm:text-red-400"}`}>
                    {x.change}
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
