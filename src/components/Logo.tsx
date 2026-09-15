import { Link } from "react-router-dom";

// The Auratech wordmark with its little "A" glyph.
export default function Logo({ light = false }: { light?: boolean }) {
  return (
    <Link to="/" className={`logo ${light ? "logo-light" : ""}`}>
      <span className="logo-mark" aria-hidden="true">
        <svg width="22" height="22" viewBox="0 0 32 32">
          <path
            d="M16 4 L28 28 H21.5 L19.4 23 H12.6 L10.5 28 H4 Z M14.4 18 H17.6 L16 13.2 Z"
            fill="currentColor"
          />
        </svg>
      </span>
      AURATECH
    </Link>
  );
}
