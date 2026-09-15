import { act, renderHook } from "@testing-library/react";
import { beforeEach, describe, expect, it } from "vitest";
import type { ReactNode } from "react";
import { CartProvider, useCart } from "./CartContext";
import type { Product } from "../types";

const product: Product = {
  id: "test-product",
  name: "Test Headphones",
  category: "headphones",
  brand: "TESTCO",
  price: 100,
  rating: 4.5,
  reviews: 10,
  image: "https://example.com/image.jpg",
  blurb: "A product used for testing.",
};

const wrapper = ({ children }: { children: ReactNode }) => (
  <CartProvider>{children}</CartProvider>
);

beforeEach(() => {
  localStorage.clear();
});

describe("useCart", () => {
  it("throws when used outside a CartProvider", () => {
    expect(() => renderHook(() => useCart())).toThrow(
      "useCart must be used within CartProvider"
    );
  });

  it("starts empty", () => {
    const { result } = renderHook(() => useCart(), { wrapper });
    expect(result.current.items).toHaveLength(0);
    expect(result.current.count).toBe(0);
    expect(result.current.subtotal).toBe(0);
  });

  it("adds a product and opens the drawer", () => {
    const { result } = renderHook(() => useCart(), { wrapper });
    act(() => result.current.add(product));
    expect(result.current.items).toHaveLength(1);
    expect(result.current.count).toBe(1);
    expect(result.current.subtotal).toBe(100);
    expect(result.current.drawerOpen).toBe(true);
  });

  it("increments quantity when adding the same product again", () => {
    const { result } = renderHook(() => useCart(), { wrapper });
    act(() => result.current.add(product));
    act(() => result.current.add(product, 2));
    expect(result.current.items).toHaveLength(1);
    expect(result.current.count).toBe(3);
    expect(result.current.subtotal).toBe(300);
  });

  it("updates quantity and removes the item once it hits zero", () => {
    const { result } = renderHook(() => useCart(), { wrapper });
    act(() => result.current.add(product, 2));
    act(() => result.current.setQty(product.id, 1));
    expect(result.current.count).toBe(1);
    act(() => result.current.setQty(product.id, 0));
    expect(result.current.items).toHaveLength(0);
  });

  it("removes an item directly", () => {
    const { result } = renderHook(() => useCart(), { wrapper });
    act(() => result.current.add(product));
    act(() => result.current.remove(product.id));
    expect(result.current.items).toHaveLength(0);
  });

  it("clears the whole cart", () => {
    const { result } = renderHook(() => useCart(), { wrapper });
    act(() => result.current.add(product, 3));
    act(() => result.current.clear());
    expect(result.current.items).toHaveLength(0);
    expect(result.current.count).toBe(0);
  });

  it("persists cart contents to localStorage", () => {
    const { result } = renderHook(() => useCart(), { wrapper });
    act(() => result.current.add(product));
    const stored = JSON.parse(localStorage.getItem("auratech-cart") ?? "[]");
    expect(stored).toHaveLength(1);
    expect(stored[0].id).toBe(product.id);
  });
});
