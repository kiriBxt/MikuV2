const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");
const filledBar = require("./tools/filledBar");
const { getProfile, currencyconverter } = require("../../tools/economy");

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
    const { options, user } = interaction;
    let selectedUser = options.getUser("target");
    if (!selectedUser) selectedUser = user;

    let userProfile = await getProfile(selectedUser);

    let levelPerc = Math.round(
      (userProfile.userXp / (userProfile.userLevel * 100)) * 100
    );

    const embed = new EmbedBuilder()
      .setTitle(`Neko Pass`)
      .setColor(0x18e1ee)
      .setThumbnail(selectedUser.displayAvatarURL())
      .setAuthor({
        name: selectedUser.username,
      })
      .addFields([
        {
          name: `Level`,
          value: `${userProfile.userLevel}`,
          inline: true,
        },
        {
          name: `XP`,
          value: `${userProfile.userXp}`,
          inline: true,
        },
        {
          name: `Level Fortschritt: ${levelPerc}%`,
          value: `${filledBar(
            userProfile.userLevel * 100,
            userProfile.userXp,
            (size = 10),
            (line = "▱"),
            (slider = "▰")
          )}\n**${
            userProfile.userLevel * 100 - userProfile.userXp
          }xp to next level**`,
          inline: false,
        },
        {
          name: `Bank`,
          value: `${currencyconverter(userProfile.userBal)}`,
          inline: true,
        },
        {
          name: `Tier`,
          value: `${userProfile.userTier}`,
          inline: true,
        },
      ]);

    await interaction.reply({
      embeds: [embed],
    });
  },
};
