const generateRandomHex = require("./generateRanomdHex");

function pass(oldTier, newTier) {
  oldTier = parseInt(oldTier.replace(/[^0-9]/g, ""));
  newTier = parseInt(newTier.replace(/[^0-9]/g, ""));
  if (newTier > oldTier) {
    return "https://cdn.pixabay.com/photo/2020/04/10/13/28/success-5025797_1280.png";
  } else {
    return "https://freepngimg.com/download/fail_stamp/4-2-fail-stamp-transparent.png";
  }
}

function numToRole(num) {
  switch (num) {
    case 1:
      return "Tier 1";
    case 2:
      return "Tier 2";
    case 3:
      return "Tier 3";
    case 4:
      return "Tier 4";
    case 5:
      return "Tier 5";
    case 6:
      return "Tier 6";
    case 7:
      return "Tier 7";
    case 8:
      return "Tier 8";
    case 9:
      return "Tier 9";
    case 10:
      return "Tier 10";
    default:
      return "out of bounds!";
  }
}

function tierInit(guild) {
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
    if (!guild.roles.cache.some((check) => check.name == role)) {
      missingRoles.push(role);
    }
  });
  if (missingRoles.length > 0) {
    missingRoles.forEach(async (role) => {
      await guild.roles.create({ name: role, color: generateRandomHex() });
    });
  }
}

function tierRemover(member) {
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
}

function isInArray(arr, userId) {
  return arr.some((user) => userId == user);
}

module.exports = { isInArray, tierRemover, tierInit, numToRole, pass };
