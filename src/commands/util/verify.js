const {
  SlashCommandBuilder,
  ActionRowBuilder,
  ButtonBuilder,
  ButtonStyle,
  EmbedBuilder,
  PermissionFlagsBits,
} = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("verify")
    .setDescription("verification text")
    .setDefaultMemberPermissions(PermissionFlagsBits.Administrator),
  async execute(interaction) {
    const button = new ButtonBuilder()
      .setCustomId("verify")
      .setLabel(`Verify`)
      .setStyle(ButtonStyle.Danger);

    const embed = new EmbedBuilder().setTitle("Regeln!").addFields([
      {
        name: `Sprache`,
        value: `Die Serversprache ist Deutsch. Englisch ist akzeptiert, weil Englisch eh jeder können müsste.`,
        inline: false,
      },
      {
        name: `Toxicity`,
        value: `Toxisches Benehmen in öffentlichen Chats ist untersagt. Dazu gehören auch Beleidigungen, Negativität, hartes Rumtrollen, stark provokantes Verhalten. Das Mod-Team behält sich das Recht vor bei auffälligen Usern direkt eine Bestrafung zu erteilen! Seid einfach lieb zueinander! Wir sind kein Therapie-Server.`,
        inline: false,
      },
      {
        name: `Profile`,
        value: `Usernames oder Avatare dürfen keine beleidigenden, menschenfeindlichen, rassistischen, sexistischen, pornografischen, nationalsozialistischen Inhalte, sowie Inhalte die das Persönlichkeitsrecht einer Person verletzten, enthalten.`,
        inline: false,
      },
      {
        name: `Datenschutz`,
        value: `Private Daten wie Telefonnummern, Adressen, Passwörter, usw. dürfen nicht öffentlich ausgetauscht werden.`,
        inline: false,
      },
      {
        name: `Verhalten`,
        value: `Stimmenverzerrer sind untersagt.
          Das Streamen von Chats oder menschenfeindlichen, rassistischen, sexistischen, pornografischen Dingen ist verboten.
          Behandle jeden mit Respekt. Private Streitigkeiten sind in erster Linie privat zu lösen. Blockiere Menschen, die du nicht magst, um weiteren Konfrontationen zu entgehen.
          Ein gesunder Menschenverstand wird von den Usern erwartet, das bedeutet unter anderem, dass die Regeln durchaus nicht 100% komplett sein müssen.`,
        inline: false,
      },
      {
        name: `Werbung`,
        value: `Jegliche Art aktiver Werbung für eigene Zwecke ist verboten, wenn dies nicht vorher mit dem Server Gründer abgesprochen wurde. Dazu zählt auch Werbung als Privatnachricht an User.`,
        inline: false,
      },
      {
        name: `Catfishing`,
        value: `Sich als Teammitglied und / oder als eine andere oder nichtexistierende Person auszugeben ist untersagt.`,
        inline: false,
      },
      {
        name: `Verify`,
        value: `Mit dem Verify Button hast du die Regeln annerkannt und wirst diese befolgen.\n **PS: Es wird wahrscheinlich mehr gebannt als gekickt**`,
        inline: false,
      },
    ]);

    await interaction.reply({
      components: [new ActionRowBuilder().addComponents(button)],
      embeds: [embed],
    });
  },
};
