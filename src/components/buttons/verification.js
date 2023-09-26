const { EmbedBuilder } = require("@discordjs/builders");
const { getGuildProfile } = require("../../tools/economy");

module.exports = {
  data: {
    name: `verify`,
  },
  async execute(interaction) {
    const { guild, member } = interaction;
    const roles = member.roles.cache;

    let guildProfile = await getGuildProfile(guild);

    if (guildProfile.guildVerifyRoleIds.length == 0) {
      let embed = new EmbedBuilder().setTitle(
        "Benutze /setverifyroles um Rollen auszuwählen."
      );

      return interaction.reply({
        embeds: [embed],
        ephemeral: true,
      });
    }

    const verRoles = guildProfile.guildVerifyRoleIds;
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
