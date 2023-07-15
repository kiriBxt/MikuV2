const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");
const _8ball = require("./funtools/_8ball");

module.exports = {
  cooldown: 10,
  data: new SlashCommandBuilder()
    .setName("8ball")
    .setDescription("Sagt die Zukunft an")
    .addStringOption((option) =>
      option.setName("input").setDescription("User input").setRequired(true)
    ),
  async execute(interaction) {
    const { options, user } = interaction;
    const string = options.getString("input");

    const embed = new EmbedBuilder().setColor(0x18e1ee).addFields([
      {
        name: `**${user.username} fragt:**`,
        value: `${string}`,
        inline: true,
      },
      {
        name: `**MikuV2:**`,
        value: `${_8ball()}`,
        inline: false,
      },
    ]);

    await interaction.reply({
      embeds: [embed],
    });
  },
};
