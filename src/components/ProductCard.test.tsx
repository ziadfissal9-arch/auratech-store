import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MemoryRouter } from "react-router-dom";
import { describe, expect, it } from "vitest";
import type { ReactNode } from "react";
import ProductCard from "./ProductCard";
import { CartProvider } from "../context/CartContext";
import type { Product } from "../types";

const product: Product = {
  id: "test-product",
  name: "Test Headphones",
  category: "headphones",
  brand: "TESTCO",
  price: 149,
  oldPrice: 199,
  rating: 4.5,
  reviews: 42,
  tag: "Sale",
  image: "https://example.com/image.jpg",
  blurb: "A product used for testing.",
};

function renderCard(ui: ReactNode) {
  return render(
    <MemoryRouter>
      <CartProvider>{ui}</CartProvider>
    </MemoryRouter>
  );
}

describe("ProductCard", () => {
  it("renders the product name, price and tag", () => {
    renderCard(<ProductCard product={product} />);
    expect(screen.getByText("Test Headphones")).toBeInTheDocument();
    expect(screen.getByText("$149.00")).toBeInTheDocument();
    expect(screen.getByText("$199.00")).toBeInTheDocument();
    expect(screen.getByText("Sale")).toBeInTheDocument();
  });

  it("shows a confirmation icon after adding to cart", async () => {
    const user = userEvent.setup();
    renderCard(<ProductCard product={product} />);
    const addButton = screen.getByLabelText(`Add ${product.name} to cart`);
    await user.click(addButton);
    expect(addButton).toHaveClass("added");
  });
});
