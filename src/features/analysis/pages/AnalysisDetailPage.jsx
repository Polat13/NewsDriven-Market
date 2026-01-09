import { useParams, useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";

import Breadcrumb from "../../../shared/ui/Breadcrumb";
import AnalysisImpactChart from "../ui/AnalysisImpactChart";
import { useAnalysisImpact } from "../hooks/useAnalysisImpact";
import { analysisApi } from "../api/AnalysisService";

export function AnalysisDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();

  const { data, isLoading: loading, error } = useQuery({
    queryKey: ["analysis-detail", id],
    queryFn: () => analysisApi.detail(id),
    enabled: !!id, // id yoksa request atma
  });

  // chart şimdilik fake - id değişince yeniden üret
  // Backend impact verirse fake yerine gerçek map (fake otomatik kapanır)
  const { impact, useFakeImpact } = useAnalysisImpact({ id, data });

  // detail'den gelecek alanlar
  // Backend response format: { stock: {...}, news: {...} } veya farklı format
  const stock = data?.stock || data?.stockData || null;
  const news = data?.news || data?.newsData || null;

  return (
    <div className="flex flex-col gap-4 sm:gap-4">
      {/* Mobil geri */}
      <button
        onClick={() => navigate("/analysis")}
        className="sm:hidden flex items-center gap-2 text-blue-600 hover:text-blue-700 font-medium text-sm p-2 -m-2"
      >
        ← Geri
      </button>

      {/* Desktop breadcrumb */}
      <div className="hidden sm:block">
        <Breadcrumb
          items={[
            { label: "Ana Sayfa", to: "/" },
            { label: "Analizler", to: "/analysis" },
            { label: id },
          ]}
        />
      </div>

      {/* Loading / Error */}
      {loading && <div className="text-sm text-gray-600">Yükleniyor...</div>}

      {error && (
        <div className="text-sm text-red-600">
          {error.message || "Analysis detail fetch failed"}
        </div>
      )}

      <div className="grid grid-cols-1 gap-4">
        {/* ÜSTTE HİSSE */}
        <div className="bg-white border border-gray-200 rounded-xl sm:rounded-2xl p-3 sm:p-4">
          <div className="flex items-center justify-between mb-3">
            <div className="text-sm font-semibold text-gray-700">Hisse</div>

            {stock ? (
              <div className="flex items-center gap-2">
                <span className="px-2 py-1 rounded-lg bg-gray-100 text-gray-800 text-sm font-semibold">
                  {stock.symbol}
                </span>
                <span className="text-xs sm:text-sm text-gray-600 truncate">
                  {stock.name}
                </span>
              </div>
            ) : (
              <span className="text-sm text-gray-500">—</span>
            )}
          </div>

          {/* Backend impact verirse fake yerine gerçek map:
              const imp = data.analysis?.impact; // {d1,d2,d3}
              if (imp) setImpact({ labels:["D+1","D+2","D+3"], values:[imp.d1, imp.d2, imp.d3] });
          */}
          <AnalysisImpactChart
            key={id}
            labels={impact.labels}
            values={impact.values}
          />

          {/* İstersen debug için:
              <div className="mt-2 text-xs text-gray-500">
                Impact source: {useFakeImpact ? "fake" : "backend"}
              </div>
          */}
        </div>

        {/* ALTTA HABER */}
        <div className="bg-white border border-gray-200 rounded-xl sm:rounded-2xl p-3 sm:p-4">
          <div className="text-sm font-semibold text-gray-700 mb-3">Haber</div>

          <div className="text-sm text-gray-700">
            {news ? (
              <div className="flex flex-col gap-2">
                <div className="font-medium text-gray-800 line-clamp-2">
                  {news.headline}
                </div>

                {news.url && (
                  <a
                    href={news.url}
                    target="_blank"
                    rel="noreferrer"
                    className="text-blue-600 hover:text-blue-700 text-xs sm:text-sm"
                  >
                    Detay için tıkla →
                  </a>
                )}
              </div>
            ) : (
              <span className="text-xs sm:text-sm text-gray-500">
                Haber başlığı + link
              </span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default AnalysisDetailPage;
