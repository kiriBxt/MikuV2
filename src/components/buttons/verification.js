const { EmbedBuilder } = require("@discordjs/builders");
const fs = require("fs");

module.exports = {
  data: {
    name: `verify`,
  },
  async execute(interaction) {
    let embed = new EmbedBuilder();
    const roles = interaction.member._roles;

    fs.readFile(
      `./src/guildData/${interaction.guild.id}.json`,
      "utf8",
      (err, jsonString) => {
        if (err) {
          console.log("Error reading file from disk:", err);
          return;
        }
        try {
          const data = JSON.parse(jsonString);
          const verRoles = data.verifyRoles[0].roles;

          if (verRoles[0] == null) {
            embed.setTitle(`Keine Verifikationsrollen ausgewählt`);
            return interaction.reply({
              embeds: [embed],
              ephemeral: true,
            });
          }

          if (roles.includes(verRoles[0]) === true) {
            embed.setTitle(`Du bist bereits verifiziert!`);
            return interaction.reply({
              embeds: [embed],
              ephemeral: true,
            });
          }

          verRoles.forEach(async (role) => {
            if (role) {
              await interaction.member.roles.add(role);
            }
          });
          embed.setTitle(`${interaction.user.username} ist nun verifiziert!`);

          return interaction.reply({
            embeds: [embed],
            ephemeral: true,
          });
        } catch (err) {
          embed.setTitle(
            `Keine Verifikationsrollen ausgewählt.\n Benutze /addverifyroles`
          );

          return interaction.reply({
            embeds: [embed],
            ephemeral: true,
          });
        }
      }
    );
  },
};
