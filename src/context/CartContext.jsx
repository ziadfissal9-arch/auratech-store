import {
  createContext,
  useContext,
  useEffect,
  useReducer,
  useState,
} from "react";

// Cart state lives here and persists to localStorage so it survives reloads.
const CartContext = createContext(null);

const STORAGE_KEY = "auratech-cart";

function loadInitial() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

function reducer(state, action) {
  switch (action.type) {
    case "ADD": {
      const existing = state.find((i) => i.id === action.product.id);
      if (existing) {
        return state.map((i) =>
          i.id === action.product.id
            ? { ...i, qty: i.qty + (action.qty || 1) }
            : i
        );
      }
      return [...state, { ...action.product, qty: action.qty || 1 }];
    }
    case "REMOVE":
      return state.filter((i) => i.id !== action.id);
    case "SET_QTY":
      return state
        .map((i) =>
          i.id === action.id ? { ...i, qty: Math.max(0, action.qty) } : i
        )
        .filter((i) => i.qty > 0);
    case "CLEAR":
      return [];
    default:
      return state;
  }
}

export function CartProvider({ children }) {
  const [items, dispatch] = useReducer(reducer, undefined, loadInitial);
  const [drawerOpen, setDrawerOpen] = useState(false);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
    } catch {
      // ignore write errors (e.g. private mode)
    }
  }, [items]);

  const add = (product, qty = 1) => {
    dispatch({ type: "ADD", product, qty });
    setDrawerOpen(true);
  };
  const remove = (id) => dispatch({ type: "REMOVE", id });
  const setQty = (id, qty) => dispatch({ type: "SET_QTY", id, qty });
  const clear = () => dispatch({ type: "CLEAR" });

  const openCart = () => setDrawerOpen(true);
  const closeCart = () => setDrawerOpen(false);

  const count = items.reduce((n, i) => n + i.qty, 0);
  const subtotal = items.reduce((sum, i) => sum + i.price * i.qty, 0);

  return (
    <CartContext.Provider
      value={{
        items,
        add,
        remove,
        setQty,
        clear,
        count,
        subtotal,
        drawerOpen,
        openCart,
        closeCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

// eslint-disable-next-line react-refresh/only-export-components
export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used within CartProvider");
  return ctx;
}
