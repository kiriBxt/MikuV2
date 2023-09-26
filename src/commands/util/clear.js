const { SlashCommandBuilder, PermissionFlagsBits } = require("discord.js");

module.exports = {
  cooldown: 10,
  data: new SlashCommandBuilder()
    .setName("clear")
    .setDescription("Löscht Nachrichten in einem Channel")
    .setDefaultMemberPermissions(PermissionFlagsBits.Administrator)
    .addIntegerOption((option) =>
      option
        .setName("amount")
        .setDescription(
          "Löscht eine anzahl an Nachrichten in einem channel. Diese Funktion ist Ratelimited"
        )
        .setMinValue(1)
        .setMaxValue(100)
        .setRequired(true)
    ),
  async execute(interaction) {
    await interaction.deferReply({ content: "deleting...", ephemeral: true });
    const { channel, options } = interaction;
    const number = options.getInteger("amount");
    let msgDeleted = 0;
    let messageId;
    let msgArr = [];

    const messages = await channel.messages.fetch({ limit: number });
    messages.filter(
      (message) => ((messageId = message.id), msgArr.push(message.id))
    );
    msgArr.forEach(async (msg) => {
      try {
        msgDeleted++;
        await channel.messages.delete(msg);
      } catch (e) {
        return await interaction.reply({
          content: `Error: ${e.rawError.message} `,
          ephemeral: true,
        });
      }
    });

    await interaction.editReply({
      content: `${msgDeleted} msgs will get deleted`,
      ephemeral: true,
    });
  },
};
