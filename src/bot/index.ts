import { Telegraf, Context } from "telegraf";
import dotenv from "dotenv";
import { BOT_TOKEN } from "../server/config";
import { balanceCommand } from "./commands/balance";
import { bridgeCommand } from "./commands/bridge";
import { depositCommand } from "./commands/deposit";
import { connectCommand } from "./commands/connect";

dotenv.config();

if (!BOT_TOKEN) {
    throw new Error("BOT_TOKEN is not defined. Please set it in your environment variables.");
}

const bot = new Telegraf<Context>(BOT_TOKEN);

bot.start((ctx) => {
    ctx.reply(`Hello ${ctx.from?.first_name ?? "user"}! 
Welcome to Nexu.
Use /help to see available commands.`
);
});

bot.help((ctx) => {
    ctx.reply("Available commands:\n/start \n/connect \n/balance \n/bridge \n/deposit");
});

bot.command("connect", connectCommand);
bot.command("balance", balanceCommand);
bot.command("bridge", bridgeCommand);
bot.command("deposit", depositCommand)

bot.launch();
console.log("Nexu the bot is running");

process.once("SIGINT", () => bot.stop("SIGINT"));
process.once("SIGTERM", () => bot.stop("SIGTERM"));
