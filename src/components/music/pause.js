const { EmbedBuilder } = require("discord.js");
const { useQueue } = require("discord-player");

module.exports = {
  data: {
    name: `pause`,
  },
  async execute(interaction) {
    const queue = useQueue(interaction.guild.id);
    if (!queue)
      return interaction.reply({
        content: "Nichts in der queue!",
        ephemeral: true,
      });
    if (!queue.currentTrack)
      return interaction.reply({
        content: "Nichts zum pausieren!",
        ephemeral: true,
      });

    const track = queue.currentTrack;

    if (queue.node.isPaused()) {
      embed = new EmbedBuilder().setTitle("Resumed");
      const embedPlaying = new EmbedBuilder()
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
      interaction.message.edit({ embeds: [embedPlaying] });
    } else {
      embed = new EmbedBuilder().setTitle("Paused");
      const embedPaused = new EmbedBuilder()
        .setTitle(`🎵 ${track.title}`)
        .setURL(`${track.url}`)
        .setDescription(`${track.author}`)
        .setColor(0x18e1ee)
        .setThumbnail(track.thumbnail)
        .addFields([
          {
            name: `Paused`,
            value: `${queue.node.createProgressBar()}`,
            inline: false,
          },
          {
            name: `Requested by`,
            value: `**${track.requestedBy}**`,
            inline: true,
          },
        ]);
      interaction.message.edit({ embeds: [embedPaused] });
    }

    queue.node.setPaused(!queue.node.isPaused());

    await interaction.reply({
      embeds: [embed],
      ephemeral: true,
    });
    interaction.deleteReply();
  },
};
