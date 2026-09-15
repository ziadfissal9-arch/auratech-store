import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import Stars from "./Stars";

describe("Stars", () => {
  it("exposes the rating via an accessible label", () => {
    render(<Stars rating={4.5} />);
    expect(screen.getByLabelText("4.5 out of 5 stars")).toBeInTheDocument();
  });

  it("defaults to a 0 rating when none is given", () => {
    render(<Stars />);
    expect(screen.getByLabelText("0 out of 5 stars")).toBeInTheDocument();
  });
});
