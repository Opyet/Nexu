import { Context } from "telegraf";
import axios from "axios";

export const connectCommand = async (ctx: Context) => {
  const user_id = ctx.from?.id;
  if (!user_id) {
    await ctx.reply("Usuário não identificado.");
    return;
  }
  try {
    const res = await axios.post("http://localhost:4000/api/wallet/create-wallet", { user_id });
    await ctx.reply(`Carteira criada! Endereço: ${res.data.address}`);
  } catch (err: any) {
    await ctx.reply("Erro ao criar carteira: " + (err.response?.data?.error || err.message));
  }
};
