export default function SlidePanel({ open, onClose, children }) {
  return (
    <>
      {/* Overlay */}
      <div
        className={[
          "fixed inset-0 bg-black/40 transition-opacity duration-300 z-40",
          open ? "opacity-100 visible" : "opacity-0 invisible",
        ].join(" ")}
        onClick={onClose}
      />

      {/* Panel */}
      <div
        className={[
          "fixed top-0 right-0 h-full max-w-sm w-full  bg-gray-900 text-white shadow-2xl border-l border-gray-700",
          "transform transition-transform duration-300 z-50 flex flex-col",
          open ? "translate-x-0" : "translate-x-full",
        ].join(" ")}
        onClick={(e) => e.stopPropagation()} 
      >
        {children}
      </div>
    </>
  );
}
