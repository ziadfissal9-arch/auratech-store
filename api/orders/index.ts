import { desc, eq, inArray } from "drizzle-orm";
import { getDb } from "../_lib/db";
import { orderItems, orders, products } from "../_lib/schema";
import { requireAuth } from "../_lib/auth";
import { badRequest, methodNotAllowed, serverError } from "../_lib/http";
import { orderSchema } from "../_lib/validation";
import type { ApiRequest, ApiResponse } from "../_lib/http";

const TAX_RATE = 0.08;
const SHIPPING = 0;

export default async function handler(req: ApiRequest, res: ApiResponse) {
  const user = requireAuth(req, res);
  if (!user) return;

  const db = getDb();

  if (req.method === "GET") {
    try {
      const rows = await db
        .select()
        .from(orders)
        .where(eq(orders.userId, user.sub))
        .orderBy(desc(orders.createdAt));

      const items = rows.length
        ? await db
            .select()
            .from(orderItems)
            .where(
              inArray(
                orderItems.orderId,
                rows.map((o) => o.id)
              )
            )
        : [];

      const result = rows.map((order) => ({
        ...order,
        items: items.filter((i) => i.orderId === order.id),
      }));

      return res.status(200).json(result);
    } catch (error) {
      return serverError(res, error);
    }
  }

  if (req.method === "POST") {
    const parsed = orderSchema.safeParse(req.body);
    if (!parsed.success) {
      return badRequest(res, parsed.error.issues[0]?.message ?? "Invalid input.");
    }

    try {
      const requested = parsed.data.items;
      const rows = await db
        .select()
        .from(products)
        .where(
          inArray(
            products.id,
            requested.map((i) => i.id)
          )
        );

      const byId = new Map(rows.map((p) => [p.id, p]));
      const missing = requested.find((i) => !byId.has(i.id));
      if (missing) return badRequest(res, `Unknown product: ${missing.id}`);

      const subtotal = requested.reduce((sum, i) => {
        const product = byId.get(i.id)!;
        return sum + product.price * i.qty;
      }, 0);
      const tax = subtotal * TAX_RATE;
      const total = subtotal + SHIPPING + tax;

      const [order] = await db
        .insert(orders)
        .values({ userId: user.sub, subtotal, tax, shipping: SHIPPING, total })
        .returning();

      const insertedItems = await db
        .insert(orderItems)
        .values(
          requested.map((i) => {
            const product = byId.get(i.id)!;
            return {
              orderId: order.id,
              productId: product.id,
              name: product.name,
              price: product.price,
              qty: i.qty,
            };
          })
        )
        .returning();

      res.status(201).json({ ...order, items: insertedItems });
    } catch (error) {
      serverError(res, error);
    }
    return;
  }

  methodNotAllowed(res, ["GET", "POST"]);
}
