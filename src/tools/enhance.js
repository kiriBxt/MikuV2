const { getProfile, getBal, getTier } = require("./economy");

async function enhancePromote(user) {
  let userProfile = await getProfile(user);
  if (userProfile.userTier == 10) return;
  userProfile.userTier++;
  userProfile.save().catch(console.error);
}
async function enhanceDemote(user) {
  let userProfile = await getProfile(user);
  if (userProfile.userTier == 1) return;
  userProfile.userTier--;
  userProfile.save().catch(console.error);
}

function getCost(tier) {
  switch (tier) {
    case 1:
      return 100;
    case 2:
      return 200;
    case 3:
      return 300;
    case 4:
      return 500;
    case 5:
      return 600;
    case 6:
      return 700;
    case 7:
      return 1000;
    case 8:
      return 1500;
    case 9:
      return 3000;
    case 10:
      return 300000;
    default:
      return "out of bounds!";
  }
}

function getChance(tier) {
  switch (tier) {
    case 1:
      return 0.9;
    case 2:
      return 0.8;
    case 3:
      return 0.7;
    case 4:
      return 0.6;
    case 5:
      return 0.5;
    case 6:
      return 0.4;
    case 7:
      return 0.3;
    case 8:
      return 0.1;
    case 9:
      return 0.05;
    case 10:
      return 0.0001;
    default:
      return "out of bounds!";
  }
}
async function game(user) {
  let tier = await getTier(user);
  let bal = await getBal(user);
  if (bal < getCost(tier)) {
    return;
  }
  const num = Math.floor(Math.random() * 101);
  if (getChance(tier) * 100 >= num) {
    await enhancePromote(user);
    return tier + 1;
  } else {
    await enhanceDemote(user);
    if (tier == 1) return 1;
    return tier - 1;
  }
}

module.exports = { enhancePromote, enhanceDemote, getChance, getCost, game };
