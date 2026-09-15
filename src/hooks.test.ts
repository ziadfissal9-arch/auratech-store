import { describe, expect, it } from "vitest";
import { usd } from "./hooks";

describe("usd", () => {
  it("formats whole numbers as USD currency", () => {
    expect(usd(348)).toBe("$348.00");
  });

  it("formats decimals with two fraction digits", () => {
    expect(usd(19.9)).toBe("$19.90");
  });

  it("formats zero correctly", () => {
    expect(usd(0)).toBe("$0.00");
  });
});
