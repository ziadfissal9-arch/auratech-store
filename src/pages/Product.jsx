import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import {
  Plus,
  Minus,
  ShoppingBag,
  Check,
  Truck,
  ShieldCheck,
  RefreshCw,
  ArrowLeft,
} from "lucide-react";
import { products, categories } from "../data";
import { useCart } from "../context/CartContext";
import { usd } from "../hooks";
import Stars from "../components/Stars";
import ProductCard from "../components/ProductCard";

const CAT_LABEL = Object.fromEntries(categories.map((c) => [c.key, c.name]));

export default function Product() {
  const { id } = useParams();
  const product = products.find((p) => p.id === id);
  const { add } = useCart();
  const [qty, setQty] = useState(1);
  const [added, setAdded] = useState(false);

  if (!product) {
    return (
      <div className="page-narrow center-block">
        <h1>Product not found</h1>
        <p>The product you’re looking for doesn’t exist.</p>
        <Link to="/shop" className="btn btn-orange">
          Back to shop
        </Link>
      </div>
    );
  }

  const related = products
    .filter((p) => p.category === product.category && p.id !== product.id)
    .slice(0, 4);
  const discount = product.oldPrice
    ? Math.round((1 - product.price / product.oldPrice) * 100)
    : 0;

  const onAdd = () => {
    add(product, qty);
    setAdded(true);
    setTimeout(() => setAdded(false), 1500);
  };

  return (
    <div className="product-page">
      <div className="breadcrumb">
        <Link to="/">Home</Link> <span>/</span>{" "}
        <Link to={`/shop/${product.category}`}>
          {CAT_LABEL[product.category]}
        </Link>{" "}
        <span>/</span> <span>{product.name}</span>
      </div>

      <div className="product-detail">
        <div className="detail-media">
          {product.tag && <span className="product-tag">{product.tag}</span>}
          <img src={product.image.replace("w=600", "w=900")} alt={product.name} />
        </div>

        <div className="detail-info">
          <span className="detail-brand">{product.brand}</span>
          <h1>{product.name}</h1>

          <div className="detail-rating">
            <Stars rating={product.rating} size={16} />
            <span>
              {product.rating} · {product.reviews.toLocaleString()} reviews
            </span>
          </div>

          <div className="detail-price">
            <span className="price-now">{usd(product.price)}</span>
            {product.oldPrice && (
              <>
                <span className="price-old">{usd(product.oldPrice)}</span>
                <span className="price-off">-{discount}%</span>
              </>
            )}
          </div>

          <p className="detail-blurb">{product.blurb}</p>

          <div className="detail-buy">
            <div className="qty-row big">
              <button
                onClick={() => setQty((q) => Math.max(1, q - 1))}
                aria-label="Decrease quantity"
              >
                <Minus size={16} />
              </button>
              <span>{qty}</span>
              <button
                onClick={() => setQty((q) => q + 1)}
                aria-label="Increase quantity"
              >
                <Plus size={16} />
              </button>
            </div>
            <button className="btn btn-orange btn-lg add-cart" onClick={onAdd}>
              {added ? (
                <>
                  <Check size={18} /> Added to cart
                </>
              ) : (
                <>
                  <ShoppingBag size={18} /> Add to Cart
                </>
              )}
            </button>
          </div>

          <ul className="detail-perks">
            <li>
              <Truck size={16} /> Free shipping on all orders
            </li>
            <li>
              <ShieldCheck size={16} /> 2-year warranty included
            </li>
            <li>
              <RefreshCw size={16} /> Free 30-day returns
            </li>
          </ul>
        </div>
      </div>

      {related.length > 0 && (
        <section className="section">
          <div className="section-head">
            <h2>You may also like</h2>
            <Link to={`/shop/${product.category}`} className="back-link">
              <ArrowLeft size={16} /> More {CAT_LABEL[product.category]}
            </Link>
          </div>
          <div className="product-grid">
            {related.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
