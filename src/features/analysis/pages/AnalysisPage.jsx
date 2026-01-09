import { Outlet } from "react-router-dom";

export function AnalysisPage() {
  return (
    <div className="flex flex-col gap-3">
      <div className="text-xl font-semibold text-gray-700">Analizler</div>
      <Outlet />
      <div className="text-sm text-gray-600">
        Sağ panelden bir analiz seçerek detayını görüntüleyebilirsin.
      </div>
    </div>
  );
}

export default AnalysisPage;