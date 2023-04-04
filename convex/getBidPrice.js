// define the UDF here
import { query } from "./_generated/server";

export default query(async ({ db }) => {
  return await db.query("messages")
  .withIndex("by_price")
  .order("desc")
  .take(1);
});
