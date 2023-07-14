const Sequelize = require("sequelize");
const sequelize = require("../util/database");

const Guild = sequelize.define("guild", {
  id: { type: Sequelize.STRING, primaryKey: true },
  name: { type: Sequelize.STRING, allowNull: true },
  welcomeChannelId: { type: Sequelize.STRING, allowNull: true },
  welcomeChannelName: { type: Sequelize.STRING, allowNull: true },
  welcomeRoleId: { type: Sequelize.STRING, allowNull: true },
  welcomeRoleName: { type: Sequelize.STRING, allowNull: true },
  verifyRoleId: { type: Sequelize.STRING, allowNull: true },
  verifyRoleName: { type: Sequelize.STRING, allowNull: true },
});

module.exports = Guild;
