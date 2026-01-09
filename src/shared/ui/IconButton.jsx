export default function IconButton({ active, children, onClick, title }) {
  return (
    <button
      type="button"
      title={title}
      onClick={onClick}
      className={[
        "h-12 w-12 rounded-2xl flex items-center justify-center text-lg",
        "transition-all duration-200 font-semibold",
        active 
          ? "bg-blue-600 text-white shadow-lg shadow-blue-600/30" 
          : "bg-white/10 text-white/80 hover:bg-white/20 hover:text-white hover:shadow-md",
      ].join(" ")}
    >
      {children}
    </button>
  );
}
