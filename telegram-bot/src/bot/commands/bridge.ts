import { Context } from "telegraf";
import axios from "axios";

export const bridgeCommand = async (ctx: Context) => {
  const user_id = ctx.from?.id;
  if (!user_id) {
    await ctx.reply("User not identified.");
    return;
  }
  // Checks if the wallet exists
  try {
    await axios.get("http://localhost:4000/api/wallet/balance", { params: { user_id } });
  } catch {
    await ctx.reply("You need to create a wallet first using /connect.");
    return;
  }
  await ctx.reply("Starting bridge process...");
  await ctx.reply("Bridge complete! (mock)");
};
