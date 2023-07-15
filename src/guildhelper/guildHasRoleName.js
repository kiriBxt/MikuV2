const guildHasRoleName = (guild, role) => {
  return guild.roles.cache.some((check) => check.name == role);
};
module.exports = guildHasRoleName;
