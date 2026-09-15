import { clearAuthCookie } from "../_lib/auth";
import { methodNotAllowed } from "../_lib/http";
import type { ApiRequest, ApiResponse } from "../_lib/http";

export default function handler(req: ApiRequest, res: ApiResponse) {
  if (req.method !== "POST") return methodNotAllowed(res, ["POST"]);
  clearAuthCookie(res);
  res.status(200).json({ ok: true });
}
