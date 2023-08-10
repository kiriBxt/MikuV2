const { Schema, model } = require("mongoose");

const userSchema = new Schema({
  _id: Schema.Types.ObjectId,
  userId: { type: String, required: true },
  userName: String,
  userLevel: { type: Number, default: 1 },
  userBal: { type: Number, default: 50 },
  userXp: { type: Number, default: 0 },
  userTier: { type: Number, default: 1 },
});
module.exports = model("User", userSchema, "users");
