const {
  EmbedBuilder,
  ActionRowBuilder,
  ButtonBuilder,
  ButtonStyle,
} = require("discord.js");
const enhanceOpenInstance = require("../../commands/fun/funtools/enhanceOpenInstance");
const guildGetRoleName = require("../../guildhelper/guildGetRoleName");
const wait = require("node:timers/promises").setTimeout;
module.exports = {
  data: {
    name: `save`,
  },
  async execute(interaction, client) {
    const { message, member, guild } = interaction;
    if (interaction.user.id != message.embeds[0].footer.text)
      return interaction.reply({ content: "Nanana", ephemeral: true });
    const { enhanceUserList } = client;
    await message.delete();

    if (enhanceOpenInstance(enhanceUserList, member.id)) {
      enhanceUserList.forEach((user) => {
        if (user == member.id) {
          return enhanceUserList.shift();
        }
      });
    }

    let embedFields = message.embeds[0].fields;

    let role = guildGetRoleName(guild, embedFields[0].value);
    await member.roles.add(role);

    await interaction.reply({
      content: "Game closed and role saved!",
      ephemeral: true,
    });
    await wait(5000);
    await interaction.deleteReply();
  },
};
