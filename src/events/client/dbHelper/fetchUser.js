const User = require("../../../models/user");
const fetchUser = (userId) => {
  return User.findOne({ where: { id: userId } });
};
module.exports = fetchUser;
