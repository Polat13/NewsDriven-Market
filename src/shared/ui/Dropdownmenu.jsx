import { useEffect, useRef } from "react";

export function Dropdown({ open, onClose, children, align = "right" }) {
  const ref = useRef(null);

  useEffect(() => {
    function onDoc(e) {
      if (!ref.current) return;
      if (!ref.current.contains(e.target)) onClose?.();
    }
    if (open) document.addEventListener("mousedown", onDoc);
    return () => document.removeEventListener("mousedown", onDoc);
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div
      ref={ref}
      className={[
        "absolute top-full mt-2 w-48 rounded-2xl border border-gray-200 bg-white shadow-lg overflow-hidden",
        align === "right" ? "right-0" : "left-0",
      ].join(" ")}
    >
      {children}
    </div>
  );
}

export default Dropdown;