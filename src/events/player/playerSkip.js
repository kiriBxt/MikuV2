module.exports = {
  name: "playerSkip",
  async execute(queue, track) {
    await queue.metadata.channel.send(track.title + " skipped");
  },
};
