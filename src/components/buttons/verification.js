const { EmbedBuilder } = require("@discordjs/builders");
const fs = require("fs");

module.exports = {
  data: {
    name: `verify`,
  },
  async execute(interaction) {
    let error = "";
    const roles = interaction.member._roles;

    fs.readFile(
      `./src/guildData/${interaction.guild.id}.json`,
      "utf8",
      (err, jsonString) => {
        if (err) {
          return interaction.reply("Bitte benutze /setverification");
        }
        const data = JSON.parse(jsonString);
        const verRoles = data.verifyRoles[0].roles;

        if (verRoles[0] == null) {
          return interaction.reply("Bitte benutze /setverification");
        }

        if (roles.includes(verRoles[0]) === true) {
          return interaction.reply("bereits verifiziert");
        }

        verRoles.forEach(async (roleId) => {
          try {
            if (roleId) {
              await interaction.member.roles.add(roleId);
            }
          } catch (e) {
            error +=
              e.rawError.message +
              " for role " +
              interaction.guild.roles.cache.get(roleId).name +
              "\n";
          }
          if (error) return interaction.reply(error);
        });
      }
    );
  },
};
