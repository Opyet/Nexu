import { Context } from "telegraf";
import axios from "axios";

export const bridgeCommand = async (ctx: Context) => {
  const user_id = ctx.from?.id;
  if (!user_id) {
    await ctx.reply("User not identified.");
    return;
  }
  try {
    await axios.get("http://localhost:3000/api/balance", { params: { user_id } });
  } catch {
    await ctx.reply("You need to create a wallet first using /connect.");
    return;
  }
  await ctx.reply("Starting bridge process...");
  await ctx.reply("Bridge complete! (mock)");
};
