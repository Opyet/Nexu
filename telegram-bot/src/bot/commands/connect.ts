import { Context } from "telegraf";
import axios from "axios";

export const connectCommand = async (ctx: Context) => {
  const user_id = ctx.from?.id;
  if (!user_id) {
    await ctx.reply("Usuário não identificado.");
    return;
  }
  try {
    const res = await axios.post("http://localhost:3000/api/create-wallet", { user_id });
    await ctx.reply(`Wallet created! Address: ${res.data.address}`);
  } catch (err: any) {
    await ctx.reply("user id: " + (user_id));
    await ctx.reply("Error creating wallet: " + (err?.response?.data?.err || err.message));
  }
};
