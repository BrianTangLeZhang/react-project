const express = require("express");
const router = express.Router();
const Anime = require("../models/Anime");
const Like = require("../models/Like");
const auth = require("../middleware/auth");
const Dislike = require("../models/Dislike");

//DISLIKE AND UNDISLIKE
router.post("/:id", auth, async (req, res) => {
  try {
    const anime = await Anime.findById(req.params.id);
    if (!anime) return res.json({ msg: "Anime not found" });

    let disliked = await Dislike.findOne({
      user: req.user._id,
      anime: req.params.id,
    });
    const liked = await Like.findOne({
      user: req.user._id,
      anime: req.params.id,
    });
    if (liked) {
      return res.json({ msg: "You already liked this anime", isError: true });
    } else if (!disliked && !liked) {
      let dislike = await Dislike.create({
        user: req.user._id,
        anime: req.params.id,
      });
      anime.dislikes.push({ disliker: dislike.user });
      await anime.save();
      return res.json({ msg: "You disliked this anime", anime });
    } else if (disliked) {
      const updatedAnime = await Anime.findByIdAndUpdate(
        req.params.id,
        { $pull: { dislikes: { disliker: { _id: req.user._id } } } },
        { new: true }
      );
      await Dislike.findOneAndDelete({
        user: req.user._id,
        anime: req.params.id,
      });
      return res.json({ msg: "You undislike this anime", updatedAnime });
    }
  } catch (e) {
    return res.status(400).json({ error: e.message });
  }
});

module.exports = router;
