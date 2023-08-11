const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");
const { getProfile, setBal } = require("../../tools/economy");
const wait = require("node:timers/promises").setTimeout;

function flip(val) {
  if (val == 0) return "Low";
  if (val == 1) return "High";
  return;
}

module.exports = {
  cooldown: 10,
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

    const embed = new EmbedBuilder();

    if (isNaN(value)) {
      embed.setTitle("Du musst auch eine Zahl eingeben!");
      return interaction.reply({
        embeds: [embed],
        ephemeral: true,
      });
    }

    if (userProfile.userBal == 0) {
      embed.setTitle("Du bist pleite ... Geh anschaffen!");
      return interaction.reply({
        embeds: [embed],
        ephemeral: true,
      });
    }

    if (value > userProfile.userBal) {
      embed.setTitle(
        `Du hast nur ${userProfile.userBal} 💰... Geh anschaffen!`
      );
      return interaction.reply({
        embeds: [embed],
        ephemeral: true,
      });
    }

    await interaction.deferReply();
    embed.setTitle("Flip");
    embed.setDescription("Flipping");
    await interaction.editReply({ embeds: [embed] });
    await wait(1000);
    embed.setDescription("Flipping .");
    await interaction.editReply({ embeds: [embed] });
    await wait(1000);
    embed.setDescription("Flipping ..");
    await interaction.editReply({ embeds: [embed] });
    await wait(1000);

    const win = Math.floor(Math.random() * 2);
    if (guess == win) {
      setBal(user, userProfile.userBal + value);

      embed.setDescription(
        `**${user.username}** wettet auf einen **${flip(guess)}** roll!`
      );
      await interaction.editReply({ embeds: [embed] });
      await wait(3000);
      embed.setDescription(`**${flip(win)}** roll gewinnt!`);
      await interaction.editReply({ embeds: [embed] });
      await wait(3000);
      embed.setDescription(
        `Du hast ${value} 💰 **GEWONNEN** und hast jetzt **${
          userProfile.userBal + value
        }** 💰!`
      );
      await interaction.editReply({ embeds: [embed] });
    } else {
      setBal(user, userProfile.userBal - value);

      embed.setDescription(
        `**${user.username}** wettet auf einen **${flip(guess)}** roll!`
      );
      await interaction.editReply({ embeds: [embed] });
      await wait(3000);
      embed.setDescription(`**${flip(win)}** roll gewinnt!`);
      await interaction.editReply({ embeds: [embed] });
      await wait(3000);
      embed.setDescription(
        `Du hast ${value} 💰 **VERLOREN** und hast jetzt **${
          userProfile.userBal - value
        }** 💰!`
      );
      await interaction.editReply({ embeds: [embed] });
    }
  },
};
