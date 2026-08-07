import { Link } from "react-router-dom";
import { Plus, Check } from "lucide-react";
import { useState } from "react";
import { useCart } from "../context/CartContext";
import { usd } from "../hooks";
import Stars from "./Stars";

const TAG_CLASS = {
  Sale: "tag-sale",
  New: "tag-new",
  Trending: "tag-trending",
  Popular: "tag-popular",
};

export default function ProductCard({ product }) {
  const { add } = useCart();
  const [added, setAdded] = useState(false);

  const onAdd = (e) => {
    e.preventDefault();
    add(product, 1);
    setAdded(true);
    setTimeout(() => setAdded(false), 1200);
  };

  return (
    <Link to={`/product/${product.id}`} className="product-card">
      {product.tag && (
        <span className={`product-tag ${TAG_CLASS[product.tag] || ""}`}>
          {product.tag}
        </span>
      )}
      <div className="product-thumb">
        <img src={product.image} alt={product.name} loading="lazy" />
      </div>
      <div className="product-body">
        <div className="product-rating">
          <Stars rating={product.rating} />
          <span className="rating-num">{product.rating}</span>
        </div>
        <h3 className="product-name">{product.name}</h3>
        <div className="product-foot">
          <div className="product-price">
            <span className="price-now">{usd(product.price)}</span>
            {product.oldPrice && (
              <span className="price-old">{usd(product.oldPrice)}</span>
            )}
          </div>
          <button
            className={`add-btn ${added ? "added" : ""}`}
            onClick={onAdd}
            aria-label={`Add ${product.name} to cart`}
          >
            {added ? <Check size={18} /> : <Plus size={18} />}
          </button>
        </div>
      </div>
    </Link>
  );
}
