const { SlashCommandBuilder } = require("discord.js");
const { useQueue } = require("discord-player");

module.exports = {
  cooldown: 1,
  data: new SlashCommandBuilder()
    .setName("skip")
    .setDescription("Überspringt jetziges Lied"),
  async execute(interaction) {
    const queue = useQueue(interaction.guild.id);
    if (!queue) {
      return await interaction.reply({ content: "no queue", ephemeral: true });
    }
    queue.node.skip();

    if (!queue.currentTrack) {
      await interaction.reply({
        content: "Nichts in der queue",
        ephemeral: true,
      });
      return;
    }
    interaction.reply({ content: "skipped", ephemeral: true });
  },
};
