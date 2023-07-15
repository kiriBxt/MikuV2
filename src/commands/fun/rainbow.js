const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");
const generateRandomHex = require("./funtools/generateRanomdHex");

module.exports = {
  cooldown: 1,
  data: new SlashCommandBuilder()
    .setName("rainbow")
    .setDescription("return my ping")
    // .addStringOption((option) =>
    //   option.setName("num1").setDescription("User input").setRequired(true)
    // )
    // .addStringOption((option) =>
    //   option.setName("num2").setDescription("User input").setRequired(true)
    // )
    .addStringOption((option) =>
      option.setName("num3").setDescription("User input").setRequired(true)
    ),
  async execute(interaction) {
    // const num1 = interaction.options.getString("num1");
    // const num2 = interaction.options.getString("num2");
    const num3 = interaction.options.getString("num3");
    if (isNaN(num3)) {
      return await interaction.reply("Eingabe ungültig!");
    }
    await interaction.deferReply();
    let colors = [];

    for (let i = 0; i < num3; i++) {
      colors.push(generateRandomHex());
    }

    const embed = new EmbedBuilder();
    embed.setTitle("Ping");
    embed.setDescription(String(colors).replaceAll(",", "\n"));
    await interaction.editReply({
      embeds: [embed],
    });
  },
};
