const { EmbedBuilder } = require("@discordjs/builders");
const Guild = require("../../models/guild");

module.exports = {
  data: {
    name: `verify`,
  },
  async execute(interaction) {
    const { guild, member } = interaction;
    const roles = member.roles.cache;

    const guildDB = await Guild.findOne({ where: { id: guild.id } });

    if (!guildDB || guildDB.verifyRoleId == "" || !guildDB.verifyRoleId) {
      return await interaction.reply({
        content: "wähle verfifikationsrollen mit /setverifyroles aus!",
        ephemeral: true,
      });
    }
    const verRoles = guildDB.verifyRoleId.split(",");
    if (roles.some((role) => role.id == verRoles[0])) {
      return await interaction.reply({
        content: "Bereits verifiziert!",
        ephemeral: true,
      });
    }
    await interaction.deferReply({ content: "", ephemeral: true });

    verRoles.forEach(async (roleId) => {
      if (roleId) {
        try {
          await member.roles.add(roleId);
        } catch (e) {
          return interaction.editReply(e.rawError.message);
        }
      }
    });

    await interaction.editReply("Du bist nun verifiziert");
  },
};
