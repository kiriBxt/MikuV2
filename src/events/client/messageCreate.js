const { addXp, getProfile, addBal } = require("../../tools/economy");

module.exports = {
  name: "messageCreate",
  async execute(message) {
    if (message.author.bot) return;
    await addXp(message.author, 10, 30);
    await addBal(message.author, 25, 100);
  },
};
