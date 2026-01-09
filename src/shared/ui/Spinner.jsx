export function Spinner() {
  return (
    <div className="flex items-center gap-2 text-gray-700">
      <div className="h-4 w-4 animate-spin rounded-full border-2 border-gray-300 border-t-blue-600" />
      <span className="text-sm">Yükleniyor...</span>
    </div>
  );
}

export default Spinner;