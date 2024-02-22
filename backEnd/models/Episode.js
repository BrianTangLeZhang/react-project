const mongoose = require("mongoose");

const EpisodeSchema = new mongoose.Schema({
  name: { type: String, require: true },
  video: { type: String },
  anime: { type: mongoose.Schema.Types.ObjectId, ref: "Anime" },
  upload_date: { type: Date, default: Date.now() },
});

module.exports = mongoose.model("Episode", EpisodeSchema);
