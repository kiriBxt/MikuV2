const User = require("../models/user");
const fetchUser = async (userId) => {
  return await User.findOne({ where: { id: userId } });
};
module.exports = fetchUser;
