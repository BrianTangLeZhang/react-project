const express = require("express");
const router = express.Router();
const Anime = require("../models/Anime");
const Like = require("../models/Like");
const auth = require("../middleware/auth");
const Dislike = require("../models/Dislike");

//LIKE AND UNLIKE
router.post("/:id", auth, async (req, res) => {
  try {
    const anime = await Anime.findById(req.params.id);
    if (!anime) return res.json({ msg: "Anime not found" });
    let liked = await Like.findOne({
      user: req.user._id,
      anime: req.params.id,
    });
    let disliked = await Dislike.findOne({
      user: req.user._id,
      anime: req.params.id,
    });
    if (disliked) {
      return res.json({ msg: "You already disliked this anime", isError: true});
    } else if (!liked && !disliked) {
      let like = await Like.create({
        user: req.user._id,
        anime: req.params.id,
      });
      anime.likes.push({ liker: like.user });
      await anime.save();
      return res.json({ msg: "You liked this anime", anime });
    } else if (liked) {
      const updatedAnime = await Anime.findByIdAndUpdate(
        req.params.id,
        { $pull: { likes: { liker: { _id: req.user._id } } } },
        { new: true }
      );
      await Like.findOneAndDelete({ user: req.user._id, anime: req.params.id });
      return res.json({ msg: "You unlike the anime", updatedAnime });
    }
  } catch (e) {
    return res.status(400).json({ error: e.message });
  }
});

module.exports = router;
