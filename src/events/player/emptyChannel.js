module.exports = {
  name: "emptyChannel",
  async execute(queue) {
    await queue.metadata.channel.send(
      "Leaving because no vc activity for the past 5 minutes"
    );
  },
};
