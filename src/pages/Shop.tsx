import { useState } from "react";
import { useParams, useSearchParams, Link } from "react-router-dom";
import { SlidersHorizontal } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { categories } from "../data";
import { fetchProducts } from "../lib/api";
import ProductCard from "../components/ProductCard";

const SORTS = [
  { key: "featured", label: "Featured" },
  { key: "price-asc", label: "Price: Low to High" },
  { key: "price-desc", label: "Price: High to Low" },
  { key: "rating", label: "Top Rated" },
];

const CAT_LABEL = Object.fromEntries(categories.map((c) => [c.key, c.name]));

export default function Shop() {
  const { category } = useParams();
  const [params] = useSearchParams();
  const query = params.get("q") || "";
  const [sort, setSort] = useState("featured");

  const { data: shown = [], isLoading } = useQuery({
    queryKey: ["products", { category, query, sort }],
    queryFn: () => fetchProducts({ category, q: query, sort }),
  });

  const heading = query
    ? `Results for “${query}”`
    : category
      ? CAT_LABEL[category] || "Shop"
      : "All Products";

  return (
    <div className="shop">
      <div className="shop-hero">
        <div className="breadcrumb">
          <Link to="/">Home</Link> <span>/</span>{" "}
          <span>{category ? CAT_LABEL[category] || "Shop" : "Shop"}</span>
        </div>
        <h1>{heading}</h1>
        <p>{shown.length} products</p>
      </div>

      <div className="shop-body">
        <aside className="shop-sidebar">
          <h4>
            <SlidersHorizontal size={16} /> Categories
          </h4>
          <ul className="cat-filter">
            <li>
              <Link
                to="/shop"
                className={!category ? "active" : ""}
              >
                All Products
              </Link>
            </li>
            {categories.map((c) => (
              <li key={c.key}>
                <Link
                  to={`/shop/${c.key}`}
                  className={category === c.key ? "active" : ""}
                >
                  {c.name}
                </Link>
              </li>
            ))}
          </ul>
        </aside>

        <div className="shop-main">
          <div className="shop-toolbar">
            <span>{shown.length} results</span>
            <label className="sort-select">
              Sort by:
              <select value={sort} onChange={(e) => setSort(e.target.value)}>
                {SORTS.map((s) => (
                  <option key={s.key} value={s.key}>
                    {s.label}
                  </option>
                ))}
              </select>
            </label>
          </div>

          {isLoading ? (
            <p className="empty-note">Loading products…</p>
          ) : shown.length > 0 ? (
            <div className="product-grid shop-grid">
              {shown.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          ) : (
            <div className="shop-empty">
              <p>No products match your search.</p>
              <Link to="/shop" className="btn btn-primary">
                Browse all products
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
