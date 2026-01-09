import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Breadcrumb from "../../../shared/ui/Breadcrumb";
import { newsApi } from "../api/NewsService";

export default function NewsDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [news, setNews] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function fetchNews() {
      try {
        setLoading(true);
        setError("");

        const data = await newsApi.detail(id);
        setNews(data);
      } catch (err) {
        setError(err.message || "Haber yüklenirken hata oluştu");
        console.error("News detail fetch error:", err);
      } finally {
        setLoading(false);
      }
    }

    fetchNews();
  }, [id]);

  if (loading) {
    return (
      <div className="flex flex-col gap-4">
        <button
          onClick={() => navigate("/news")}
          className="sm:hidden flex items-center gap-2 text-blue-600 hover:text-blue-700 font-medium text-sm p-2 -m-2"
        >
          ← Geri
        </button>
        <div className="hidden sm:block">
          <Breadcrumb items={[{ label: "Ana Sayfa", to: "/" }, { label: "Haberler", to: "/news" }, { label: id }]} />
        </div>
        <div className="text-center text-gray-600">Yükleniyor...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col gap-4">
        <button
          onClick={() => navigate("/news")}
          className="sm:hidden flex items-center gap-2 text-blue-600 hover:text-blue-700 font-medium text-sm p-2 -m-2"
        >
          ← Geri
        </button>
        <div className="hidden sm:block">
          <Breadcrumb items={[{ label: "Ana Sayfa", to: "/" }, { label: "Haberler", to: "/news" }, { label: id }]} />
        </div>
        <div className="text-center text-red-600">{error}</div>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-4">
      <button
        onClick={() => navigate("/news")}
        className="sm:hidden flex items-center gap-2 text-blue-600 hover:text-blue-700 font-medium text-sm p-2 -m-2"
      >
        ← Geri
      </button>
      <div className="hidden sm:block">
        <Breadcrumb items={[{ label: "Ana Sayfa", to: "/" }, { label: "Haberler", to: "/news" }, { label: id }]} />
      </div>
      <div className="border border-gray-200 rounded-2xl p-4 bg-white">
        <div className="text-lg font-semibold text-gray-700">{news?.headline || news?.title || "Haber Detayı"}</div>
        {news?.body && <div className="text-sm text-gray-600 pt-3">{news.body}</div>}
        {news?.source && <div className="text-xs text-gray-500 pt-2">Kaynak: {news.source}</div>}
        {news?.url && (
          <a
            href={news.url}
            target="_blank"
            rel="noreferrer"
            className="inline-block mt-3 text-blue-600 hover:text-blue-700 text-sm font-medium"
          >
            Tam Haberi Oku →
          </a>
        )}
      </div>
    </div>
  );
}
