import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { fetchProducts } from "../lib/api";
import { useReveal } from "../hooks";
import ProductCard from "./ProductCard";

export default function BestSellers() {
  const ref = useReveal();
  const { data: products, isLoading } = useQuery({
    queryKey: ["products"],
    queryFn: () => fetchProducts(),
  });

  // Top 8 by rating stand in for "best sellers".
  const bestSellers = [...(products ?? [])]
    .sort((a, b) => b.rating - a.rating)
    .slice(0, 8);

  return (
    <section className="section">
      <div className="section-head">
        <h2>Best Seller Products</h2>
        <Link to="/shop" className="btn btn-primary btn-sm">
          View all Products <ArrowRight size={16} />
        </Link>
      </div>

      {isLoading ? (
        <p className="empty-note">Loading products…</p>
      ) : (
        <div className="product-grid reveal" ref={ref}>
          {bestSellers.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      )}
    </section>
  );
}
