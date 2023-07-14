const chance = (tier) => {
  switch (tier) {
    case "Tier 1":
      return 0.8;
    case "Tier 2":
      return 0.7;
    case "Tier 3":
      return 0.6;
    case "Tier 4":
      return 0.5;
    case "Tier 5":
      return 0.4;
    case "Tier 6":
      return 0.3;
    case "Tier 7":
      return 0.2;
    case "Tier 8":
      return 0.1;
    case "Tier 9":
      return 0.05;
    default:
      return "out of bounds!";
  }
};
module.exports = chance;
