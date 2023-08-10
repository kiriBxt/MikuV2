const { SlashCommandBuilder, PermissionFlagsBits } = require("discord.js");

module.exports = {
  cooldown: 10,
  data: new SlashCommandBuilder()
    .setName("clearenhancelist")
    .setDescription("clearenhancelist")
    .setDefaultMemberPermissions(PermissionFlagsBits.Administrator),
  async execute(interaction, client) {
    let list = [];
    client.enhanceUserList.forEach((userId) => (list += userId + "\n"));
    client.enhanceUserList = [];
    interaction.reply({ content: "cleared", ephemeral: true });
  },
};
