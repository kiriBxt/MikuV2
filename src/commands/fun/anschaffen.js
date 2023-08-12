const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");
const {
  randomIntFromInterval,
  addBalAmount,
  currencyconverter,
} = require("../../tools/economy");

module.exports = {
  cooldown: 600,
  data: new SlashCommandBuilder()
    .setName("anschaffen")
    .setDescription("Du gehst aufn Strich"),
  async execute(interaction) {
    const { user, guild } = interaction;

    let randomUser = guild.members.cache.random().user.username;
    while (user.username == randomUser) {
      randomUser = guild.members.cache.random().user.username;
    }

    const cash = randomIntFromInterval(10, 20000);

    const embed = new EmbedBuilder().setDescription(
      `**${
        user.username
      }** geht bei **${randomUser}** anschaffen und bekommt\n**${currencyconverter(
        cash
      )}** für seine Leistung.`
    );

    await addBalAmount(user, cash);

    interaction.reply({ embeds: [embed] });
  },
};
