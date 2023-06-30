const {
  SlashCommandBuilder,
  PermissionFlagsBits,
  EmbedBuilder,
} = require("discord.js");
const fs = require("fs");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("showverifyroles")
    .setDescription("Füge Verifikationsrollen hinzu")
    .setDefaultMemberPermissions(PermissionFlagsBits.Administrator),
  async execute(interaction) {
    let embed = new EmbedBuilder();
    let roleList = "\u200b";

    fs.readFile(
      `./src/guildData/${interaction.guild.id}.json`,
      "utf8",
      (err, jsonString) => {
        if (err) {
          console.log("Error reading file from disk:", err);
          return interaction.reply({
            content: "Keine Verifikationsrollen vorhanden!",
            ephemeral: true,
          });
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
          } else {
            let roleIdList = verRoles;
            roleIdList.forEach(async (role) => {
              if (role) {
                roleList += `${interaction.guild.roles.cache
                  .get(role)
                  ?.name.toString()}\n `;
              }
            });
            embed.setTitle("Verifikationsrollen:");
            embed.setDescription(roleList);
            return interaction.reply({
              embeds: [embed],
              ephemeral: true,
            });
          }
        } catch (err) {
          console.log(err);
          embed.setTitle(
            `Keine Verifikationsrollen ausgewählt.\n Benutze /setverifyroles`
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
