const {
  SlashCommandBuilder,
  ActionRowBuilder,
  ButtonBuilder,
  ButtonStyle,
  PermissionFlagsBits,
} = require("discord.js");

module.exports = {
  cooldown: 0,
  data: new SlashCommandBuilder()
    .setName("button")
    .setDescription(
      "fügt einen button an die zuletzt gesendete nachricht im channel"
    )
    .setDefaultMemberPermissions(PermissionFlagsBits.Administrator)
    .addSubcommand((subcommand) =>
      subcommand
        .setName("rollen")
        .setDescription(
          "Hier werden Button rollen generiert. 25 Buttons möglich!"
        )
        .addStringOption((option) =>
          option
            .setName("rollenids")
            .setDescription("Beispiel: 43534543534,34534534543,3453453454,...")
            .setRequired(true)
        )
    ),
  async execute(interaction) {
    let input = interaction.options.getString("rollenids");
    input.replace(/[^0-9]/g, "");
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
    let messageId;
    let messageEmbed;
    let messageContent;
    const channel = interaction.channel;
    const messages = await channel.messages.fetch({ limit: 1 });
    const msg = messages.filter(
      (message) => (
        (messageContent = message.content),
        (messageEmbed = message.embeds[0]),
        (messageId = message.id)
      )
    );

    await channel.bulkDelete(1);

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
          row0.components.push(
            new ButtonBuilder()
              .setCustomId(role)
              .setLabel(interaction.guild.roles.cache.get(role).name)
              .setStyle(ButtonStyle.Primary)
          ),
            count++;
        } else if (count <= 10 && count > 5) {
          row1.components.push(
            new ButtonBuilder()
              .setCustomId(role)
              .setLabel(interaction.guild.roles.cache.get(role).name)
              .setStyle(ButtonStyle.Primary)
          ),
            count++;
        } else if (count <= 15 && count > 10) {
          row2.components.push(
            new ButtonBuilder()
              .setCustomId(role)
              .setLabel(interaction.guild.roles.cache.get(role).name)
              .setStyle(ButtonStyle.Primary)
          ),
            count++;
        } else if (count <= 20 && count > 15) {
          row3.components.push(
            new ButtonBuilder()
              .setCustomId(role)
              .setLabel(interaction.guild.roles.cache.get(role).name)
              .setStyle(ButtonStyle.Primary)
          ),
            count++;
        } else if (count <= 25 && count > 20) {
          row4.components.push(
            new ButtonBuilder()
              .setCustomId(role)
              .setLabel(interaction.guild.roles.cache.get(role).name)
              .setStyle(ButtonStyle.Primary)
          ),
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
