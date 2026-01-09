import { Outlet } from "react-router-dom";

export default function StocksPage() {
  return (
    <div className="flex flex-col gap-4">
      <div className="text-xl font-semibold text-gray-700">Hisse Senetleri</div>
      <Outlet />
      <div className="text-sm text-gray-600">
        Sağ panelden bir hisse seçerek detayını görüntüleyebilirsin.
      </div>
    </div>
  );
}
