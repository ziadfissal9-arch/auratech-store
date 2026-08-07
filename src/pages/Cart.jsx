import { useState } from "react";
import { Link } from "react-router-dom";
import {
  Plus,
  Minus,
  Trash2,
  ShoppingBag,
  ArrowLeft,
  CheckCircle2,
  Tag,
} from "lucide-react";
import { useCart } from "../context/CartContext";
import { usd } from "../hooks";

const SHIPPING = 0; // free shipping
const TAX_RATE = 0.08;

export default function Cart() {
  const { items, setQty, remove, subtotal, clear, count } = useCart();
  const [placed, setPlaced] = useState(false);
  const [promo, setPromo] = useState("");
  const [promoMsg, setPromoMsg] = useState("");

  const tax = subtotal * TAX_RATE;
  const total = subtotal + SHIPPING + tax;

  const applyPromo = (e) => {
    e.preventDefault();
    setPromoMsg(
      promo.trim()
        ? "Invalid code — try again later."
        : "Enter a promo code first."
    );
  };

  const checkout = () => {
    setPlaced(true);
    clear();
    window.scrollTo(0, 0);
  };

  if (placed) {
    return (
      <div className="page-narrow center-block cart-done">
        <div className="success-icon">
          <CheckCircle2 size={44} />
        </div>
        <h1>Thank you for your order! 🎉</h1>
        <p>
          Your order has been placed successfully. A confirmation email is on
          its way with tracking details.
        </p>
        <Link to="/shop" className="btn btn-orange btn-lg">
          Continue Shopping
        </Link>
      </div>
    );
  }

  if (count === 0) {
    return (
      <div className="page-narrow center-block">
        <div className="empty-cart-icon">
          <ShoppingBag size={56} strokeWidth={1.2} />
        </div>
        <h1>Your cart is empty</h1>
        <p>Looks like you haven’t added anything yet.</p>
        <Link to="/shop" className="btn btn-orange btn-lg">
          Start Shopping
        </Link>
      </div>
    );
  }

  return (
    <div className="cart-page">
      <div className="breadcrumb">
        <Link to="/">Home</Link> <span>/</span> <span>Cart</span>
      </div>
      <h1 className="cart-title">Shopping Cart</h1>

      <div className="cart-layout">
        <div className="cart-items">
          <div className="cart-items-head">
            <span>Product</span>
            <span>Quantity</span>
            <span>Total</span>
          </div>

          {items.map((i) => (
            <div className="cart-row" key={i.id}>
              <div className="cart-row-product">
                <img src={i.image} alt={i.name} />
                <div>
                  <Link to={`/product/${i.id}`} className="cart-row-name">
                    {i.name}
                  </Link>
                  <span className="cart-row-brand">{i.brand}</span>
                  <span className="cart-row-unit">{usd(i.price)} each</span>
                </div>
              </div>

              <div className="cart-row-qty">
                <div className="qty-row">
                  <button
                    onClick={() => setQty(i.id, i.qty - 1)}
                    aria-label="Decrease quantity"
                  >
                    <Minus size={14} />
                  </button>
                  <span>{i.qty}</span>
                  <button
                    onClick={() => setQty(i.id, i.qty + 1)}
                    aria-label="Increase quantity"
                  >
                    <Plus size={14} />
                  </button>
                </div>
              </div>

              <div className="cart-row-total">
                <b>{usd(i.price * i.qty)}</b>
                <button
                  className="cart-row-remove"
                  onClick={() => remove(i.id)}
                  aria-label={`Remove ${i.name}`}
                >
                  <Trash2 size={16} />
                </button>
              </div>
            </div>
          ))}

          <div className="cart-actions">
            <Link to="/shop" className="back-link">
              <ArrowLeft size={16} /> Continue Shopping
            </Link>
            <button className="clear-cart" onClick={clear}>
              Clear Cart
            </button>
          </div>
        </div>

        <aside className="cart-summary">
          <h3>Order Summary</h3>

          <form className="promo-row" onSubmit={applyPromo}>
            <div className="promo-input">
              <Tag size={16} />
              <input
                type="text"
                placeholder="Promo code"
                value={promo}
                onChange={(e) => {
                  setPromo(e.target.value);
                  setPromoMsg("");
                }}
              />
            </div>
            <button type="submit" className="btn btn-dark btn-sm">
              Apply
            </button>
          </form>
          {promoMsg && <p className="promo-msg">{promoMsg}</p>}

          <div className="summary-line">
            <span>Subtotal ({count} items)</span>
            <span>{usd(subtotal)}</span>
          </div>
          <div className="summary-line">
            <span>Shipping</span>
            <span className="free">Free</span>
          </div>
          <div className="summary-line">
            <span>Estimated tax (8%)</span>
            <span>{usd(tax)}</span>
          </div>
          <div className="summary-total">
            <span>Total</span>
            <span>{usd(total)}</span>
          </div>

          <button className="btn btn-orange btn-lg btn-block" onClick={checkout}>
            Proceed to Checkout
          </button>
          <p className="summary-note">
            Secure checkout · Free returns within 30 days
          </p>
        </aside>
      </div>
    </div>
  );
}
