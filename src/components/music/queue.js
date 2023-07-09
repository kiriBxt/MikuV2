const { EmbedBuilder } = require("discord.js");
const { useQueue } = require("discord-player");

module.exports = {
  data: {
    name: `queue`,
  },
  async execute(interaction) {
    const queue = useQueue(interaction.guild.id);

    if (!queue)
      return await interaction.reply({
        content: "nothing in queue",
        ephemeral: true,
      });

    const tracks = queue.tracks.toArray();

    let queueList = "\u200b";
    tracks.slice(0, 10).forEach((track, index) => {
      queueList += "```" + `${index + 1} | # ` + `${track.title}\n` + "```";
    });

    const embed = new EmbedBuilder()
      .setColor(0x18e1ee)
      .setDescription(`**In Queue: ${tracks.length}\n**${queueList}`);

    await interaction.reply({
      embeds: [embed],
      ephemeral: true,
    });
  },
};
