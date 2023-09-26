const { ActivityType } = require("discord.js");
const { YoutubeExtractor } = require("@discord-player/extractor");
module.exports = {
  name: "ready",
  once: true,
  async execute(client) {
    console.log(`ready ${client.user.tag} is logged`);
    client.user.setPresence({
      activities: [{ name: `kiri`, type: ActivityType.Listening }],
      status: "dnd",
    });
    await client.player.extractors.register(YoutubeExtractor, {});
  },
};
