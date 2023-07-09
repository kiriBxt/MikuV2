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
    .setDescription("Spielt song/playlist ab [Titel/Songlink/Playlistlink]"),
  async execute(interaction) {
    const queue = useQueue(interaction.guild.id);
    if (!queue)
      return await interaction.reply({
        content: "Nichts in der queue",
        ephemeral: true,
      });

    const track = queue.currentTrack;
    if (!queue)
      return await interaction.reply({
        content: "Nichts in der queue",
        ephemeral: true,
      });
    const embedAdded = new EmbedBuilder()
      .setTitle(`🎵 ${track.title}`)
      .setURL(`${track.url}`)
      .setDescription(`${track.author}`)
      .setColor(0x18e1ee)
      .setThumbnail(track.thumbnail)
      .addFields([
        {
          name: `Playing`,
          value: `${queue.node.createProgressBar()}`,
          inline: false,
        },
        {
          name: `Requested by`,
          value: `**${track.requestedBy}**`,
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
