import { eq } from "drizzle-orm";
import { getDb } from "../_lib/db";
import { users } from "../_lib/schema";
import { setAuthCookie, signToken, verifyPassword } from "../_lib/auth";
import { badRequest, methodNotAllowed, serverError, unauthorized } from "../_lib/http";
import { loginSchema } from "../_lib/validation";
import type { ApiRequest, ApiResponse } from "../_lib/http";

export default async function handler(req: ApiRequest, res: ApiResponse) {
  if (req.method !== "POST") return methodNotAllowed(res, ["POST"]);

  const parsed = loginSchema.safeParse(req.body);
  if (!parsed.success) {
    return badRequest(res, parsed.error.issues[0]?.message ?? "Invalid input.");
  }
  const { email, password } = parsed.data;

  try {
    const db = getDb();
    const [user] = await db
      .select()
      .from(users)
      .where(eq(users.email, email))
      .limit(1);

    if (!user || !(await verifyPassword(password, user.passwordHash))) {
      return unauthorized(res, "Invalid email or password.");
    }

    const token = signToken({ sub: user.id, email: user.email });
    setAuthCookie(res, token);
    res.status(200).json({ id: user.id, email: user.email, name: user.name });
  } catch (error) {
    serverError(res, error);
  }
}
