import { Telegraf, Context } from "telegraf";
import dotenv from "dotenv";
import { BOT_TOKEN } from "./config";

dotenv.config();

if (!BOT_TOKEN) {
    throw new Error("BOT_TOKEN is not defined. Please set it in your environment variables.");
}

const bot = new Telegraf<Context>(BOT_TOKEN);

bot.start((ctx: Context) => {
    ctx.reply(`Hello ${ctx.from?.first_name ?? "user"}! 
Welcome to Nexu.
Use /help to see available commands.`);
});

bot.help((ctx: Context) => {
    ctx.reply("Available commands:\n/start \n/balance \n/bridge");
});

bot.launch();
console.log("Nexu the bot is now running");

process.once("SIGINT", () => bot.stop("SIGINT"));
process.once("SIGTERM", () => bot.stop("SIGTERM"));
