import { eq } from "drizzle-orm";
import { getDb } from "../_lib/db.js";
import { users } from "../_lib/schema.js";
import { hashPassword, setAuthCookie, signToken } from "../_lib/auth.js";
import { badRequest, methodNotAllowed, serverError } from "../_lib/http.js";
import { registerSchema } from "../_lib/validation.js";
import type { ApiRequest, ApiResponse } from "../_lib/http.js";

export default async function handler(req: ApiRequest, res: ApiResponse) {
  if (req.method !== "POST") return methodNotAllowed(res, ["POST"]);

  const parsed = registerSchema.safeParse(req.body);
  if (!parsed.success) {
    return badRequest(res, parsed.error.issues[0]?.message ?? "Invalid input.");
  }
  const { email, password, name } = parsed.data;

  try {
    const db = getDb();
    const [existing] = await db
      .select({ id: users.id })
      .from(users)
      .where(eq(users.email, email))
      .limit(1);
    if (existing) return badRequest(res, "An account with this email already exists.");

    const passwordHash = await hashPassword(password);
    const [user] = await db
      .insert(users)
      .values({ email, passwordHash, name })
      .returning({ id: users.id, email: users.email, name: users.name });

    const token = signToken({ sub: user.id, email: user.email });
    setAuthCookie(res, token);
    res.status(201).json(user);
  } catch (error) {
    serverError(res, error);
  }
}
