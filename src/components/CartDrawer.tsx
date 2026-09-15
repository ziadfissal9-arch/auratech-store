import { useEffect } from "react";
import { Link } from "react-router-dom";
import { X, Plus, Minus, Trash2, ShoppingBag } from "lucide-react";
import { useCart } from "../context/CartContext";
import { usd } from "../hooks";

export default function CartDrawer() {
  const { items, drawerOpen, closeCart, setQty, remove, subtotal, count } =
    useCart();

  // Lock body scroll while the drawer is open.
  useEffect(() => {
    document.body.style.overflow = drawerOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [drawerOpen]);

  // Close on Escape.
  useEffect(() => {
    if (!drawerOpen) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && closeCart();
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [drawerOpen, closeCart]);

  return (
    <>
      <div
        className={`drawer-backdrop ${drawerOpen ? "show" : ""}`}
        onClick={closeCart}
      />
      <aside className={`cart-drawer ${drawerOpen ? "open" : ""}`}>
        <div className="drawer-head">
          <h3>
            Your Cart <span className="drawer-count">({count})</span>
          </h3>
          <button className="icon-btn" onClick={closeCart} aria-label="Close cart">
            <X size={22} />
          </button>
        </div>

        {items.length === 0 ? (
          <div className="cart-empty">
            <ShoppingBag size={48} strokeWidth={1.2} />
            <p>Your cart is empty</p>
            <button className="btn btn-primary" onClick={closeCart}>
              Continue shopping
            </button>
          </div>
        ) : (
          <>
            <div className="drawer-items">
              {items.map((i) => (
                <div className="drawer-item" key={i.id}>
                  <img src={i.image} alt={i.name} />
                  <div className="drawer-item-body">
                    <Link
                      to={`/product/${i.id}`}
                      className="drawer-item-name"
                      onClick={closeCart}
                    >
                      {i.name}
                    </Link>
                    <span className="drawer-item-price">{usd(i.price)}</span>
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
                  <button
                    className="drawer-remove"
                    onClick={() => remove(i.id)}
                    aria-label={`Remove ${i.name}`}
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              ))}
            </div>

            <div className="drawer-foot">
              <div className="drawer-subtotal">
                <span>Subtotal</span>
                <b>{usd(subtotal)}</b>
              </div>
              <p className="drawer-note">
                Shipping &amp; taxes calculated at checkout.
              </p>
              <Link
                to="/cart"
                className="btn btn-primary btn-block"
                onClick={closeCart}
              >
                View Cart &amp; Checkout
              </Link>
            </div>
          </>
        )}
      </aside>
    </>
  );
}
