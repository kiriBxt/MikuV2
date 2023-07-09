const { InteractionType, EmbedBuilder } = require("discord.js");

module.exports = {
  name: "interactionCreate",
  async execute(interaction, client) {
    if (interaction.isChatInputCommand()) {
      const { commands, cooldowns } = client;
      const { commandName } = interaction;
      const command = commands.get(commandName);
      if (!command) return;

      if (!cooldowns.has(command.data.name)) {
        cooldowns.set(command.data.name, client.cooldowns);
      }

      const now = Date.now();
      const timestamps = cooldowns.get(command.data.name);
      const defaultCooldownDuration = 3;
      const cooldownAmount =
        (command.cooldown ?? defaultCooldownDuration) * 1000;

      if (timestamps.has(interaction.user.id)) {
        const expirationTime =
          timestamps.get(interaction.user.id) + cooldownAmount;

        if (now < expirationTime) {
          const expiredTimestamp = Math.round(expirationTime / 1000);
          return interaction.reply({
            content: `Please wait, you are on a cooldown for \`${command.data.name}\`. You can use it again <t:${expiredTimestamp}:R>.`,
            ephemeral: true,
          });
        }
      }

      timestamps.set(interaction.user.id, now);
      setTimeout(() => timestamps.delete(interaction.user.id), cooldownAmount);

      try {
        await command.execute(interaction, client);
      } catch (error) {
        console.error(error);
        await interaction.reply({
          content: `something went wrong...chatInputCommand`,
          ephemeral: true,
        });
      }
    } else if (interaction.isButton()) {
      const { buttons } = client;
      const { customId } = interaction;
      const button = buttons.get(customId);

      let buttonRoles = [];

      interaction.guild.roles.cache.forEach((role) =>
        buttonRoles.push(role.id)
      );

      if (buttonRoles.includes(customId)) {
        const memberRoles = interaction.member._roles;
        const role = interaction.guild.roles.cache.get(customId);
        if (memberRoles.includes(role.id) === true) {
          const embed = new EmbedBuilder().setTitle(
            `Rolle: ${role.name} entfernt`
          );
          try {
            await interaction.member.roles.remove(role);
          } catch (error) {
            return interaction.reply(error.message);
          }

          return await interaction.reply({
            embeds: [embed],
            ephemeral: true,
          });
        }
        const embed = new EmbedBuilder().setTitle(
          `Rolle: ${role.name} hinzugefügt`
        );
        try {
          await interaction.member.roles.add(role);
        } catch (error) {
          return interaction.reply(error.message);
        }

        await interaction.reply({
          embeds: [embed],
          ephemeral: true,
        });
      }

      if (!button) return new Error("there is no code for this button");
      try {
        await button.execute(interaction, client);
      } catch (error) {
        console.error(error);
      }
    } else if (interaction.isStringSelectMenu()) {
      const { selectMenus } = client;
      const { customId } = interaction;
      const menu = selectMenus.get(customId);
      if (!menu) return new Error("there is no code for this menu");
      try {
        await menu.execute(interaction, client);
      } catch (error) {
        console.error(error);
      }
    } else if (interaction.type == InteractionType.ModalSubmit) {
      const { modals } = client;
      const { customId } = interaction;
      const modal = modals.get(customId);
      if (!modal) return new Error("modal not found");
      try {
        await modal.execute(interaction, client);
      } catch (error) {
        console.error(error);
      }
    }
  },
};
