const User = require("../schemas/user");
const Guild = require("../schemas/guild");
const { mongoose } = require("mongoose");

function currencyconverter(value) {
  return new Intl.NumberFormat("de-DE", {
    style: "currency",
    currency: "EUR",
  }).format(value);
}

function randomIntFromInterval(min, max) {
  // min and max included
  return Math.floor(Math.random() * (max - min + 1) + min);
}

async function getGuildProfile(guild) {
  let guildProfile = await Guild.findOne({ guildId: guild.id });
  if (!guildProfile) {
    guildProfile = new Guild({
      _id: new mongoose.Types.ObjectId(),
      guildId: guild.id,
      guildName: guild.name,
    });
    await guildProfile.save().catch(console.error);
  }
  return guildProfile;
}

async function getProfile(user) {
  let userProfile = await User.findOne({ userId: user.id });
  if (!userProfile) {
    userProfile = new User({
      _id: new mongoose.Types.ObjectId(),
      userId: user.id,
      userName: user.username,
    });
    await userProfile.save().catch(console.error);
  }
  return userProfile;
}

async function getXp(user) {
  let userProfile = await getProfile(user);
  return userProfile.userXp;
}

async function setTier(user, newTier) {
  await User.findOneAndUpdate({ userId: user.id }, { userTier: newTier });
}
async function getTier(user) {
  let userProfile = await User.findOne({ userId: user.id });
  return userProfile.userTier;
}

async function addXp(user, min, max) {
  let userProfile = await getProfile(user);
  userProfile.userXp = userProfile.userXp + randomIntFromInterval(min, max);
  if (userProfile.userXp >= userProfile.userLevel * 100) {
    userProfile.userXp = userProfile.userXp - userProfile.userLevel * 100;
    userProfile.userLevel++;
  }
  await userProfile.save().catch(console.error);
}

async function addBal(user, min, max) {
  let userProfile = await getProfile(user);
  userProfile.userBal = userProfile.userBal + randomIntFromInterval(min, max);
  await userProfile.save().catch(console.error);
}
async function addBalAmount(user, amount) {
  let userProfile = await getProfile(user);
  userProfile.userBal = userProfile.userBal + amount;
  await userProfile.save().catch(console.error);
}

async function setBal(user, newBal) {
  await User.findOneAndUpdate({ userId: user.id }, { userBal: newBal });
}

async function getBal(user) {
  let userProfile = User.findOne({ userId: user.id });
  return userProfile.userBal;
}

module.exports = {
  getProfile,
  getXp,
  setBal,
  getTier,
  getBal,
  addXp,
  addBal,
  setTier,
  getGuildProfile,
  randomIntFromInterval,
  addBalAmount,
  currencyconverter,
};
