const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");
const {
  getProfile,
  setBal,
  currencyconverter,
} = require("../../tools/economy");
const wait = require("node:timers/promises").setTimeout;

function tickToString(tick) {
  if (tick == 2) return "Grün";
  if (tick == 1) return "Rot";
  if (tick == 0) return "Schwarz";
  return;
}

function image(tick) {
  if (tick == 2)
    return "https://cdn.discordapp.com/attachments/1138984772576747581/1139705897514442782/green.png";
  if (tick == 1)
    return "https://cdn.discordapp.com/attachments/1138984772576747581/1139705888131776663/red.png";
  if (tick == 0)
    return "https://cdn.discordapp.com/attachments/1138984772576747581/1139705903931719781/black.png";
  return;
}

function winMultiplikator(field) {
  switch (field) {
    case 2:
      return 10;
    case 1:
      return 2;
    case 0:
      return 0.25;
    default:
      return "error";
  }
}

function field() {
  const win = Math.floor(Math.random() * 11);
  if (win == 10) {
    return 2;
  }
  if (win >= 6 && win < 10) {
    return 1;
  }
  if (win >= 0 && win < 6) {
    return 0;
  }
  return null;
}

module.exports = {
  cooldown: 10,
  data: new SlashCommandBuilder()
    .setName("roulette")
    .setDescription("Vergamble dein ganzes Geld!")
    .addStringOption((option) =>
      option
        .setName("setz")
        .setDescription("Setze auf Rot oder Schwarz")
        .setRequired(true)
        .addChoices(
          { name: "Grün", value: "2" },
          { name: "Rot", value: "1" },
          { name: "Schwarz", value: "0" }
        )
    )
    .addStringOption((option) =>
      option.setName("einsatz").setDescription("Geld").setRequired(true)
    ),
  async execute(interaction) {
    const { options, user } = interaction;
    const bet = parseInt(options.getString("einsatz"));
    const guess = options.getString("setz");

    const userProfile = await getProfile(user);

    const embed = new EmbedBuilder();

    if (isNaN(bet)) {
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

    if (bet > userProfile.userBal) {
      embed.setTitle(
        `Du hast nur ${currencyconverter(
          userProfile.userBal
        )}... Geh anschaffen!`
      );
      return interaction.reply({
        embeds: [embed],
        ephemeral: true,
      });
    }
    const win = field();

    await interaction.deferReply();

    embed.setImage(
      "https://cdn.discordapp.com/attachments/1138984772576747581/1139708366038511738/backhroundf.png"
    );
    embed.setDescription("__**Ball rollt**__");
    await interaction.editReply({ embeds: [embed] });
    await wait(500);
    embed.setDescription("__**Ball rollt .**__");
    await interaction.editReply({ embeds: [embed] });
    await wait(500);
    embed.setDescription("__**Ball rollt ..**__");
    await interaction.editReply({ embeds: [embed] });
    await wait(500);
    embed.setDescription("__**Ball rollt ...**__");
    await interaction.editReply({ embeds: [embed] });
    await wait(500);
    embed.addFields([
      {
        name: `${user.username}`,
        value: `Einsatz: *${currencyconverter(bet)}*\nFeld: **${tickToString(
          guess
        )}**`,
        inline: true,
      },
    ]);
    await interaction.editReply({ embeds: [embed] });
    await wait(500);

    if (win == guess) {
      let multiplikator = winMultiplikator(win);
      let winnings = bet * multiplikator;
      let newBal = userProfile.userBal + winnings;
      embed.addFields([
        {
          name: `Tisch`,
          value: `Multi: *${multiplikator}x*\nFeld: **${tickToString(win)}**`,
          inline: true,
        },
      ]);
      embed.setImage(image(win));
      await interaction.editReply({ embeds: [embed] });
      embed.setDescription("__** Spieler Gewinnt **__");
      embed.addFields([
        {
          name: `Spiel:`,
          value: `Gewinn: *${currencyconverter(
            winnings
          )}*\nBank: **${currencyconverter(newBal)}**`,
          inline: true,
        },
      ]);
      await wait(500);
      await interaction.editReply({ embeds: [embed] });

      await wait(500);
      setBal(user, newBal);
      await interaction.editReply({ embeds: [embed] });
    } else {
      let lose = bet;
      let newBal = userProfile.userBal - lose;
      embed.addFields([
        {
          name: `Tisch`,
          value: `Multi: *${winMultiplikator(win)}x*\nFeld: **${tickToString(
            win
          )}**`,
          inline: true,
        },
      ]);
      embed.setImage(image(win));
      await interaction.editReply({ embeds: [embed] });
      embed.setDescription("__** Spieler Verliert **__");
      embed.addFields([
        {
          name: `Spiel:`,
          value: `Verlust: *${currencyconverter(
            lose
          )}*\nBank: **${currencyconverter(newBal)}**`,
          inline: true,
        },
      ]);

      await wait(500);
      await interaction.editReply({ embeds: [embed] });

      setBal(user, newBal);
    }
  },
};
