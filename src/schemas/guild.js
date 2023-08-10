const { Schema, model } = require("mongoose");

const guildSchema = new Schema({
  _id: Schema.Types.ObjectId,
  guildId: { type: String, required: true },
  guildName: String,
  guildAutoRoles: Array,
  guildVerifyRoleIds: Array,
  guildVerifyRoleNames: Array,
});
module.exports = model("Guild", guildSchema, "guilds");
