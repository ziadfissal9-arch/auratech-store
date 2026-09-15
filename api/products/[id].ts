import { eq } from "drizzle-orm";
import { getDb } from "../_lib/db.js";
import { products } from "../_lib/schema.js";
import { badRequest, methodNotAllowed, notFound, serverError } from "../_lib/http.js";
import type { ApiRequest, ApiResponse } from "../_lib/http.js";

export default async function handler(req: ApiRequest, res: ApiResponse) {
  if (req.method !== "GET") return methodNotAllowed(res, ["GET"]);

  const id = req.query.id;
  if (typeof id !== "string") return badRequest(res, "Invalid product id.");

  try {
    const db = getDb();
    const [product] = await db
      .select()
      .from(products)
      .where(eq(products.id, id))
      .limit(1);

    if (!product) return notFound(res, "Product not found.");
    res.status(200).json(product);
  } catch (error) {
    serverError(res, error);
  }
}
