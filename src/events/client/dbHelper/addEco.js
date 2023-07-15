const User = require("../../../models/user");

const addEco = async (author) => {
  console.log(author);
  const [user] = await User.findOrCreate({ where: { id: author.id } });
  let name = await user.name;
  let xp = await user.xp;
  let level = await user.level;
  let money = await user.money;
  let levelUp = 100 * level + 100 * 0.5 * level ** 2;
  let nextUp = 100 * (level + 1) + 100 * 0.5 * (level + 1) ** 2;

  xp = xp + Math.floor(Math.random() * 101);
  money = money + Math.floor(Math.random() * 51);

  if (!name) {
    await user.update({
      name: author.username,
    });
  }

  if (xp >= levelUp) {
    level = level + 1;
    levelUp = nextUp;
    money += 1000;
  }

  await user.update({
    money: money,
    xp: xp,
    xpNeeded: levelUp,
    level: level,
  });
};
module.exports = addEco;
