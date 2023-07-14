const {
  EmbedBuilder,
  ActionRowBuilder,
  ButtonBuilder,
  ButtonStyle,
} = require("discord.js");
const chance = require("./enhanceSystem/chance");
const game = require("./enhanceSystem/game");
const cost = require("./enhanceSystem/cost");
const pass = require("./enhanceSystem/pass");
module.exports = {
  data: {
    name: `enhance`,
  },
  async execute(interaction) {
    let embedFooterText = interaction.message.embeds[0].footer.text;
    if (interaction.user.id != embedFooterText) {
      return await interaction.reply({
        content: interaction.user.username + ", this is not your game!",
        ephemeral: true,
      });
    }

    let embedTitle = interaction.message.embeds[0].title;
    let embedDesc = interaction.message.embeds[0].description;
    let embedImageUrl = interaction.message.embeds[0].image.url;
    let embedFields = interaction.message.embeds[0].fields;
    let embedThumbnail = interaction.message.embeds[0].thumbnail.url;

    const newTier = game(chance(embedFields[0].value), embedFields[0].value);
    const newChance = String(chance(newTier) * 100);
    const newCost = String(cost(newTier));

    embedThumbnail = pass(embedFields[0].value, newTier);

    // embedFields[0].name = "Current Tier: ";
    embedFields[0].value = newTier;
    // embedFields[1].name = "Enhance Chance: ";
    embedFields[1].value = newChance + "%";
    // embedFields[2].name = "Enhance Cost: ";
    embedFields[2].value = newCost;
    // embedFields[3].name = "your Balance ";
    // embedFields[3].value = "comming soon";

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
        .setLabel("💲"),
      new ButtonBuilder()
        .setStyle(ButtonStyle.Primary)
        .setCustomId("save")
        .setLabel("📄")
    );

    await interaction.message.edit({ embeds: [embed], components: [row0] });

    await interaction.reply({
      content: "you enhanced!",
      ephemeral: true,
    });
    await interaction.deleteReply();
  },
};
