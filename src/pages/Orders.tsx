import { Navigate, Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { ShoppingBag } from "lucide-react";
import { useAuth } from "../context/AuthContext";
import { fetchOrders } from "../lib/api";
import { usd } from "../hooks";

export default function Orders() {
  const { user, isLoading: authLoading, logout } = useAuth();

  const { data: orders, isLoading } = useQuery({
    queryKey: ["orders"],
    queryFn: fetchOrders,
    enabled: !!user,
  });

  if (authLoading) return <div className="page-narrow center-block">Loading…</div>;
  if (!user) return <Navigate to="/login" state={{ from: "/orders" }} replace />;

  return (
    <div className="orders-page">
      <div className="orders-head">
        <div>
          <h1>My Orders</h1>
          <p>Signed in as {user.email}</p>
        </div>
        <button className="btn btn-outline btn-sm" onClick={() => logout()}>
          Sign out
        </button>
      </div>

      {isLoading ? (
        <p className="empty-note">Loading orders…</p>
      ) : orders && orders.length > 0 ? (
        <div className="orders-list">
          {orders.map((order) => (
            <div className="order-card" key={order.id}>
              <div className="order-card-head">
                <h3>Order #{order.id}</h3>
                <span className="order-status">{order.status}</span>
              </div>
              <p className="order-date">
                {new Date(order.createdAt).toLocaleDateString(undefined, {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </p>
              {order.items.map((item) => (
                <div className="order-line" key={item.id}>
                  <span>
                    {item.name} × {item.qty}
                  </span>
                  <span>{usd(item.price * item.qty)}</span>
                </div>
              ))}
              <div className="order-total">
                <span>Total</span>
                <span>{usd(order.total)}</span>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="cart-empty">
          <ShoppingBag size={48} strokeWidth={1.2} />
          <p>You haven’t placed any orders yet</p>
          <Link to="/shop" className="btn btn-primary">
            Start shopping
          </Link>
        </div>
      )}
    </div>
  );
}
