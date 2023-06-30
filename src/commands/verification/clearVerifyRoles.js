const { SlashCommandBuilder, PermissionFlagsBits } = require("discord.js");
const fs = require("fs");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("clearverifyroles")
    .setDescription("Löscht alle Verifikationsrollen")
    .setDefaultMemberPermissions(PermissionFlagsBits.Administrator),
  async execute(interaction) {
    var data = {};
    data.verifyRoles = [];
    data.verifyRoles.push({
      roles: [],
    });
    fs.writeFile(
      `./src/guildData/${interaction.guild.id}.json`,
      JSON.stringify(data),
      function (err) {
        if (err) throw err;
      }
    );
    await interaction.reply("success");
  },
};
