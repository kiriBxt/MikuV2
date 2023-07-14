const { SlashCommandBuilder, PermissionFlagsBits } = require("discord.js");
const Guild = require("../../models/guild");

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
    let checked = [];
    let dupe = false;

    let selecRolesName = [];
    let passedRoles = [];
    let selecRolesId = [];
    selecRolesId.push(
      interaction.options.getRole("role1").id,
      interaction.options.getRole("role2")?.id,
      interaction.options.getRole("role3")?.id,
      interaction.options.getRole("role4")?.id,
      interaction.options.getRole("role5")?.id
    );

    selecRolesId.forEach((role) => {
      if (role) {
        if (checked.some((copy) => copy == role)) {
          dupe = true;
        }
        checked.push(role);
        passedRoles.push(role);
      }
    });
    if (dupe) {
      return await interaction.reply("Keine Rollen doppelt auswählen!");
    }

    selecRolesId.forEach(async (role) => {
      if (role) {
        let guildRole = await interaction.guild.roles.cache.get(role);
        selecRolesName.push(guildRole.name);
      }
    });

    const [guild] = await Guild.findOrCreate({
      where: { id: interaction.guild.id },
    });

    await guild.update({
      verifyRoleId: passedRoles.toString(),
      verifyRoleName: selecRolesName.toString(),
      name: interaction.guild.name,
    });

    await interaction.reply({ content: "success", ephemeral: true });
  },
};
