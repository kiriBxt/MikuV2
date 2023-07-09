module.exports = {
  name: "emptyQueue",
  async execute(queue) {
    await queue.metadata.channel.send("Queue finished!");
  },
};
