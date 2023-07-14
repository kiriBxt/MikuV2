const { EmbedBuilder } = require("@discordjs/builders");
const fs = require("fs");

module.exports = {
  data: {
    name: `verify`,
  },
  async execute(interaction) {
    const { guild, member } = interaction;
    const roles = member._roles;
    await interaction.deferReply({ content: "", ephemeral: true });

    fs.readFile(
      `./src/guildData/${guild.id}.json`,
      "utf8",
      async (err, jsonString) => {
        if (err) {
          return interaction.editReply("Bitte benutze /setverification");
        }
        const data = JSON.parse(jsonString);
        const verRoles = data.verifyRoles[0].roles;

        if (verRoles[0] == null) {
          return interaction.editReply("Bitte benutze /setverification");
        }

        if (roles.includes(verRoles[0]) === true) {
          return interaction.editReply("bereits verifiziert");
        }

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
      }
    );
  },
};
