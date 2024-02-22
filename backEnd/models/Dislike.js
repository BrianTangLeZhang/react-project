const mongoose = require("mongoose");

const DislikeSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  anime: { type: mongoose.Schema.Types.ObjectId, ref: "Anime" },
});

module.exports = mongoose.model("Dislike", DislikeSchema);