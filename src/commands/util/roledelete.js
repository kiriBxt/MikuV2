const {
  SlashCommandBuilder,
  PermissionFlagsBits,
  EmbedBuilder,
} = require("discord.js");

module.exports = {
  cooldown: 10,
  data: new SlashCommandBuilder()
    .setName("deleteenhanceroles")
    .setDescription("deletes all enhance roles")
    .setDefaultMemberPermissions(PermissionFlagsBits.Administrator),
  async execute(interaction) {
    await interaction.deferReply({ ephemeral: true });

    const tierList = [
      "Tier 1",
      "Tier 2",
      "Tier 3",
      "Tier 4",
      "Tier 5",
      "Tier 6",
      "Tier 7",
      "Tier 8",
      "Tier 9",
      "Tier 10",
    ];

    const { guild } = interaction;
    guild.roles.cache.forEach(async (role) => {
      if (tierList.find((del) => role.name == del)) {
        await role.delete();
      }
    });
    await interaction.editReply({ content: "delete 2d", ephemeral: true });
  },
};
