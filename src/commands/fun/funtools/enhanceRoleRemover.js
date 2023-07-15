const guildGetRoleName = require("../../../guildhelper/guildGetRoleName");

const enhanceRoleRemover = (member) => {
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

  member.roles.cache.forEach((role) =>
    tierList.find((check) => {
      if (role.name == check) {
        member.roles.remove(role);
      }
    })
  );
};
module.exports = enhanceRoleRemover;
