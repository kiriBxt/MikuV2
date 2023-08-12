const {
  EmbedBuilder,
  ActionRowBuilder,
  ButtonBuilder,
  ButtonStyle,
} = require("discord.js");
const { game, getChance, getCost } = require("../../tools/enhance");
const { numToRole, pass } = require("../../commands/fun/tools/enhanceTools");
const { setBal, setTier } = require("../../tools/economy");
const wait = require("node:timers/promises").setTimeout;
module.exports = {
  data: {
    name: `enhance`,
  },
  async execute(interaction) {
    const { message, user } = interaction;

    let embedFooterText = message.embeds[0].footer.text;
    if (user.id.toString() != message.embeds[0].footer.text)
      return interaction.reply({ content: "Nanana", ephemeral: true });

    let embedTitle = message.embeds[0].title;
    let embedDesc = message.embeds[0].description;
    let embedImageUrl = message.embeds[0].image.url;
    let embedFields = message.embeds[0].fields;
    let embedThumbnail = message.embeds[0].thumbnail.url;

    let currBal =
      parseInt(embedFields[3].value) - parseInt(embedFields[2].value);

    if (currBal < 0) {
      await interaction.reply({
        content: "du hast kein Geld mehr!",
        ephemeral: true,
      });
      await wait(5000);
      return interaction.deleteReply();
    }

    try {
      const attempt = await game(user);
      const newTier = numToRole(attempt);
      const newChance = String(getChance(attempt) * 100);
      const newCost = String(getCost(attempt));
      await setBal(user, currBal);
      await setTier(user, attempt);

      embedThumbnail = pass(embedFields[0].value, newTier);

      // embedFields[0].name = "Current Tier: ";
      embedFields[0].value = newTier;
      // embedFields[1].name = "Enhance Chance: ";
      embedFields[1].value = newChance + " %";
      // embedFields[2].name = "Enhance Cost: ";
      embedFields[2].value = newCost + " 💲";
      // embedFields[3].name = "your Balance ";
      embedFields[3].value = currBal + " 💲";

      const embed = new EmbedBuilder()
        .setTitle(embedTitle)
        .setDescription(embedDesc)
        .setThumbnail(embedThumbnail)
        .setImage(embedImageUrl)
        .setFooter({ text: embedFooterText })
        .addFields(
          embedFields[0],
          embedFields[1],
          embedFields[2],
          embedFields[3]
        );

      const row0 = new ActionRowBuilder().addComponents(
        new ButtonBuilder()
          .setStyle(ButtonStyle.Primary)
          .setCustomId("enhance")
          .setLabel("🔨"),
        new ButtonBuilder()
          .setStyle(ButtonStyle.Primary)
          .setCustomId("save")
          .setLabel("📄")
      );

      await message.edit({ embeds: [embed], components: [row0] });

      await interaction.reply({
        content: "you enhanced!",
        ephemeral: true,
      });
      await interaction.deleteReply();
    } catch (e) {
      console.error;
    }
  },
};
