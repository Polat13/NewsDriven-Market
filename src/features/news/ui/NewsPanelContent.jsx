export default function NewsPanelContent({ onClose, onSelect }) {
  const items = [
    { id: "n1", headline: "Teknoloji hisseleri yükselişe geçti", source: "Reuters", time: "2h ago" },
    { id: "n2", headline: "Petrol piyasası volatilitesi arttı", source: "Bloomberg", time: "4h ago" },
    { id: "n3", headline: "Merkez Bankası faiz kararı açıkladı", source: "WSJ", time: "6h ago" },
  ];

  return (
    <div className="flex flex-col h-full sm:h-screen sm:bg-gray-900">
      {/* Başlık - Desktop sadece */}
      <div className="hidden sm:flex items-center justify-between p-5 border-b border-gray-700 bg-gray-900">
        <div>
          <h2 className="text-lg font-semibold text-white">Haberler</h2>
          <p className="text-xs text-white/60 mt-1">Son haberler</p>
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
              <div className="text-sm font-semibold sm:text-white leading-snug">{x.headline}</div>
              <div className="flex items-center justify-between mt-2 pt-2 border-t border-gray-200 sm:border-white/10">
                <div className="text-xs sm:text-white/60 text-gray-600">{x.source}</div>
                <div className="text-xs sm:text-white/50 text-gray-500">{x.time}</div>
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
