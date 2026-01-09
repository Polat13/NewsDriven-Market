import { useRouteError, Link } from "react-router-dom";

export default function ErrorPage() {
  const error = useRouteError();

  // Hata türüne göre mesaj ve status
  const status = error?.status || 404;
  const statusText = error?.statusText || "Sayfa Bulunamadı";
  const message = error?.data || "İstediğiniz sayfa artık mevcut değil veya erişim izni yok.";

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-6">
      <div className="w-full max-w-md text-center">
        {/* Error Icon */}
        <div className="mb-6 flex justify-center">
          <div className="h-24 w-24 rounded-full bg-red-100 flex items-center justify-center">
            <span className="text-5xl">⚠️</span>
          </div>
        </div>

        {/* Status Code */}
        <h1 className="text-6xl font-bold text-gray-900 mb-2">{status}</h1>

        {/* Error Title */}
        <h2 className="text-2xl font-semibold text-gray-900 mb-3">{statusText}</h2>

        {/* Error Message */}
        <p className="text-gray-600 mb-8 leading-relaxed">
          {message}
        </p>

        {/* Action Buttons */}
        <div className="flex flex-col gap-3 sm:flex-row sm:gap-3 justify-center">
          <Link
            to="/"
            className="px-6 py-3 bg-blue-600 text-white font-semibold rounded-2xl hover:bg-blue-700 transition-colors shadow-sm"
          >
            🏠 Ana Sayfa
          </Link>
          <button
            onClick={() => window.history.back()}
            className="px-6 py-3 bg-gray-200 text-gray-900 font-semibold rounded-2xl hover:bg-gray-300 transition-colors shadow-sm"
          >
            ← Geri Dön
          </button>
        </div>

        {/* Debug Info (development only) */}
        {import.meta.env.DEV && error?.message && (
          <div className="mt-8 p-4 bg-red-50 border border-red-200 rounded-xl text-left">
            <p className="text-sm font-mono text-red-800">{error.message}</p>
          </div>
        )}
      </div>
    </div>
  );
}
