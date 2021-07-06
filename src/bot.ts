import { Context, Telegraf } from "telegraf";
import { getFilters, Item } from "ytsr";
import { toTitleCase } from "./helpers";
import { SearchResult } from "./interface";
import { youtubeSearch } from "./ytsr";
require("dotenv").config();

if (!process.env.BOT_TOKEN) {
  throw new Error("BOT_TOKEN must be in your .env");
}

const bot = new Telegraf(process.env.BOT_TOKEN!);

bot.on("text", async (ctx: Context) => {
  const text: string = ctx.message?.text
    ? ctx.message?.text
    : ctx.update.message?.text || "";

  console.log("user msg:", text);

  let details = text.split(",");
  details = details.map((item: string) => {
    return item.trim();
  });
  details = details.filter(Boolean);

  console.log(details);
  let searchString = details[0];
  let type = toTitleCase(details[1]);
  let feature = details[2];
  let duration = details[3];
  let sortBy = details[4];

  let searchResults = await youtubeSearch(
    searchString,
    type,
    feature,
    duration
  );
  console.log("Our videos ", searchResults);

  searchResults?.items.forEach((item: Item, index: number) => {
    console.log("res:", item);
    let message = "";
    if (item.type == "playlist") {
      message = `Title: ${item.title}`;
      message += `\nUrl: ${item.url}`;
      message += `\nLength: ${item.length}`;
    } else if (item.type == "video") {
      message = `Title: ${item.title}`;
      message += `\nUrl: ${item.url}`;
      message += `\nDuration: ${item.duration}`;
      message += `\nIs Live: ${item.isLive}`;
      message += `\nThumbnails: ${item.thumbnails}`;
    }

    return ctx.reply(message);
  });
});

export { bot };
