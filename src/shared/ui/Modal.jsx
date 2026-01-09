export default function Modal({ open, onClose, children }) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50">
      <div
        className="absolute inset-0 bg-black/40"
        onClick={onClose}
        aria-hidden="true"
      />
      <div className="absolute inset-0 flex items-start justify-center p-4 sm:p-8 pt-16 sm:pt-20" onClick={(e) => e.stopPropagation()}>
        <div className="w-full max-w-2xl rounded-3xl bg-white shadow-2xl border border-gray-200" onClick={(e) => e.stopPropagation()}>
          {children}
        </div>
      </div>
    </div>
  );
}
