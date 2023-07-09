const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("avatar")
    .setDescription("Get user Avatar")
    .addUserOption((option) =>
      option
        .setName("user")
        .setDescription("Get someones profile")
        .setRequired(false)
    ),
  async execute(interaction) {
    let selectedUser = interaction.options.getUser("user");
    if (!selectedUser) selectedUser = interaction.user;

    const embed = new EmbedBuilder()
      .setTitle(`Profilbild von:\n**${selectedUser.tag}**`)
      .setImage(
        selectedUser.displayAvatarURL({
          size: 2048,
          format: "png",
          dynamic: true,
        })
      );

    //client.application.commands.set([]);

    await interaction.reply({
      embeds: [embed],
    });
  },
};
