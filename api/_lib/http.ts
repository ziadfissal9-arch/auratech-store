import type { IncomingMessage, ServerResponse } from "node:http";

// Minimal shape of the request/response objects Vercel's Node.js runtime
// passes to a function handler. Declared locally (instead of depending on
// @vercel/node) to avoid pulling in its vulnerable transitive dependencies —
// this app only ever needs these few fields.
export interface ApiRequest extends IncomingMessage {
  query: Record<string, string | string[] | undefined>;
  cookies: Record<string, string | undefined>;
  body: unknown;
}

export interface ApiResponse extends ServerResponse {
  status(code: number): ApiResponse;
  json(body: unknown): void;
  send(body: string): void;
}

export function methodNotAllowed(res: ApiResponse, allowed: string[]) {
  res.setHeader("Allow", allowed.join(", "));
  res.status(405).json({ error: `Method not allowed. Use ${allowed.join(", ")}.` });
}

export function badRequest(res: ApiResponse, message: string) {
  res.status(400).json({ error: message });
}

export function unauthorized(res: ApiResponse, message = "Unauthorized") {
  res.status(401).json({ error: message });
}

export function notFound(res: ApiResponse, message = "Not found") {
  res.status(404).json({ error: message });
}

export function serverError(res: ApiResponse, error: unknown) {
  console.error(error);
  res.status(500).json({ error: "Internal server error" });
}
