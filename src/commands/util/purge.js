const { SlashCommandBuilder, PermissionFlagsBits } = require("discord.js");

module.exports = {
  cooldown: 10,
  data: new SlashCommandBuilder()
    .setName("purge")
    .setDescription("Löscht Nachrichten in einem Channel")
    .setDefaultMemberPermissions(PermissionFlagsBits.Administrator)
    .addIntegerOption((option) =>
      option
        .setName("amount")
        .setDescription("Löscht eine anzahl an Nachrichten in einem channel")
        .setMinValue(1)
        .setMaxValue(100)
        .setRequired(true)
    ),
  async execute(interaction) {
    let number = interaction.options.getInteger("amount");
    try {
      await interaction.channel.bulkDelete(number);
    } catch (e) {
      return interaction.reply({ content: `Error: ${e.rawError.message}` });
    }
    await interaction.reply({
      content: `Es werden ${number} Nachrichten in diesem Channel gelöscht!`,
      ephemeral: true,
    });
  },
};
