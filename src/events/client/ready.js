const { ActivityType } = require("discord.js");
module.exports = {
  name: "ready",
  once: true,
  async execute(client) {
    console.log(`ready ${client.user.tag} is logged`);
    client.user.setPresence({
      activities: [{ name: `24/7`, type: ActivityType.Playing }],
      status: "dnd",
    });
  },
};
