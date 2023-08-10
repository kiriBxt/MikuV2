const {
  SlashCommandBuilder,
  PermissionFlagsBits,
  EmbedBuilder,
} = require("discord.js");
const { getGuildProfile } = require("../../tools/economy");
const { dupeChecker } = require("./tools/dupeChecker");

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
    const { options, guild } = interaction;

    let selecRolesId = [];
    selecRolesId.push(
      options.getRole("role1").id,
      options.getRole("role2")?.id,
      options.getRole("role3")?.id,
      options.getRole("role4")?.id,
      options.getRole("role5")?.id
    );

    let checked = dupeChecker(selecRolesId);

    if (checked === true) {
      return await interaction.reply("Keine Rollen doppelt auswählen!");
    }

    let selecRolesName = [];
    checked.forEach((role) => {
      if (role) {
        let guildRole = guild.roles.cache.get(role);
        selecRolesName.push(guildRole.name);
      }
    });

    let guildProfile = await getGuildProfile(guild);

    guildProfile.guildVerifyRoleIds = checked;
    guildProfile.guildVerifyRoleNames = selecRolesName;
    guildProfile.save().catch(console.error);

    let embed = new EmbedBuilder().setTitle("Verify Rollen wurden erstellt.");

    return interaction.reply({
      embeds: [embed],
      ephemeral: true,
    });
  },
};
