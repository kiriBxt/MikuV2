require("dotenv").config();
const { TOKEN, MONGOTOKEN } = process.env;
const { connect } = require("mongoose");
const { Client, Collection } = require("discord.js");
const fs = require("fs");

const client = new Client({
  intents: 3276799,
});
client.commands = new Collection();
client.buttons = new Collection();
client.selectMenus = new Collection();
client.cooldowns = new Collection();
client.modals = new Collection();
client.commandArray = [];
client.enhanceUserList = [];

const { Player } = require("discord-player");
client.player = new Player(client, {
  ytdlOptions: {
    filter: "audioonly",
    quality: "highestaudio",
    highWaterMark: 1 << 27,
  },
});

const functionFolders = fs.readdirSync("./src/functions");
for (const folder of functionFolders) {
  const functionsFiles = fs
    .readdirSync(`./src/functions/${folder}`)
    .filter((file) => file.endsWith(".js"));
  for (const file of functionsFiles)
    require(`./functions/${folder}/${file}`)(client);
}

client.handleEvents();
client.handleCommands();
client.handleComponents();
client.login(TOKEN);

(async () => {
  await connect(MONGOTOKEN).catch(console.error);
})();
