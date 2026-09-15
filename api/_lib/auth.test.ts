import { beforeAll, describe, expect, it } from "vitest";
import { hashPassword, signToken, verifyPassword, verifyToken } from "./auth";

beforeAll(() => {
  process.env.JWT_SECRET = "test-secret-do-not-use-in-production";
});

describe("password hashing", () => {
  it("hashes a password and verifies it correctly", async () => {
    const hash = await hashPassword("correct-horse-battery-staple");
    expect(hash).not.toBe("correct-horse-battery-staple");
    expect(await verifyPassword("correct-horse-battery-staple", hash)).toBe(true);
  });

  it("rejects the wrong password", async () => {
    const hash = await hashPassword("correct-horse-battery-staple");
    expect(await verifyPassword("wrong-password", hash)).toBe(false);
  });
});

describe("JWT tokens", () => {
  it("round-trips a signed token", () => {
    const token = signToken({ sub: 42, email: "test@example.com" });
    const payload = verifyToken(token);
    expect(payload?.sub).toBe(42);
    expect(payload?.email).toBe("test@example.com");
  });

  it("rejects a tampered token", () => {
    const token = signToken({ sub: 42, email: "test@example.com" });
    expect(verifyToken(token + "tampered")).toBeNull();
  });

  it("rejects garbage input", () => {
    expect(verifyToken("not-a-real-token")).toBeNull();
  });
});
