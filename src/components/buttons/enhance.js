const {
  EmbedBuilder,
  ActionRowBuilder,
  ButtonBuilder,
  ButtonStyle,
} = require("discord.js");
const wait = require("node:timers/promises").setTimeout;
const chance = require("./enhanceSystem/chance");
const game = require("./enhanceSystem/game");
const cost = require("./enhanceSystem/cost");
const pass = require("./enhanceSystem/pass");
const User = require("../../models/user");
module.exports = {
  data: {
    name: `enhance`,
  },
  async execute(interaction, client) {
    if (!client.enhanceUserList.some((user) => user == interaction.user.id)) {
      await message.delete();
      await interaction.reply({ content: "no cheating!", ephemeral: true });
      await wait(5000);
      return interaction.deleteReply();
    }
    const { message } = interaction;
    let embedFooterText = message.embeds[0].footer.text;
    if (interaction.user.id != embedFooterText) {
      return await interaction.reply({
        content: interaction.user.username + ", this is not your game!",
        ephemeral: true,
      });
    }

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

    const newTier = game(chance(embedFields[0].value), embedFields[0].value);
    const newChance = String(chance(newTier) * 100);
    const newCost = String(cost(newTier));

    const userDB = await User.findOne({ where: { id: interaction.user.id } });

    embedThumbnail = pass(embedFields[0].value, newTier);

    // embedFields[0].name = "Current Tier: ";
    embedFields[0].value = newTier;
    // embedFields[1].name = "Enhance Chance: ";
    embedFields[1].value = newChance + "%";
    // embedFields[2].name = "Enhance Cost: ";
    embedFields[2].value = newCost + "🍪";
    // embedFields[3].name = "your Balance ";
    embedFields[3].value = currBal + "🍪";

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

    await userDB.update({ tier: newTier });

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

    await userDB.update({ tier: newTier, money: currBal });

    await message.edit({ embeds: [embed], components: [row0] });

    await interaction.reply({
      content: "you enhanced!",
      ephemeral: true,
    });
    await interaction.deleteReply();
  },
};
