import { useMemo, useState } from "react";
import { useParams, useSearchParams, Link } from "react-router-dom";
import { SlidersHorizontal } from "lucide-react";
import { products, categories } from "../data";
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
  const query = (params.get("q") || "").toLowerCase();
  const [sort, setSort] = useState("featured");

  const shown = useMemo(() => {
    let list = products.slice();
    if (category) list = list.filter((p) => p.category === category);
    if (query) {
      list = list.filter(
        (p) =>
          p.name.toLowerCase().includes(query) ||
          p.brand.toLowerCase().includes(query) ||
          p.category.toLowerCase().includes(query)
      );
    }
    switch (sort) {
      case "price-asc":
        list.sort((a, b) => a.price - b.price);
        break;
      case "price-desc":
        list.sort((a, b) => b.price - a.price);
        break;
      case "rating":
        list.sort((a, b) => b.rating - a.rating);
        break;
      default:
        break;
    }
    return list;
  }, [category, query, sort]);

  const heading = query
    ? `Results for “${params.get("q")}”`
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

          {shown.length > 0 ? (
            <div className="product-grid shop-grid">
              {shown.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          ) : (
            <div className="shop-empty">
              <p>No products match your search.</p>
              <Link to="/shop" className="btn btn-orange">
                Browse all products
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
