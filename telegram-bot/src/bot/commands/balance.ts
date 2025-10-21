import { Context } from "telegraf";
import axios from "axios";

export const balanceCommand = async (ctx: Context) => {
    const user_id = ctx.from?.id;
    if (!user_id) {
        await ctx.reply("User not identified.");
        return;
    }
    await ctx.reply("Checking your wallet balance...");
    try {
        const res = await axios.get("http://localhost:3000/api/balance", { params: { user_id } });
        await ctx.reply(`Your wallet balance: ${res.data.balance}`);
    } catch (err: any) {
        await ctx.reply("Error checking balance: " + (err.response?.data?.error || err.message));
    }
};
