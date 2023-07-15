const guildGetRoleName = (guild, roleName) => {
  guild.roles.cache.find((role) => role.name == roleName);
};
module.exports = guildGetRoleName;
