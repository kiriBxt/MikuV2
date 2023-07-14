const {
  EmbedBuilder,
  ActionRowBuilder,
  ButtonBuilder,
  ButtonStyle,
  SlashCommandBuilder,
} = require("discord.js");
const { useQueue } = require("discord-player");
module.exports = {
  data: new SlashCommandBuilder()
    .setName("nowplaying")
    .setDescription("Zeigt den jetzigen song an"),
  async execute(interaction) {
    const { guild } = interaction;
    const queue = useQueue(guild.id);
    if (!queue)
      return await interaction.reply({
        content: "Nichts in der queue",
        ephemeral: true,
      });

    const track = queue.currentTrack;
    const { title, url, author, thumbnail, requestedBy } = track;
    if (!queue)
      return await interaction.reply({
        content: "Nichts in der queue",
        ephemeral: true,
      });
    const embedAdded = new EmbedBuilder()
      .setTitle(`🎵 ${title}`)
      .setURL(`${url}`)
      .setDescription(`${author}`)
      .setColor(0x18e1ee)
      .setThumbnail(thumbnail)
      .addFields([
        {
          name: `Playing`,
          value: `${queue.node.createProgressBar()}`,
          inline: false,
        },
        {
          name: `Requested by`,
          value: `**${requestedBy}**`,
          inline: true,
        },
      ]);
    const row0 = new ActionRowBuilder().addComponents(
      new ButtonBuilder()
        .setStyle(ButtonStyle.Primary)
        .setCustomId("pause")
        .setLabel("⏯"),
      new ButtonBuilder()
        .setStyle(ButtonStyle.Primary)
        .setCustomId("skip")
        .setLabel("⏭")
        .setLabel("⏯"),
      new ButtonBuilder()
        .setStyle(ButtonStyle.Primary)
        .setCustomId("queue")
        .setLabel("Queue")
    );
    await interaction.reply({
      embeds: [embedAdded],
      components: [row0],
    });
  },
};
