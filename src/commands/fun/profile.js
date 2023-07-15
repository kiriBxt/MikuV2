const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");
const filledBar = require("./funtools/filledBar");
const User = require("../../models/user");
const fetchUser = require("../../guildhelper/fetchUser");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("profile")
    .setDescription("Nekopass")
    .addUserOption((option) =>
      option
        .setName("target")
        .setDescription("Gets someones profile")
        .setRequired(false)
    ),
  async execute(interaction) {
    let selectedUser = interaction.options.getUser("target");
    if (!selectedUser) selectedUser = interaction.user;

    const user = fetchUser(selectedUser.id);

    if (!user)
      return await interaction.reply({
        content: `User ${selectedUser} not in Database`,
        ephemeral: true,
      });

    let level = user.level;
    let leveldown = 100 * (level - 1) + 100 * 0.5 * (level - 1) ** 2;

    const currXp = user.xp - leveldown;
    const currXpNeeded = user.xpNeeded - leveldown;

    let levelPerc = Math.round((currXp / currXpNeeded) * 100);

    const embed = new EmbedBuilder()
      .setTitle(`Neko Pass`)
      .setColor(0x18e1ee)
      .setThumbnail(selectedUser.displayAvatarURL())
      .setAuthor({
        name: selectedUser.tag,
      })
      .addFields([
        {
          name: `Level`,
          value: `${user.level}`,
          inline: true,
        },
        {
          name: `XP`,
          value: `${user.xp}`,
          inline: true,
        },
        {
          name: `Level Fortschritt: ${levelPerc}%`,
          value: `${filledBar(
            currXpNeeded,
            currXp,
            (size = 10),
            (line = "▱"),
            (slider = "▰")
          )}\n**${currXpNeeded - currXp}xp to next level**`,
          inline: false,
        },
        {
          name: `Bank`,
          value: `${user.money} 🍪`,
          inline: true,
        },
        {
          name: `Tier`,
          value: `${user.tier}`,
          inline: true,
        },
        {
          name: `Rep`,
          value: `${user.rep}`,
          inline: true,
        },
      ]);

    await interaction.reply({
      embeds: [embed],
    });
  },
};
