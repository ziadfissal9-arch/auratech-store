export type ProductTag = "Sale" | "New" | "Trending" | "Popular";

export interface Product {
  id: string;
  name: string;
  category: string;
  brand: string;
  price: number;
  oldPrice?: number | null;
  rating: number;
  reviews: number;
  tag?: ProductTag | null;
  image: string;
  blurb: string;
}

export interface Category {
  key: string;
  name: string;
  image: string;
}

export interface NavLink {
  label: string;
  to: string;
}

export interface FooterColumn {
  title: string;
  links: string[];
}

export interface Promo {
  title: string;
  cta: string;
  image: string;
}

export interface Perk {
  icon: "Truck" | "ShieldCheck" | "RefreshCw";
  title: string;
}

export interface CartItem extends Product {
  qty: number;
}

export interface CartContextValue {
  items: CartItem[];
  add: (product: Product, qty?: number) => void;
  remove: (id: string) => void;
  setQty: (id: string, qty: number) => void;
  clear: () => void;
  count: number;
  subtotal: number;
  drawerOpen: boolean;
  openCart: () => void;
  closeCart: () => void;
}

export interface AuthUser {
  id: number;
  email: string;
  name: string;
}

export interface OrderItem {
  id: number;
  orderId: number;
  productId: string;
  name: string;
  price: number;
  qty: number;
}

export interface Order {
  id: number;
  userId: number;
  subtotal: number;
  tax: number;
  shipping: number;
  total: number;
  status: string;
  createdAt: string;
  items: OrderItem[];
}
