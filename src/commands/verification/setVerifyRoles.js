const { SlashCommandBuilder, PermissionFlagsBits } = require("discord.js");
const fs = require("fs");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("setverifyroles")
    .setDescription("Füge Verifikationsrollen hinzu")
    .setDefaultMemberPermissions(PermissionFlagsBits.Administrator)
    .addRoleOption((option) =>
      option
        .setName("role1")
        .setDescription("Verifikationsrolle hinzufügen")
        .setRequired(true)
    )
    .addRoleOption((option) =>
      option
        .setName("role2")
        .setDescription("Verifikationsrolle hinzufügen")
        .setRequired(false)
    )
    .addRoleOption((option) =>
      option
        .setName("role3")
        .setDescription("Verifikationsrolle hinzufügen")
        .setRequired(false)
    )
    .addRoleOption((option) =>
      option
        .setName("role4")
        .setDescription("Verifikationsrolle hinzufügen")
        .setRequired(false)
    )
    .addRoleOption((option) =>
      option
        .setName("role5")
        .setDescription("Verifikationsrolle hinzufügen")
        .setRequired(false)
    ),
  async execute(interaction) {
    var data = {};
    let checked = [];
    let dupe = false;

    let selecRoles = [];
    selecRoles.push(
      interaction.options.getRole("role1").id,
      interaction.options.getRole("role2")?.id,
      interaction.options.getRole("role3")?.id,
      interaction.options.getRole("role4")?.id,
      interaction.options.getRole("role5")?.id
    );

    selecRoles.forEach((role) => {
      if (role) {
        if (checked.some((copy) => copy == role)) {
          dupe = true;
        }
        checked.push(role);
      }
    });
    if (dupe) {
      return await interaction.reply("Keine Rollen doppelt auswählen!");
    }

    data.verifyRoles = [];
    data.verifyRoles.push({
      roles: selecRoles,
    });
    fs.writeFile(
      `./src/guildData/${interaction.guild.id}.json`,
      JSON.stringify(data),
      function (err) {
        if (err) throw err;
      }
    );

    await interaction.reply({ content: "success", ephemeral: true });
  },
};
