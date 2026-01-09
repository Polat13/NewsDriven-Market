import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import StockPriceChart from "../ui/StockPriceChart";
import { makeFakeSeries } from "../lib/fakeStockData";
import { http } from "../../../shared/api/httpClient";
import Breadcrumb from "../../../shared/ui/Breadcrumb";

// Hisse bilgileri mock dictionary
const STOCK_INFO = {
  AAPL: { name: "Apple Inc.", startPrice: 150 },
  MSFT: { name: "Microsoft", startPrice: 280 },
  TSLA: { name: "Tesla Inc.", startPrice: 200 },
  NVDA: { name: "NVIDIA Corp.", startPrice: 500 },
};

export default function StockDetailPage() {
  const { symbol } = useParams();
  const navigate = useNavigate();

  const [stock, setStock] = useState(null);
  const [chartData, setChartData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function fetchStock() {
      try {
        setLoading(true);
        setError("");

        if (STOCK_INFO[symbol]) {
          setStock(STOCK_INFO[symbol]);
          setChartData(makeFakeSeries(30, STOCK_INFO[symbol].startPrice, symbol));
        } else {
          try {
            const data = await http(`/stocks/${symbol}`);
            setStock({
              name: data.name || data.companyName || "Unknown",
              startPrice: data.price || data.lastPrice || 100,
            });
            setChartData(makeFakeSeries(30, data.price || data.lastPrice || 100, symbol));
          } catch {
            setStock({ name: "Unknown", startPrice: 150 });
            setChartData(makeFakeSeries(30, 150, symbol));
          }
        }
      } catch (err) {
        setError(err.message || "Hisse yüklenirken hata oluştu");
        setStock({ name: "Unknown", startPrice: 150 });
        setChartData(makeFakeSeries(30, 150, symbol));
      } finally {
        setLoading(false);
      }
    }

    fetchStock();
  }, [symbol]);

  if (loading) {
    return <div className="text-center text-gray-600">Yükleniyor...</div>;
  }

  if (error) {
    return <div className="text-center text-red-600">{error}</div>;
  }

  return (
    <div className="flex flex-col gap-4 sm:gap-6">
      {/* MOBILE: Back button */}
      <button
        onClick={() => navigate("/stocks")}
        className="sm:hidden flex items-center gap-2 text-blue-600 hover:text-blue-700 font-medium text-sm p-2 -m-2"
      >
        ← Geri
      </button>

      {/* DESKTOP: Breadcrumb */}
      <div className="hidden sm:block">
        <Breadcrumb
          items={[
            { label: "Ana Sayfa", to: "/" },
            { label: "Hisseler", to: "/stocks" },
            { label: symbol },
          ]}
        />
      </div>

      {/* Başlık */}
      <div className="bg-white border border-gray-200 rounded-xl sm:rounded-2xl shadow-sm p-3 sm:p-4">
        <div className="text-lg sm:text-xl font-semibold text-gray-800">{symbol}</div>
        <div className="text-sm text-gray-600 mt-1">{stock?.name || "Unknown"}</div>
      </div>

      {/* Fiyat Grafiği */}
      {chartData && (
        <StockPriceChart
          key={symbol}
          labels={chartData.labels}
          prices={chartData.prices}
        />
      )}

      {/* Özet Bilgi */}
      <div className="bg-white border border-gray-200 rounded-xl sm:rounded-2xl shadow-sm p-3 sm:p-4">
        <div className="grid grid-cols-2 gap-3">
          <div>
            <div className="text-xs text-gray-500">Başlangıç Fiyatı</div>
            <div className="text-lg font-semibold text-gray-800">
              ${stock?.startPrice || 0}
            </div>
          </div>
          <div>
            <div className="text-xs text-gray-500">Güncel Değişim</div>
            <div className="text-lg font-semibold text-green-600">+2.5%</div>
          </div>
        </div>
      </div>
    </div>
  );
}
