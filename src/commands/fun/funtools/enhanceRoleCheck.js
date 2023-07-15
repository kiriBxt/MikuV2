const guildHasRoleName = require("../../../guildhelper/guildHasRoleName");

const enhanceRoleCheck = (guild) => {
  let missingRoles = [];
  const tierList = [
    "Tier 1",
    "Tier 2",
    "Tier 3",
    "Tier 4",
    "Tier 5",
    "Tier 6",
    "Tier 7",
    "Tier 8",
    "Tier 9",
    "Tier 10",
  ];
  tierList.forEach((role) => {
    if (!guildHasRoleName(guild, role)) {
      missingRoles.push(role);
    }
  });
  return missingRoles;
};
module.exports = enhanceRoleCheck;
