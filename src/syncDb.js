const Guild = require("./models/guild");
const User = require("./models/user");

Guild.sync({ alter: true });
User.sync({ alter: true });
