module.exports = {
  name: "error",
  async execute(queue, error) {
    await queue.metadata.channel.send(
      `General player error event: ${error.message}`
    );
    console.log(error);
  },
};
