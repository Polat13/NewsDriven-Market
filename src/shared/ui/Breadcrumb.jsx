import { Link } from "react-router-dom";

export function Breadcrumb({ items }) {
  return (
    <nav className="flex items-center gap-2 text-sm text-gray-600">
      {items.map((it, idx) => (
        <div key={it.to || it.label} className="flex items-center gap-2">
          {it.to ? (
            <Link to={it.to} className="hover:text-gray-800">
              {it.label}
            </Link>
          ) : (
            <span className="text-gray-800 font-medium">{it.label}</span>
          )}
          {idx !== items.length - 1 && <span className="text-gray-400">/</span>}
        </div>
      ))}
    </nav>
  );
}
 
export default Breadcrumb;