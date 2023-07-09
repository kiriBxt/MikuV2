const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");

module.exports = {
  cooldown: 10,
  data: new SlashCommandBuilder()
    .setName("8ball")
    .setDescription("Sagt die Zukunft an")
    .addStringOption((option) =>
      option.setName("input").setDescription("User input").setRequired(true)
    ),
  async execute(interaction) {
    const string = interaction.options.getString("input");
    var fortunes = [
      "Ja!",
      "Sicherlich.",
      "Scheint so zu sein.",
      "Ohne Zweifel.",
      "Bestimmt.",
      "Du kannst darauf vertrauen.",
      "Ich denke schon.",
      "Sehr Wahrscheinlich.",
      "sieht gut aus.",
      "Die Zeichen sehen gut aus.",
      "Zu faul zum Antworten.",
      "Versuchs später nochmal.",
      "Besser du weisst es noch nicht...",
      "Kann jetzt nichts sagen.",
      "Konzentriere dich und frag nochmal.",
      "Verlass dich nicht drauf.",
      "Meine Anwtort ist nein.",
      "Meine Quellen sagen nein.",
      "Sieht nicht gut aus...",
      "Sehr zweifelhaft.",
    ];
    const embed = new EmbedBuilder().setColor(0x18e1ee).addFields([
      {
        name: `**${interaction.user.username} fragt:**`,
        value: `${string}`,
        inline: true,
      },
      {
        name: `**MikuV2:**`,
        value: `${fortunes[Math.floor(Math.random() * fortunes.length)]}`,
        inline: false,
      },
    ]);

    await interaction.reply({
      embeds: [embed],
    });
  },
};
