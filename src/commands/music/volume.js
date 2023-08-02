const { SlashCommandBuilder } = require("discord.js");
const { useQueue } = require("discord-player");

module.exports = {
  cooldown: 1,
  data: new SlashCommandBuilder()
    .setName("volume")
    .setDescription("stellt die lautstärke ein")
    .addStringOption((option) =>
      option.setName("volume").setDescription("User input").setRequired(true)
    ),
  async execute(interaction) {
    const queue = useQueue(interaction.guild.id);
    if (!queue) {
      return await interaction.reply("Nichts in der queue");
    }
    const volume = interaction.options.getString("volume");
    if (volume >= 100 || volume <= 1 || isNaN(volume)) {
      return await interaction.reply("Eingabe ungültig!");
    }
    queue.node.setVolume(parseInt(volume));
    await interaction.reply("Lautstärke geändert: " + volume);
  },
};
