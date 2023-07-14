const {
  SlashCommandBuilder,
  PermissionFlagsBits,
  EmbedBuilder,
} = require("discord.js");
const Guild = require("../../models/guild");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("showverifyroles")
    .setDescription("Füge Verifikationsrollen hinzu")
    .setDefaultMemberPermissions(PermissionFlagsBits.Administrator),
  async execute(interaction) {
    let roleList = "";

    const guildDb = await Guild.findOne({
      where: { id: interaction.guild.id },
    });
    if (!guildDb.verifyRoleName) {
      return await interaction.reply({
        content: "Benutze /setverifyroles um rollen hinzu zu fügen",
      });
    }

    guildDb.verifyRoleName.split(",").forEach((role) => {
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
