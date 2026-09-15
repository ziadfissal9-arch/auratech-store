import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import type { ApiRequest, ApiResponse } from "./http.js";
import { unauthorized } from "./http.js";

const COOKIE_NAME = "auratech_token";
const TOKEN_TTL_SECONDS = 60 * 60 * 24 * 7; // 7 days

export interface AuthTokenPayload {
  sub: number;
  email: string;
}

function getJwtSecret(): string {
  const secret = process.env.JWT_SECRET;
  if (!secret) {
    throw new Error("JWT_SECRET is not set.");
  }
  return secret;
}

export async function hashPassword(password: string): Promise<string> {
  return bcrypt.hash(password, 10);
}

export async function verifyPassword(
  password: string,
  hash: string
): Promise<boolean> {
  return bcrypt.compare(password, hash);
}

export function signToken(payload: AuthTokenPayload): string {
  return jwt.sign(payload, getJwtSecret(), { expiresIn: TOKEN_TTL_SECONDS });
}

export function verifyToken(token: string): AuthTokenPayload | null {
  try {
    return jwt.verify(token, getJwtSecret()) as unknown as AuthTokenPayload;
  } catch {
    return null;
  }
}

export function setAuthCookie(res: ApiResponse, token: string) {
  const isProd = process.env.NODE_ENV === "production";
  const parts = [
    `${COOKIE_NAME}=${token}`,
    "HttpOnly",
    "Path=/",
    `Max-Age=${TOKEN_TTL_SECONDS}`,
    "SameSite=Lax",
  ];
  if (isProd) parts.push("Secure");
  res.setHeader("Set-Cookie", parts.join("; "));
}

export function clearAuthCookie(res: ApiResponse) {
  res.setHeader(
    "Set-Cookie",
    `${COOKIE_NAME}=; HttpOnly; Path=/; Max-Age=0; SameSite=Lax`
  );
}

export function getAuthUser(req: ApiRequest): AuthTokenPayload | null {
  const token = req.cookies?.[COOKIE_NAME];
  if (!token) return null;
  return verifyToken(token);
}

export function requireAuth(
  req: ApiRequest,
  res: ApiResponse
): AuthTokenPayload | null {
  const user = getAuthUser(req);
  if (!user) {
    unauthorized(res, "Sign in required.");
    return null;
  }
  return user;
}
