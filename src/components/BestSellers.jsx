import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { products } from "../data";
import { useReveal } from "../hooks";
import ProductCard from "./ProductCard";

// Top 8 by rating stand in for "best sellers".
const bestSellers = [...products]
  .sort((a, b) => b.rating - a.rating)
  .slice(0, 8);

export default function BestSellers() {
  const ref = useReveal();
  return (
    <section className="section">
      <div className="section-head">
        <h2>Best Seller Products</h2>
        <Link to="/shop" className="btn btn-orange btn-sm">
          View all Products <ArrowRight size={16} />
        </Link>
      </div>

      <div className="product-grid reveal" ref={ref}>
        {bestSellers.map((p) => (
          <ProductCard key={p.id} product={p} />
        ))}
      </div>
    </section>
  );
}
