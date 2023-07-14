const cost = (tier) => {
  switch (tier) {
    case "Tier 1":
      return 100;
    case "Tier 2":
      return 200;
    case "Tier 3":
      return 300;
    case "Tier 4":
      return 500;
    case "Tier 5":
      return 600;
    case "Tier 6":
      return 700;
    case "Tier 7":
      return 1000;
    case "Tier 8":
      return 1500;
    case "Tier 9":
      return 3000;
    default:
      return "out of bounds!";
  }
};
module.exports = cost;
