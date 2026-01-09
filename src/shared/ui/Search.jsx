import { useMemo, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Modal from "./Modal";

const dummyStocks = [
  { symbol: "AAPL", name: "Apple Inc." },
  { symbol: "MSFT", name: "Microsoft" },
  { symbol: "TSLA", name: "Tesla" },
  { symbol: "NVDA", name: "NVIDIA" },
];

const dummyNews = [
  { id: "n1", headline: "Markets open higher as tech rallies" },
  { id: "n2", headline: "Company X announces earnings beat" },
  { id: "n3", headline: "Oil prices dip after supply update" },
];

export default function SearchModal({ open, onClose }) {
  const [tab, setTab] = useState("stocks"); // stocks | news
  const [q, setQ] = useState("");
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const navigate = useNavigate();

  const results = useMemo(() => {
    const query = q.trim().toLowerCase();
    if (!query) return [];
    if (tab === "stocks") {
      return dummyStocks.filter(
        (x) => x.symbol.toLowerCase().includes(query) || x.name.toLowerCase().includes(query)
      );
    }
    return dummyNews.filter((x) => x.headline.toLowerCase().includes(query));
  }, [q, tab]);

  // ✅ Enter tuşu basılınca ilk sonucu seç
  useEffect(() => {
    function handleKeyDown(e) {
      if (!open) return;

      if (e.key === "Enter" && results.length > 0) {
        e.preventDefault();
        handlePick(results[0]);
      }
    }

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [open, results, tab]);

  // ✅ Sonuca tıklanıysa yönlendir
  function handlePick(item) {
    if (tab === "stocks") {
      navigate(`/stocks/${item.symbol}`);
    } else {
      navigate(`/news/${item.id}`);
    }

    // Modal kapat ve arama temizle
    onClose?.();
    setQ("");
    setSelectedIndex(-1);
  }

  // ✅ Modal kapatma
  const handleClose = () => {
    onClose?.();
    setQ("");
    setSelectedIndex(-1);
  };

  return (
    <Modal open={open} onClose={onClose}>
      <div className="flex flex-col gap-6 p-6 sm:p-8" onClick={(e) => e.stopPropagation()}>
        {/* Başlık */}
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900">Ara</h2>
            <p className="text-sm text-gray-600 mt-1">Hisse veya haberleri arayın</p>
          </div>
          <button
            onClick={handleClose}
            className="p-3 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-xl transition-colors text-lg"
            title="Kapat (Esc)"
          >
            ✕
          </button>
        </div>

        {/* Tab butonları */}
        <div className="flex gap-3">
          <button
            onClick={() => setTab("stocks")}
            className={[
              "flex-1 px-6 py-3 rounded-full text-base font-bold transition-all",
              tab === "stocks"
                ? "bg-blue-600 text-white shadow-lg shadow-blue-600/30"
                : "bg-gray-100 text-gray-700 hover:bg-gray-200",
            ].join(" ")}
          >
            📊 Hisse
          </button>
          <button
            onClick={() => setTab("news")}
            className={[
              "flex-1 px-6 py-3 rounded-full text-base font-bold transition-all",
              tab === "news"
                ? "bg-blue-600 text-white shadow-lg shadow-blue-600/30"
                : "bg-gray-100 text-gray-700 hover:bg-gray-200",
            ].join(" ")}
          >
            📰 Haber
          </button>
        </div>

        {/* Arama inputu */}
        <input
          value={q}
          onChange={(e) => setQ(e.target.value)}
          autoFocus
          placeholder={tab === "stocks" ? "Sembol veya şirket ara (AAPL, Apple...)" : "Haber başlığı ara..."}
          className="w-full border border-gray-200 rounded-2xl px-5 py-4 text-base outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all text-gray-900 placeholder-gray-500 font-medium"
        />

        {/* Sonuçlar */}
        <div className="border border-gray-200 rounded-2xl overflow-hidden">
          <div className="bg-gray-50 px-5 py-3 text-sm font-medium text-gray-600 border-b border-gray-200">
            {q.trim() ? `${results.length} sonuç` : "Aramak için yazmaya başla"}
          </div>

          <div className="max-h-96 overflow-y-auto">
            {results.length > 0 ? (
              results.map((item) => (
                <button
                  key={tab === "stocks" ? item.symbol : item.id}
                  onClick={() => handlePick(item)}
                  className="w-full text-left px-5 py-4 hover:bg-blue-50 transition-colors border-b border-gray-100 last:border-b-0 flex flex-col gap-2"
                >
                  {tab === "stocks" ? (
                    <>
                      <div className="text-base font-bold text-gray-900">{item.symbol}</div>
                      <div className="text-sm text-gray-600">{item.name}</div>
                    </>
                  ) : (
                    <div className="text-base text-gray-900 leading-relaxed font-medium">{item.headline}</div>
                  )}
                </button>
              ))
            ) : (
              <div className="px-5 py-12 text-center text-base text-gray-600 font-medium">
                {q.trim() ? "Sonuç bulunamadı." : "Arama yapın..."}
              </div>
            )}
          </div>
        </div>
      </div>
    </Modal>
  );
}
