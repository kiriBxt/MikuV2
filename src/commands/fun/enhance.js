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

module.exports = {
  cooldown: 10,
  data: new SlashCommandBuilder()
    .setName("enhance")
    .setDescription("Enhance Minigame"),
  async execute(interaction, client) {
    let currTier = "";
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

    tierList.forEach(async (tierRole) => {
      if (interaction.member.roles.cache.find((r) => r.name === tierRole)) {
        currTier = tierRole;

        let role = interaction.guild.roles.cache.find(
          (role) => role.name === tierRole
        );

        await interaction.member.roles.remove(role);
      }
    });

    if (!currTier) {
      currTier = "Tier 1";
    }

    if (client.enhanceUserList.some((user) => user == interaction.user.id)) {
      return await interaction.reply({
        content: "du hast noch eine instanz offen!",
        ephemeral: true,
      });
    }
    await interaction.deferReply("loading...");
    client.enhanceUserList.push(interaction.user.id);

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
      .setFooter({ text: interaction.user.id })
      .addFields(
        { name: "Current Tier: ", value: `${currTier}`, inline: true },
        {
          name: "Enhance Chance: ",
          value: `${chance(currTier) * 100}%`,
          inline: true,
        },
        {
          name: "Enhance Cost: ",
          value: cost(currTier) + "$ \ncoming soon",
          inline: false,
        },
        {
          name: "Your balance: ",
          value: `comming soon`,
          inline: true,
        }
      );
    await interaction.editReply({
      embeds: [embed],
      components: [row0],
    });
    await wait(600000);
    await interaction.deleteReply();

    if (client.enhanceUserList.find((user) => user == interaction.user.id)) {
      client.enhanceUserList.shift();
    }

    let role = interaction.guild.roles.cache.find(
      (role) => role.name === currTier
    );
    await interaction.member.roles.add(role);

    await interaction.followUp({
      content: "Game closed and role saved!",
      ephemeral: true,
    });
  },
};
