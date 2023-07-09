const { EmbedBuilder } = require("discord.js");
const { useQueue } = require("discord-player");

module.exports = {
  data: {
    name: `skip`,
  },
  async execute(interaction) {
    const queue = useQueue(interaction.guild.id);

    if (!queue)
      return await interaction.reply({
        content: "nothing in queue",
        ephemeral: true,
      });
    queue.node.skip();

    const embed = new EmbedBuilder();
    embed.setDescription(`**[${queue.currentTrack}]** has been skipped`);
    await interaction.reply({
      embeds: [embed],
      ephemeral: true,
    });
    interaction.deleteReply();
  },
};
