const Guild = require("./models/guild");
const User = require("./models/user");

Guild.sync({ force: true });
User.sync({ force: true });
