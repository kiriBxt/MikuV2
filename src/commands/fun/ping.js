const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");

module.exports = {
  cooldown: 10,
  data: new SlashCommandBuilder()
    .setName("ping")
    .setDescription("return my ping"),
  async execute(interaction, client) {
    const embed = new EmbedBuilder();
    const message = await interaction.deferReply({
      fetchReply: true,
    });
    embed.setTitle("Ping");
    embed.setDescription(
      `API Latency: ${client.ws.ping}ms\nClient Ping ${
        message.createdTimestamp - interaction.createdTimestamp
      }ms`
    );
    await interaction.editReply({
      embeds: [embed],
    });
  },
};
