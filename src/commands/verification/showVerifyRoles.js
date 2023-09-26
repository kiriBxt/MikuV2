const {
  SlashCommandBuilder,
  PermissionFlagsBits,
  EmbedBuilder,
} = require("discord.js");
const { getGuildProfile } = require("../../tools/economy");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("showverifyroles")
    .setDescription("Füge Verifikationsrollen hinzu")
    .setDefaultMemberPermissions(PermissionFlagsBits.Administrator),
  async execute(interaction) {
    const { guild } = interaction;
    let roleList = "";

    let guildProfile = await getGuildProfile(guild);

    if (guildProfile.guildVerifyRoleIds.length == 0) {
      let embed = new EmbedBuilder().setTitle(
        "Benutze /setverifyroles um Rollen auszuwählen."
      );

      return interaction.reply({
        embeds: [embed],
        ephemeral: true,
      });
    }

    guildProfile.guildVerifyRoleNames.forEach((role) => {
      roleList += role + "\n";
    });

    let embed = new EmbedBuilder()
      .setTitle("Verifyroles")
      .setDescription(roleList);

    return interaction.reply({
      embeds: [embed],
      ephemeral: true,
    });
  },
};
