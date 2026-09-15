// Seeds the products table from the same catalog the frontend used to
// import statically. Run with `npm run db:seed` after `npm run db:push`.
import { getDb } from "../api/_lib/db";
import { products as productsTable } from "../api/_lib/schema";
import { products } from "../src/data";

async function main() {
  const db = getDb();
  console.log(`Seeding ${products.length} products...`);

  for (const p of products) {
    await db
      .insert(productsTable)
      .values(p)
      .onConflictDoUpdate({ target: productsTable.id, set: p });
  }

  console.log("Done.");
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
