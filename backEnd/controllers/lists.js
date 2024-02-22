const express = require("express");
const router = express.Router();
const List = require("../models/List");
const auth = require("../middleware/auth");
const Anime = require("../models/Anime");

//SHOW MY LIST
router.get("/", auth, async (req, res) => {
  try {
    let list = await List.findOne({ user: req.user._id }).populate(
      "favourites.anime"
    );
    if (!list || !list.favourites.length)
      return res.json({ msg: "Try to add some anime you like here" });
    return res.json(list);
  } catch (e) {
    return res.status(400).json({ error: e.message });
  }
});

//ADD TO LIST
router.post("/:id", auth, async (req, res) => {
  try {
    const favAnime = await Anime.findById(req.params.id);
    let list = await List.findOne({ user: req.user._id });
    if (!list) {
      list = await List.create({
        user: req.user._id,
        favourites: [{ anime: favAnime }],
      });
      return res.json({
        msg: "Anime added to list successfully",
        list,
      });
    }
    if (list) {
      const foundAnime = list.favourites.find(
        (fav) => fav.anime._id == req.params.id
      );
      if (!foundAnime) {
        list.favourites.push({ anime: favAnime });
      }
      await list.save();
      return res.json({ msg: "Anime already exists", list });
    }
  } catch (e) {
    return res.status(400).json({ error: e.message });
  }
});

//REMOVE ANIME FORM LIST
router.delete("/:id", auth, async (req, res) => {
  try {
    const list = await List.findOne({ user: req.user._id });
    if (list.user != req.user._id)
      return res.json({ msg: "You are not own this list" });
    list.favourites = list.favourites.filter(
      (fav) => JSON.stringify(fav.anime) != `"${req.params.id}"`
    );

    await list.save();
    return res.json({ msg: "Anime removed", list });
  } catch (e) {
    return res.status(400).json({ error: e.message });
  }
});

//EMPTY LIST
router.delete("/", auth, async (req, res) => {
  try {
    let list = await List.findOne({ user: req.user._id });
    if (!list) return res.json({ msg: "List doesn't exist" });
    await List.findOneAndDelete({ user: req.user._id });
    return res.json({ msg: "List cleared successfully" });
  } catch (e) {
    return res.status(400).json({ error: e.message });
  }
});

module.exports = router;
