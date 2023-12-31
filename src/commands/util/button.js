const {
  SlashCommandBuilder,
  ActionRowBuilder,
  ButtonBuilder,
  ButtonStyle,
  PermissionFlagsBits,
  EmbedBuilder,
} = require("discord.js");

module.exports = {
  cooldown: 0,
  data: new SlashCommandBuilder()
    .setName("button")
    .setDescription(
      "fügt einen button an die zuletzt gesendete nachricht im channel"
    )
    .setDefaultMemberPermissions(PermissionFlagsBits.Administrator)
    .addStringOption((option) =>
      option
        .setName("title")
        .setDescription("Hier kommt der Embedtitel hin")
        .setRequired(true)
    )
    .addStringOption((option) =>
      option
        .setName("desc")
        .setDescription("Hier kommt der Beschreibung hin")
        .setRequired(true)
    )
    .addStringOption((option) =>
      option
        .setName("rollenids")
        .setDescription("Hier kommen die RollenIds hin")
        .setRequired(true)
    ),

  async execute(interaction) {
    const { options, guild } = interaction;
    let input = options.getString("rollenids");
    let title = options.getString("title");
    let desc = options.getString("desc");
    input.replaceAll(/[^0-9]/g, "");
    let roles = input.split(",");
    if (roles.length > 25) {
      return await interaction.reply("Das Limit pro Embed liegt bei 25");
    }
    let dupe = false;
    let checked = [];
    roles.forEach((role) => {
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

    await interaction.deferReply();

    const row0 = new ActionRowBuilder();
    const row1 = new ActionRowBuilder();
    const row2 = new ActionRowBuilder();
    const row3 = new ActionRowBuilder();
    const row4 = new ActionRowBuilder();

    let count = 1;

    try {
      roles.forEach((role) => {
        if (count <= 5) {
          if (role) {
            row0.components.push(
              new ButtonBuilder()
                .setCustomId(role)
                .setLabel(guild.roles.cache.get(role).name)
                .setStyle(ButtonStyle.Secondary)
            );
          }
          count++;
        } else if (count <= 10 && count > 5) {
          if (role) {
            row1.components.push(
              new ButtonBuilder()
                .setCustomId(role)
                .setLabel(guild.roles.cache.get(role).name)
                .setStyle(ButtonStyle.Secondary)
            );
          }
          count++;
        } else if (count <= 15 && count > 10) {
          if (role) {
            row2.components.push(
              new ButtonBuilder()
                .setCustomId(role)
                .setLabel(guild.roles.cache.get(role).name)
                .setStyle(ButtonStyle.Secondary)
            );
          }
          count++;
        } else if (count <= 20 && count > 15) {
          row3.components.push(
            new ButtonBuilder()
              .setCustomId(role)
              .setLabel(guild.roles.cache.get(role).name)
              .setStyle(ButtonStyle.Secondary)
          ),
            count++;
        } else if (count <= 25 && count > 20) {
          if (role) {
            row4.components.push(
              new ButtonBuilder()
                .setCustomId(role)
                .setLabel(guild.roles.cache.get(role).name)
                .setStyle(ButtonStyle.Secondary)
            );
          }
          count++;
        } else {
          interaction.editReply({
            content: "something went wrong creating buttons",
            ephemeral: true,
          });
        }
      });
    } catch (e) {
      return await interaction.editReply({
        content:
          "Es darf beim kopieren kein 'Enter' für zeilenumbrüche benutzt werden: 4325234234,234234234,23423432423,...\n" +
          e,
        ephemeral: true,
      });
    }

    let amount = Math.ceil(roles.length / 5);

    const messageEmbed = new EmbedBuilder()
      .setTitle(title)
      .setDescription(desc);

    if (!messageEmbed) {
      return interaction.editReply({
        content: "benutze /embed bevor dem button command!",
      });
    }

    try {
      switch (amount) {
        case 1:
          return await interaction.editReply({
            components: [row0],
            embeds: [messageEmbed],
          });
        case 2:
          return await interaction.editReply({
            components: [row0, row1],
            embeds: [messageEmbed],
          });
        case 3:
          return await interaction.editReply({
            components: [row0, row1, row2],
            embeds: [messageEmbed],
          });
        case 4:
          return await interaction.editReply({
            components: [row0, row1, row2, row3],
            embeds: [messageEmbed],
          });
        case 5:
          return await interaction.editReply({
            components: [row0, row1, row2, row3, row4],
            embeds: [messageEmbed],
          });
        default:
          return await interaction.editReply({
            content: "error, something went wrong creating embed",
            ephemeral: true,
          });
      }
    } catch (e) {
      console.log(e);
      return await interaction.editReply({
        content:
          e.rawError.message +
          "error, something went wrong creating embed" +
          "\n**Tipp** \nKopiere alle ids in eine txt file und kopiere die dann in den command rein. Es darf beim kopieren kein 'Enter' für zeilenumbrüche benutzt werden!",
      });
    }
  },
};
