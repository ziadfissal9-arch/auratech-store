import {
  createContext,
  useContext,
  useEffect,
  useReducer,
  useState,
  type ReactNode,
} from "react";
import type { CartContextValue, CartItem, Product } from "../types";

// Cart state lives here and persists to localStorage so it survives reloads.
const CartContext = createContext<CartContextValue | null>(null);

const STORAGE_KEY = "auratech-cart";

function loadInitial(): CartItem[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? (JSON.parse(raw) as CartItem[]) : [];
  } catch {
    return [];
  }
}

type Action =
  | { type: "ADD"; product: Product; qty: number }
  | { type: "REMOVE"; id: string }
  | { type: "SET_QTY"; id: string; qty: number }
  | { type: "CLEAR" };

function reducer(state: CartItem[], action: Action): CartItem[] {
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

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, dispatch] = useReducer(reducer, undefined, loadInitial);
  const [drawerOpen, setDrawerOpen] = useState(false);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
    } catch {
      // ignore write errors (e.g. private mode)
    }
  }, [items]);

  const add = (product: Product, qty = 1) => {
    dispatch({ type: "ADD", product, qty });
    setDrawerOpen(true);
  };
  const remove = (id: string) => dispatch({ type: "REMOVE", id });
  const setQty = (id: string, qty: number) => dispatch({ type: "SET_QTY", id, qty });
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

export function useCart(): CartContextValue {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used within CartProvider");
  return ctx;
}
