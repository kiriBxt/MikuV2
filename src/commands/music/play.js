const { SlashCommandBuilder } = require("discord.js");
const { useMainPlayer, QueryType } = require("discord-player");
const config = require("../../config.json");

module.exports = {
  cooldown: 0,
  data: new SlashCommandBuilder()
    .setName("play")
    .setDescription("Youtube MP3 Player")
    .addSubcommand((subcommand) =>
      subcommand
        .setName("song")
        .setDescription("benutze Lied Titel/Link")
        .addStringOption((option) =>
          option.setName("suche").setDescription("Song").setRequired(true)
        )
    )
    .addSubcommand((subcommand) =>
      subcommand
        .setName("playlist")
        .setDescription("benutze Playlist Titel/Link")
        .addStringOption((option) =>
          option.setName("suche").setDescription("Song").setRequired(true)
        )
    ),
  async execute(interaction) {
    await interaction.deferReply({ content: "searching...", ephemeral: true });
    const voiceChannel = interaction.member.voice.channel;
    if (!voiceChannel)
      return interaction.editReply("Du musst in einem Voicechannel sein!");
    const player = useMainPlayer();
    let search = interaction.options.getString("suche");

    switch (interaction.options.getSubcommand()) {
      case "song":
        const track = await player.search(search, {
          requestedBy: interaction.user,
          searchEngine: QueryType.YOUTUBE_SEARCH,
        });
        try {
          await player.play(voiceChannel, track, {
            nodeOptions: {
              metadata: {
                channel: interaction.channel,
              },
              selfDeaf: config.selfDeaf,
              volume: config.volume,
              leaveOnEmpty: config.leaveOnEmpty,
              leaveOnEmptyCooldown: config.leaveOnEmptyCooldown,
              leaveOnEnd: config.leaveOnEnd,
              leaveOnEndCooldown: config.leaveOnEndCooldown,
            },
          });
          return await interaction.editReply({
            content: "successfully added",
            ephemeral: true,
          });
        } catch (error) {
          return await interaction.editReply(`**[${search}]** ist ungültig!`);
        }
      case "playlist":
        const tracks = await player.search(search, {
          requestedBy: interaction.user,
          searchEngine: QueryType.YOUTUBE_PLAYLIST,
        });
        try {
          await player.play(interaction.member.voice.channel, tracks, {
            nodeOptions: {
              metadata: {
                channel: interaction.channel,
              },
              selfDeaf: config.selfDeaf,
              volume: config.volume,
              leaveOnEmpty: config.leaveOnEmpty,
              leaveOnEmptyCooldown: config.leaveOnEmptyCooldown,
              leaveOnEnd: config.leaveOnEnd,
              leaveOnEndCooldown: config.leaveOnEndCooldown,
            },
          });
        } catch (error) {
          console.log(error);
          return interaction.reply(`**[${search}]** ist ungültig!`);
        }
        let queue = "\u200b";

        if (!tracks.playlist) {
          return await interaction.reply({
            content: "Nichts in der queue",
            ephemeral: true,
          });
        }

        tracks.playlist.tracks.slice(0, 10).forEach((track, index) => {
          queue += "```" + `${index + 1} # ` + `${track.title}\n` + "```";
        });
        return await interaction.editReply({
          content: "Playlist hinzugefügt",
        });
      default:
        break;
    }
  },
};
