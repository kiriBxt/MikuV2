const Sequelize = require("sequelize");
const sequelize = require("../util/database");

const User = sequelize.define("user", {
  id: { type: Sequelize.STRING, primaryKey: true },
  name: { type: Sequelize.STRING, allowNull: true },
  money: { type: Sequelize.INTEGER, allowNull: false, defaultValue: 0 },
  xp: { type: Sequelize.INTEGER, allowNull: false, defaultValue: 0 },
  xpNeeded: { type: Sequelize.INTEGER, allowNull: false, defaultValue: 0 },
  level: { type: Sequelize.INTEGER, allowNull: false, defaultValue: 0 },
  tier: { type: Sequelize.STRING, allowNull: false, defaultValue: "Tier 1" },
  rep: { type: Sequelize.INTEGER, allowNull: false, defaultValue: 0 },
});

module.exports = User;
