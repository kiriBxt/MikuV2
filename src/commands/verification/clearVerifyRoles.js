const {
  SlashCommandBuilder,
  PermissionFlagsBits,
  EmbedBuilder,
} = require("discord.js");
const { getGuildProfile } = require("../../tools/economy");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("clearverifyroles")
    .setDescription("Löscht alle Verifikationsrollen")
    .setDefaultMemberPermissions(PermissionFlagsBits.Administrator),
  async execute(interaction) {
    const { guild } = interaction;
    let guildProfile = await getGuildProfile(guild);

    if (guildProfile.guildVerifyRoleIds.length == 0) {
      let embed = new EmbedBuilder().setTitle("Nichts zum clearen");

      return interaction.reply({
        embeds: [embed],
        ephemeral: true,
      });
    }
    guildProfile.guildVerifyRoleIds = [];
    guildProfile.guildVerifyRoleNames = [];
    guildProfile.save().catch(console.error);

    let embed = new EmbedBuilder().setTitle("Verify Rollen wurden gelöscht");

    return interaction.reply({
      embeds: [embed],
      ephemeral: true,
    });
  },
};
