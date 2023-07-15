const enhanceOpenInstance = (enhanceUserList, userId) => {
  return enhanceUserList.some((user) => userId == user.id);
};
module.exports = enhanceOpenInstance;
