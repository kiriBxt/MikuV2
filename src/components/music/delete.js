const { EmbedBuilder } = require("discord.js");
const { useQueue } = require("discord-player");

module.exports = {
  data: {
    name: `delete`,
  },
  async execute(interaction) {
    const queue = useQueue(interaction.guild.id);

    if (!queue)
      return await interaction.reply({
        content: "nothing in queue",
        ephemeral: true,
      });

    queue.delete();

    await interaction.reply({
      content: "queue deleted",
      ephemeral: true,
    });
    interaction.deleteReply();
  },
};
