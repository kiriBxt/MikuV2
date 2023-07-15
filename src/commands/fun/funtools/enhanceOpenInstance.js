const enhanceOpenInstance = (enhanceUserList, userId) => {
  return enhanceUserList.some((user) => userId == user);
};
module.exports = enhanceOpenInstance;
