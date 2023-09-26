module.exports = {
  name: "disconnect",
  async execute(queue) {
    await queue.metadata.channel.send(
      "Looks like my job here is done, leaving now!"
    );
  },
};
