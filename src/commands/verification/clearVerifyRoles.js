const { SlashCommandBuilder, PermissionFlagsBits } = require("discord.js");
const Guild = require("../../models/guild");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("clearverifyroles")
    .setDescription("Löscht alle Verifikationsrollen")
    .setDefaultMemberPermissions(PermissionFlagsBits.Administrator),
  async execute(interaction) {
    const [guild] = await Guild.findOrCreate({
      where: { id: interaction.guild.id },
    });
    await guild.update({
      verifyRoleId: "",
      verifyRoleName: "",
      name: interaction.guild.name,
    });
    await interaction.reply({ content: "success", ephemeral: true });
  },
};
