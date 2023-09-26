module.exports = {
  name: "playerError",
  async execute(queue, error) {
    await queue.metadata.channel.send(`Player error event: ${error.message}`);
    console.log(error);
  },
};
