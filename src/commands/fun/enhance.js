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

module.exports = {
  cooldown: 10,
  data: new SlashCommandBuilder()
    .setName("enhance")
    .setDescription("Enhance Minigame"),
  async execute(interaction, client) {
    const { member, guild } = interaction;
    const { enhanceUserList } = client;
    if (enhanceUserList.some((user) => user == interaction.user.id)) {
      return await interaction.reply({
        content: "du hast noch eine instanz offen!",
        ephemeral: true,
      });
    }
    const user = await User.findOne({ where: { id: interaction.user.id } });

    if (!user) {
      return await interaction.reply({
        content: " du solltest schon was in den chat schreiben ...",
        ephemeral: true,
      });
    }

    let currTier = user.tier;
    const tierList = [
      "Tier 1",
      "Tier 2",
      "Tier 3",
      "Tier 4",
      "Tier 5",
      "Tier 6",
      "Tier 7",
      "Tier 8",
      "Tier 9",
      "Tier 10",
    ];

    if (
      !tierList.some((check) =>
        guild.roles.cache.some((role) => role.name == check)
      )
    ) {
      tierList.forEach(async (role) => {
        await guild.roles.create({
          name: role,
          color: 1,
        });
      });
    }

    tierList.forEach(async (tierRole) => {
      if (member.roles.cache.find((r) => r.name === tierRole)) {
        currTier = tierRole;
        let role = guild.roles.cache.find((role) => role.name === tierRole);
        await member.roles.remove(role);
      }
    });

    if (!currTier) {
      currTier = "Tier 1";
    }

    await interaction.deferReply("loading...");
    enhanceUserList.push(interaction.user.id);

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

    if (enhanceUserList.find((user) => user == member.id)) {
      enhanceUserList.shift();
    }

    const [user2] = await User.findOrCreate({ where: { id: author.id } });

    let role = guild.roles.cache.find((role) => role.name === user2.tier);
    await member.roles.add(role);

    await interaction.editReply({
      content: "Game closed and data saved!",
      ephemeral: true,
    });
    await wait(5000);
    await interaction.deleteReply();
  },
};
