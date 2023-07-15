const guildRoleCreation = async (guild, roleName, roleColor) => {
  await guild.roles.create({ name: roleName, color: roleColor });
  return;
};
module.exports = guildRoleCreation;
