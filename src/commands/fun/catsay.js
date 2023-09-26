const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");

module.exports = {
  cooldown: 10,
  data: new SlashCommandBuilder()
    .setName("catsay")
    .setDescription("Lass eine katze für dich sprechen")
    .addStringOption((option) =>
      option.setName("input").setDescription("User input").setRequired(true)
    ),
  async execute(interaction) {
    const string = interaction.options.getString("input");

    await interaction.reply({
      files: [
        {
          attachment: `https://cataas.com/cat/cute/says/${string}`,
          name: "catsay.png",
        },
      ],
    });
  },
};
