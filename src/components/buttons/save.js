const {
  EmbedBuilder,
  ActionRowBuilder,
  ButtonBuilder,
  ButtonStyle,
} = require("discord.js");
const wait = require("node:timers/promises").setTimeout;
module.exports = {
  data: {
    name: `save`,
  },
  async execute(interaction, client) {
    const { message, member } = interaction;
    await message.delete();

    if (client.enhanceUserList.find((user) => user == interaction.user.id)) {
      client.enhanceUserList.shift();
    }
    let embedFields = message.embeds[0].fields;

    let role = interaction.guild.roles.cache.find(
      (role) => role.name === embedFields[0].value
    );
    await member.roles.add(role);

    await interaction.reply({
      content: "Game closed and role saved!",
      ephemeral: true,
    });
    await wait(5000);
    await interaction.deleteReply();
  },
};
