const {
  EmbedBuilder,
  ActionRowBuilder,
  ButtonBuilder,
  ButtonStyle,
} = require("discord.js");
module.exports = {
  name: "playerStart",
  async execute(queue, track) {
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
        .setLabel("⏭"),
      new ButtonBuilder()
        .setStyle(ButtonStyle.Primary)
        .setCustomId("delete")
        .setLabel("❌"),
      new ButtonBuilder()
        .setStyle(ButtonStyle.Primary)
        .setCustomId("queue")
        .setLabel("Queue")
    );
    await queue.metadata.channel.send({
      embeds: [embedAdded],
      components: [row0],
    });
  },
};
