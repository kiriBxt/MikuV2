const { REST, Routes } = require("discord.js");

const fs = require("fs");

module.exports = (client) => {
  client.handleCommands = async () => {
    const CommandFolders = fs.readdirSync("./src/commands");
    const { commands, commandArray } = client;
    for (const folder of CommandFolders) {
      const commandFiles = fs
        .readdirSync(`./src/commands/${folder}`)
        .filter((file) => file.endsWith(".js"));

      for (const file of commandFiles) {
        const command = require(`../../commands/${folder}/${file}`);
        commands.set(command.data.name, command);
        commandArray.push(command.data.toJSON());
      }
    }

    const { APPID, TOKEN } = process.env;
    const rest = new REST({ version: "10" }).setToken(TOKEN);
    try {
      await rest.put(Routes.applicationCommands(APPID), {
        body: commandArray,
      });
      console.log(`Successfully reloaded application (/) commands.`);
    } catch (error) {
      console.error(error);
    }
  };
};
