const mongoose = require("mongoose");

const AnimeSchema = new mongoose.Schema({
  image: { type: String },
  background: { type: String },
  name: { type: String, require: true },
  description: { type: String, require: true },
  episodes: [
    {
      episode: { type: mongoose.Schema.Types.ObjectId, ref: "Episode" },
      _id: false,
    },
  ],
  likes: [
    {
      liker: { type: mongoose.Schema.Types.ObjectId, ref: "Like" },
      _id: false,
    },
  ],
  dislikes: [
    {
      disliker: { type: mongoose.Schema.Types.ObjectId, ref: "Dislike" },
      _id: false,
    },
  ],
  upload_date: { type: Date, default: Date.now() },
  isActive: { type: Boolean, default: true },
  OnlyVIP: { type: Boolean, default: false },
});

module.exports = mongoose.model("Anime", AnimeSchema);
