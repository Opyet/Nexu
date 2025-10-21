import { Context } from "telegraf";
import axios from "axios";

export const depositCommand = async (ctx: Context) => {
  const user_id = ctx.from?.id;
  if (!user_id) {
    await ctx.reply("User not identified.");
    return;
  }
  const messageText = ctx.message && "text" in ctx.message ? ctx.message.text : undefined;
  const parts = messageText ? messageText.split(" ") : [];
  const amount = parts[1];
  if (!amount || isNaN(Number(amount))) {
    await ctx.reply("Usage: /deposit <amount>. Example: /deposit 100");
    return;
  }
  try {
    const res = await axios.post("http://localhost:3000/api/deposit", { user_id, amount });
    await ctx.reply(`Deposit of ${amount} completed! Hash: ${res.data.txHash}`);
  } catch (err: any) {
    await ctx.reply("Error while depositing: " + (err.response?.data?.error || err.message));
  }
};
