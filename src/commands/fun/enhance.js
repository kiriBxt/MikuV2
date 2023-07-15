const {
  SlashCommandBuilder,
  EmbedBuilder,
  ActionRowBuilder,
  ButtonBuilder,
  ButtonStyle,
} = require("discord.js");
const chance = require("../../components/buttons/enhanceSystem/chance.js");
const cost = require("../../components/buttons/enhanceSystem/cost.js");
const wait = require("node:timers/promises").setTimeout;
const User = require("../../models/user.js");
const generateRandomHex = require("./funtools/generateRanomdHex.js");
const guildHasRoleName = require("../../guildhelper/guildHasRoleName.js");
const enhanceOpenInstance = require("./funtools/enhanceOpenInstance.js");
const fetchUser = require("../../guildhelper/fetchUser.js");
const enhanceRoleCheck = require("./funtools/enhanceRoleCheck.js");
const guildRoleCreation = require("../../guildhelper/guildRoleCreation.js");
const guildGetRoleName = require("../../guildhelper/guildGetRoleName.js");

module.exports = {
  cooldown: 10,
  data: new SlashCommandBuilder()
    .setName("enhance")
    .setDescription("Enhance Minigame"),
  async execute(interaction, client) {
    const { member, guild } = interaction;
    const { enhanceUserList } = client;

    if (enhanceOpenInstance(enhanceUserList, member.id)) {
      return await interaction.reply({
        content: "du hast noch eine instanz offen!",
        ephemeral: true,
      });
    }

    const user = fetchUser(member.id);

    if (!user) {
      return await interaction.reply({
        content: " du solltest schon was in den chat schreiben ...",
        ephemeral: true,
      });
    }

    let missingRoles = enhanceRoleCheck(guild);
    if (missingRoles.length > 0) {
      missingRoles.forEach(async (role) => {
        await guildRoleCreation(guild, role, generateRandomHex());
      });
    }

    await interaction.deferReply("loading...");

    enhanceUserList.push(member.id);
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

    const embed1 = new EmbedBuilder().setTitle("loading...");
    let currTier = user.tier;
    await interaction.editReply({ embeds: [embed1] });

    const embed = new EmbedBuilder()
      .setTitle("🍀Enhancing🍀")
      .setDescription(
        `**${interaction.user.username}** versucht sein glück sein Tier zu verbessern!`
      )
      .setThumbnail(
        "https://cdn.icon-icons.com/icons2/510/PNG/512/hammer_icon-icons.com_50378.png"
      )
      .setImage(
        "https://simplifaster.com/wp-content/uploads/2018/09/Hammer-and-Anvil.jpg"
      )
      .setFooter({ text: member.id })
      .addFields(
        { name: "Current Tier: ", value: `${currTier}`, inline: true },
        {
          name: "Enhance Chance: ",
          value: `${chance(currTier) * 100}%`,
          inline: true,
        },
        {
          name: "Enhance Cost: ",
          value: cost(currTier) + "🍪",
          inline: false,
        },
        {
          name: "Your balance: ",
          value: `${user.money} 🍪`,
          inline: true,
        }
      );
    await interaction.editReply({
      embeds: [embed],
      components: [row0],
    });
    await wait(600000);

    if (enhanceOpenInstance(enhanceUserList, member.id)) {
      enhanceUserList.forEach((user) => {
        if (user == member.id) {
          return enhanceUserList.shift();
        }
      });
    }

    const [user2] = fetchUser(member.id);

    let role = guildGetRoleName(user2.tier);
    await member.roles.add(role);

    await interaction.editReply({
      content: "Game closed and data saved!",
      ephemeral: true,
    });
    await wait(5000);
    await interaction.deleteReply();
  },
};
