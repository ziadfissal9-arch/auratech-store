import { eq } from "drizzle-orm";
import { getDb } from "../_lib/db.js";
import { users } from "../_lib/schema.js";
import { getAuthUser } from "../_lib/auth.js";
import { methodNotAllowed, serverError, unauthorized } from "../_lib/http.js";
import type { ApiRequest, ApiResponse } from "../_lib/http.js";

export default async function handler(req: ApiRequest, res: ApiResponse) {
  if (req.method !== "GET") return methodNotAllowed(res, ["GET"]);

  const auth = getAuthUser(req);
  if (!auth) return unauthorized(res, "Not signed in.");

  try {
    const db = getDb();
    const [user] = await db
      .select({ id: users.id, email: users.email, name: users.name })
      .from(users)
      .where(eq(users.id, auth.sub))
      .limit(1);

    if (!user) return unauthorized(res, "Not signed in.");
    res.status(200).json(user);
  } catch (error) {
    serverError(res, error);
  }
}
