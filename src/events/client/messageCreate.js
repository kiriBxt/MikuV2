const addEco = require("./dbHelper/addEco");
module.exports = {
  name: "messageCreate",
  async execute(message) {
    if (message.author.bot) return;

    addEco(message.author);
  },
};
