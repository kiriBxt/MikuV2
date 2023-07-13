const {
  SlashCommandBuilder,
  PermissionFlagsBits,
  EmbedBuilder,
} = require("discord.js");

module.exports = {
  cooldown: 10,
  data: new SlashCommandBuilder()
    .setName("embed")
    .setDescription("erstellt embed")
    .addStringOption((option) =>
      option.setName("title").setDescription("User input").setRequired(true)
    )
    .addStringOption((option) =>
      option.setName("desc").setDescription("User input").setRequired(true)
    )
    .setDefaultMemberPermissions(PermissionFlagsBits.Administrator),
  async execute(interaction) {
    const embedTitle = interaction.options.getString("title");
    const embedDescription = interaction.options.getString("desc");

    const embed = new EmbedBuilder()
      .setTitle(embedTitle)
      .setDescription(embedDescription);

    await interaction.reply({ embeds: [embed] });
  },
};
