import { describe, expect, it } from "vitest";
import { loginSchema, orderSchema, registerSchema } from "./validation";

describe("registerSchema", () => {
  it("accepts a valid payload and normalizes the email", () => {
    const result = registerSchema.parse({
      email: "Test@Example.com",
      password: "password123",
      name: "Test User",
    });
    expect(result.email).toBe("test@example.com");
  });

  it("rejects a short password", () => {
    const result = registerSchema.safeParse({
      email: "test@example.com",
      password: "short",
      name: "Test User",
    });
    expect(result.success).toBe(false);
  });

  it("rejects an invalid email", () => {
    const result = registerSchema.safeParse({
      email: "not-an-email",
      password: "password123",
      name: "Test User",
    });
    expect(result.success).toBe(false);
  });

  it("rejects an empty name", () => {
    const result = registerSchema.safeParse({
      email: "test@example.com",
      password: "password123",
      name: "  ",
    });
    expect(result.success).toBe(false);
  });
});

describe("loginSchema", () => {
  it("accepts a valid payload", () => {
    const result = loginSchema.safeParse({
      email: "test@example.com",
      password: "anything",
    });
    expect(result.success).toBe(true);
  });

  it("rejects a missing password", () => {
    const result = loginSchema.safeParse({ email: "test@example.com", password: "" });
    expect(result.success).toBe(false);
  });
});

describe("orderSchema", () => {
  it("accepts a valid cart payload", () => {
    const result = orderSchema.safeParse({
      items: [{ id: "sony-wh1000xm5", qty: 2 }],
    });
    expect(result.success).toBe(true);
  });

  it("rejects an empty cart", () => {
    const result = orderSchema.safeParse({ items: [] });
    expect(result.success).toBe(false);
  });

  it("rejects a non-positive quantity", () => {
    const result = orderSchema.safeParse({
      items: [{ id: "sony-wh1000xm5", qty: 0 }],
    });
    expect(result.success).toBe(false);
  });

  it("rejects an unreasonably large quantity", () => {
    const result = orderSchema.safeParse({
      items: [{ id: "sony-wh1000xm5", qty: 1000 }],
    });
    expect(result.success).toBe(false);
  });
});
