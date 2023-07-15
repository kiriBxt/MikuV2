const guildRoleCreation = async (guild, roleName, roleColor) => {
  await guild.roles.create({ name: roleName, color: roleColor });
  console.log("role " + roleName + " created!");
  return;
};
module.exports = guildRoleCreation;
