const guildGetRoleName = (guild, roleName) => {
  return guild.roles.cache.find((role) => role.name == roleName);
};
module.exports = guildGetRoleName;
