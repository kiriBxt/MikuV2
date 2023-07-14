module.exports = function game(chance, tier) {
  const num = Math.floor(Math.random() * 101);

  let tierNum = parseInt(tier.replace(/[^0-9]/g, ""));

  if (chance * 100 >= num) {
    return `Tier ${tierNum + 1}`;
  } else if (tierNum == 1) return `Tier 1`;

  return `Tier ${tierNum - 1}`;
};
