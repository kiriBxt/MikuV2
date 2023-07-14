const {
  SlashCommandBuilder,
  PermissionFlagsBits,
  EmbedBuilder,
} = require("discord.js");

module.exports = {
  cooldown: 10,
  data: new SlashCommandBuilder()
    .setName("deleteroles")
    .setDescription("deleteroles")
    .setDefaultMemberPermissions(PermissionFlagsBits.Administrator),
  async execute(interaction) {
    await interaction.deferReply();
    const { guild } = interaction;
    guild.roles.cache.forEach(async (role) => {
      try {
        if (role) {
          await role.delete();
        }
      } catch (e) {
        return await interaction.editReply({
          content: "deleted 1",
          ephemeral: true,
        });
      }
    });
    await interaction.editReply({ content: "delete 2d", ephemeral: true });
  },
};
