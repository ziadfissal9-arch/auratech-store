import { and, asc, desc, eq, or, ilike } from "drizzle-orm";
import { getDb } from "../_lib/db.js";
import { products } from "../_lib/schema.js";
import { methodNotAllowed, serverError } from "../_lib/http.js";
import type { ApiRequest, ApiResponse } from "../_lib/http.js";

function firstParam(v: string | string[] | undefined): string | undefined {
  return Array.isArray(v) ? v[0] : v;
}

export default async function handler(req: ApiRequest, res: ApiResponse) {
  if (req.method !== "GET") return methodNotAllowed(res, ["GET"]);

  const category = firstParam(req.query.category);
  const q = firstParam(req.query.q)?.trim().toLowerCase();
  const sort = firstParam(req.query.sort);

  try {
    const db = getDb();
    const conditions = [];
    if (category) conditions.push(eq(products.category, category));
    if (q) {
      conditions.push(
        or(
          ilike(products.name, `%${q}%`),
          ilike(products.brand, `%${q}%`),
          ilike(products.category, `%${q}%`)
        )
      );
    }

    let orderBy;
    switch (sort) {
      case "price-asc":
        orderBy = asc(products.price);
        break;
      case "price-desc":
        orderBy = desc(products.price);
        break;
      case "rating":
        orderBy = desc(products.rating);
        break;
      default:
        orderBy = asc(products.name);
    }

    const rows = await db
      .select()
      .from(products)
      .where(conditions.length ? and(...conditions) : undefined)
      .orderBy(orderBy);

    res.status(200).json(rows);
  } catch (error) {
    serverError(res, error);
  }
}
