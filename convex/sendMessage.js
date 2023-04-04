import { mutation } from "./_generated/server";

export default mutation(async ({ db }, { body, author, curr_max }) => {
  const message = {body, author};
  if (curr_max){
    if (body < 100 + curr_max ) {
      return "Please bid no lower than $100 + current price!";
    }
  }
  await db.insert("messages", message);
  return "ok";
});
