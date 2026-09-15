import type { AuthUser, Order, Product } from "../types";

export class ApiError extends Error {
  status: number;
  constructor(status: number, message: string) {
    super(message);
    this.status = status;
  }
}

async function request<T>(path: string, init?: RequestInit): Promise<T> {
  const res = await fetch(`/api${path}`, {
    credentials: "include",
    headers: { "Content-Type": "application/json" },
    ...init,
  });

  if (!res.ok) {
    const body = await res.json().catch(() => null);
    throw new ApiError(res.status, body?.error ?? "Something went wrong.");
  }
  if (res.status === 204) return undefined as T;
  return res.json() as Promise<T>;
}

export interface ProductQuery {
  category?: string;
  q?: string;
  sort?: string;
}

export function fetchProducts(query: ProductQuery = {}): Promise<Product[]> {
  const params = new URLSearchParams();
  if (query.category) params.set("category", query.category);
  if (query.q) params.set("q", query.q);
  if (query.sort) params.set("sort", query.sort);
  const qs = params.toString();
  return request<Product[]>(`/products${qs ? `?${qs}` : ""}`);
}

export function fetchProduct(id: string): Promise<Product> {
  return request<Product>(`/products/${encodeURIComponent(id)}`);
}

export function fetchMe(): Promise<AuthUser> {
  return request<AuthUser>("/auth/me");
}

export function login(email: string, password: string): Promise<AuthUser> {
  return request<AuthUser>("/auth/login", {
    method: "POST",
    body: JSON.stringify({ email, password }),
  });
}

export function register(
  email: string,
  password: string,
  name: string
): Promise<AuthUser> {
  return request<AuthUser>("/auth/register", {
    method: "POST",
    body: JSON.stringify({ email, password, name }),
  });
}

export function logout(): Promise<{ ok: true }> {
  return request<{ ok: true }>("/auth/logout", { method: "POST" });
}

export function fetchOrders(): Promise<Order[]> {
  return request<Order[]>("/orders");
}

export function createOrder(items: { id: string; qty: number }[]): Promise<Order> {
  return request<Order>("/orders", {
    method: "POST",
    body: JSON.stringify({ items }),
  });
}
