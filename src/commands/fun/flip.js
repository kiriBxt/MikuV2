const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");
const { getProfile, setBal } = require("../../tools/economy");

module.exports = {
  cooldown: 5,
  data: new SlashCommandBuilder()
    .setName("flip")
    .setDescription("Vergamble dein ganzes Geld!")
    .addStringOption((option) =>
      option
        .setName("highxlow")
        .setDescription("Wähle High oder Low")
        .setRequired(true)
        .addChoices({ name: "High", value: "1" }, { name: "Low", value: "0" })
    )
    .addStringOption((option) =>
      option.setName("einsatz").setDescription("Geld").setRequired(true)
    ),
  async execute(interaction) {
    const { options, user } = interaction;
    const value = parseInt(options.getString("einsatz"));
    const guess = options.getString("highxlow");

    const userProfile = await getProfile(user);

    if (isNaN(value)) {
      return interaction.reply({
        content: `Du musst auch eine Zahl eingeben!`,
        ephemeral: true,
      });
    }

    if (userProfile.userBal == 0) {
      return interaction.reply({
        content: "Du bist pleite ... Geh anschaffen!",
        ephemeral: true,
      });
    }

    if (value > userProfile.userBal) {
      return interaction.reply({
        content: `Du hast nur ${userProfile.userBal} 💰... Geh anschaffen!`,
        ephemeral: true,
      });
    }

    const win = Math.floor(Math.random() * 2);
    if (guess == win) {
      setBal(user, userProfile.userBal + value);
      return interaction.reply({
        content: `Du hast ${value} 💰 gewonnen und hast jetzt ${
          userProfile.userBal + value
        } 💰!`,
      });
    } else {
      setBal(user, userProfile.userBal - value);
      return interaction.reply({
        content: `Du hast ${value} 💰 verloren und hast jetzt ${
          userProfile.userBal - value
        } 💰!`,
      });
    }
  },
};
