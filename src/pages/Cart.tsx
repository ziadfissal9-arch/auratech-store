import { useState, type FormEvent } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useMutation, useQueryClient } from "@tanstack/react-query";
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
import { useAuth } from "../context/AuthContext";
import { createOrder, ApiError } from "../lib/api";
import { usd } from "../hooks";
import type { Order } from "../types";

const SHIPPING = 0; // free shipping
const TAX_RATE = 0.08;

export default function Cart() {
  const { items, setQty, remove, subtotal, clear, count } = useCart();
  const { user } = useAuth();
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const [placedOrder, setPlacedOrder] = useState<Order | null>(null);
  const [promo, setPromo] = useState("");
  const [promoMsg, setPromoMsg] = useState("");
  const [checkoutError, setCheckoutError] = useState("");

  const tax = subtotal * TAX_RATE;
  const total = subtotal + SHIPPING + tax;

  const placeOrderMutation = useMutation({
    mutationFn: () => createOrder(items.map((i) => ({ id: i.id, qty: i.qty }))),
    onSuccess: (order) => {
      setPlacedOrder(order);
      clear();
      queryClient.invalidateQueries({ queryKey: ["orders"] });
      window.scrollTo(0, 0);
    },
    onError: (err) => {
      setCheckoutError(
        err instanceof ApiError ? err.message : "Something went wrong."
      );
    },
  });

  const applyPromo = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setPromoMsg(
      promo.trim()
        ? "This is a demo store — promo codes aren't active."
        : "Enter a promo code first."
    );
  };

  const checkout = () => {
    if (!user) {
      navigate("/login", { state: { from: "/cart" } });
      return;
    }
    setCheckoutError("");
    placeOrderMutation.mutate();
  };

  if (placedOrder) {
    return (
      <div className="page-narrow center-block cart-done">
        <div className="success-icon">
          <CheckCircle2 size={44} />
        </div>
        <h1>Thank you for your order!</h1>
        <p>
          Order #{placedOrder.id} has been placed — total {usd(placedOrder.total)}.
        </p>
        <Link to="/orders" className="btn btn-primary btn-lg">
          View My Orders
        </Link>
        <p className="demo-note">
          This is a portfolio demo — no real payment was processed.
        </p>
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
        <Link to="/shop" className="btn btn-primary btn-lg">
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
            <button type="submit" className="btn btn-primary btn-sm">
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

          {checkoutError && <div className="form-error">{checkoutError}</div>}

          <button
            className="btn btn-primary btn-lg btn-block"
            onClick={checkout}
            disabled={placeOrderMutation.isPending}
          >
            {placeOrderMutation.isPending
              ? "Placing order…"
              : user
                ? "Proceed to Checkout"
                : "Sign in to Checkout"}
          </button>
          <p className="summary-note">
            Secure checkout · Free returns within 30 days
          </p>
        </aside>
      </div>
    </div>
  );
}
