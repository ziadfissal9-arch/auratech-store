import { useState } from "react";
import { products } from "../data";
import { useReveal } from "../hooks";
import ProductCard from "./ProductCard";

const FILTERS = [
  { key: "all", label: "All Product" },
  { key: "headphones", label: "Headphones" },
  { key: "smartwatch", label: "Smartwatch" },
  { key: "earbuds", label: "Earbuds" },
];

// Newest 8 (reverse of source order) act as "new arrivals".
const arrivals = [...products].reverse().slice(0, 8);

export default function NewArrivals() {
  const [filter, setFilter] = useState("all");
  const ref = useReveal();

  const shown =
    filter === "all"
      ? arrivals
      : arrivals.filter((p) => p.category === filter);

  return (
    <section className="section">
      <div className="section-head center">
        <h2>New Arrival Products</h2>
      </div>

      <div className="filter-tabs">
        {FILTERS.map((f) => (
          <button
            key={f.key}
            className={`filter-tab ${filter === f.key ? "active" : ""}`}
            onClick={() => setFilter(f.key)}
          >
            {f.label}
          </button>
        ))}
      </div>

      <div className="product-grid reveal" ref={ref}>
        {shown.length > 0 ? (
          shown.map((p) => <ProductCard key={p.id} product={p} />)
        ) : (
          <p className="empty-note">No products in this category yet.</p>
        )}
      </div>
    </section>
  );
}
