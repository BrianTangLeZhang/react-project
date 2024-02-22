const mongoose = require("mongoose");

const ListSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  favourites: [
    {
      anime: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Anime",
      },
      _id: false,
    },
  ],
});

module.exports = mongoose.model("List", ListSchema);
