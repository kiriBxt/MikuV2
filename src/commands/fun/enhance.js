const {
  SlashCommandBuilder,
  EmbedBuilder,
  ActionRowBuilder,
  ButtonBuilder,
  ButtonStyle,
} = require("discord.js");
const wait = require("node:timers/promises").setTimeout;
const {
  isInArray,
  tierRemover,
  tierInit,
  numToRole,
} = require("./tools/enhanceTools.js");
const { getProfile, currencyconverter } = require("../../tools/economy.js");
const { getChance, getCost } = require("../../tools/enhance.js");

module.exports = {
  cooldown: 10,
  data: new SlashCommandBuilder()
    .setName("enhance")
    .setDescription("Enhance Minigame"),
  async execute(interaction, client) {
    const { member, guild, user } = interaction;
    const { enhanceUserList } = client;

    if (isInArray(enhanceUserList, member.id)) {
      return await interaction.reply({
        content: "du hast noch eine instanz offen!",
        ephemeral: true,
      });
    }

    enhanceUserList.push(member.id);

    tierRemover(member);
    tierInit(guild);

    let userProfile = await getProfile(user);

    await interaction.deferReply("loading...");

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

    const embed1 = new EmbedBuilder().setTitle("loading...");
    let currTier = userProfile.userTier;
    await interaction.editReply({ embeds: [embed1] });

    const embed = new EmbedBuilder()
      .setTitle("🍀Enhancing🍀")
      .setDescription(
        `**${user.username}** versucht sein glück sein Tier zu verbessern!`
      )
      .setThumbnail(
        "https://cdn.icon-icons.com/icons2/510/PNG/512/hammer_icon-icons.com_50378.png"
      )
      .setImage(
        "https://simplifaster.com/wp-content/uploads/2018/09/Hammer-and-Anvil.jpg"
      )
      .setFooter({ text: member.id })
      .addFields(
        { name: "Current ", value: `${numToRole(currTier)}`, inline: true },
        {
          name: "Enhance Chance: ",
          value: `${getChance(currTier) * 100}%`,
          inline: true,
        },
        {
          name: "Enhance Cost: ",
          value: `${currencyconverter(getCost(currTier))} `,
          inline: false,
        },
        {
          name: "Your balance: ",
          value: `${currencyconverter(userProfile.userBal)}`,
          inline: true,
        }
      );
    await interaction.editReply({
      embeds: [embed],
      components: [row0],
    });

    await wait(6000);

    try {
      await interaction.deleteReply();

      if (isInArray(enhanceUserList, member.id)) {
        let index = enhanceUserList.indexOf(member.id);
        enhanceUserList.splice(index, 1);
      }

      let userProfile = await getProfile(user);
      let role = guild.roles.cache.find(
        (role) => role.name == numToRole(userProfile.userTier)
      );
      await member.roles.add(role);
      await interaction.editReply({
        content: "Game closed and data saved!",
        ephemeral: true,
      });
      await wait(5000);
      await interaction.deleteReply();
    } catch (e) {}
  },
};
