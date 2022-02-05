const { Telegraf, Markup } = require("telegraf");
const CONST = require("./const");
require("dotenv").config();

const bot = new Telegraf(process.env.BOT_TOKEN);
bot.start((ctx) =>
  ctx.reply(
    `Hello ${
      ctx.message.from.first_name ? ctx.message.from.first_name : "doggy"
    }`
  )
);
bot.help((ctx) => ctx.reply(CONST.commands));
bot.command("test", async (ctx) => {
  try {
    await ctx.replyWithHTML(
      "<b>Test</>",
      Markup.inlineKeyboard([
        [
          Markup.button.callback("test1", "test_1"),
          Markup.button.callback("test2", "test_2"),
          Markup.button.callback("test3", "test_3"),
        ],
        [
          Markup.button.callback("test1", "test_1"),
          Markup.button.callback("test2", "test_2"),
          Markup.button.callback("test3", "test_3"),
        ],
      ])
    );
  } catch (e) {
    console.error(e);
  }
});

const addActionBot = (name, src, text) => {
  bot.action(name, async (ctx) => {
    try {
      if (src) {
        await ctx.replyWithPhoto({ source: src });
      }
      await ctx.replyWithHTML(text, {
        disable_web_page_preview: true,
      });
    } catch (e) {
      console.error(e);
    }
  });
};

addActionBot("test_1", "./img/1.jpeg", CONST.firstText);

bot.launch();

// Enable graceful stop
process.once("SIGINT", () => bot.stop("SIGINT"));
process.once("SIGTERM", () => bot.stop("SIGTERM"));
