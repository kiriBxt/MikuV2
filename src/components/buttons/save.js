const {
  isInArray,
  numToRole,
} = require("../../commands/fun/tools/enhanceTools");
const { getProfile } = require("../../tools/economy");

const wait = require("node:timers/promises").setTimeout;
module.exports = {
  data: {
    name: `save`,
  },
  async execute(interaction, client) {
    const { message, member, guild, user } = interaction;
    if (interaction.user.id != message.embeds[0].footer.text)
      return interaction.reply({ content: "Nanana", ephemeral: true });
    const { enhanceUserList } = client;
    await message.delete();

    if (isInArray(enhanceUserList, member.id)) {
      let index = enhanceUserList.indexOf(member.id);
      enhanceUserList.splice(index, 1);
    }

    let embedFields = message.embeds[0].fields;

    let bal = parseInt(embedFields[3].value);
    let tier = parseInt(embedFields[0].value.replace(/[^0-9]/g, ""));

    let userProfile = await getProfile(user);
    userProfile.userTier = tier;
    userProfile.userBal = bal;
    userProfile.save().catch(console.error);

    let role = guild.roles.cache.find(
      (role) => role.name == embedFields[0].value
    );

    await member.roles.add(role);

    await interaction.reply({
      content: "Game closed and role saved!",
      ephemeral: true,
    });
    await wait(5000);
    await interaction.deleteReply();
  },
};
