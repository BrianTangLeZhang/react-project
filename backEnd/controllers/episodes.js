const express = require("express");
const router = express.Router();
const Anime = require("../models/Anime");
const Episode = require("../models/Episode");
const auth = require("../middleware/auth");
const multer = require("multer"); //handle file upload
const fs = require("fs"); //allows you to read and write on the file system
const path = require("path"); //allows you to change directors
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./public2");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

const uploadVideo = multer({ storage }).single("video");

//ADD EPISODE TO EACH ANIME
router.post("/:id", auth, uploadVideo, async (req, res) => {
  try {
    const anime = await Anime.findById(req.params.id);
    if (!anime) return res.json({ msg: "Anime not found" });

    let episode = await Episode.create({
      name: req.body.name,
      video: req.file.filename,
      anime: req.params.id,
    });

    anime.episodes.push({ episode: episode });
    await anime.save();

    return res.json({ msg: "Episode uploaded Sucessfully", anime });
  } catch (e) {
    return res.status(400).json({ error: e.message });
  }
});

//GET EPISODE BY ID
router.get("/episode/:id", auth, async (req, res) => {
  try {
    const episode = await Episode.findById(req.params.id);
    return res.json(episode);
  } catch (e) {
    return res.status(400).json({ error: e.message });
  }
});

//GET EPISODE BY ANIME ID
router.get("/:id", auth, async (req, res) => {
  try {
    const episodes = await Episode.find({ anime: req.params.id });
    return res.json(episodes);
  } catch (e) {
    return res.status(400).json({ error: e.message });
  }
});

//DELETE EPISODE
router.delete("/:id", auth, async (req, res) => {
  try {
    if (!req.user.isAdmin) {
      res.status(401).json({ msg: "You are not allowed to delete the anime" });
    }
    const episode = await Episode.findById(req.params.id);
    if (!episode) return res.json({ msg: "Episode not found" });
    if (episode.video) {
      const filename = episode.video;
      const filepath = path.join(__dirname, "../public2/" + filename);
      fs.unlinkSync(filepath);
    }
    const anime = await Anime.findByIdAndUpdate(
      episode.anime,
      { $pull: { episodes: { episode: { _id: req.params.id } } } },
      { new: true }
    );
    await Episode.findByIdAndDelete(req.params.id);
    return res.json({ msg: "Delete Successfully", anime });
  } catch (e) {
    return res.status(400).json({ error: e.message });
  }
});

//UPDATE EPISODE DETAILS
router.put("/:id", auth, uploadVideo, async (req, res) => {
  try {
    if (!req.user.isAdmin) {
      res.status(401).json({ msg: "You are not allowed to do this" });
    }
    const episode = await Episode.findById(req.params.id);
    if (!episode) return res.json({ msg: "This episode is not found" });
    if (req.file && episode.video) {
      const filename = episode.video;
      const filepath = path.join(__dirname, "../public2/" + filename);
      fs.unlinkSync(filepath);
    }
    const newEpisode = await Episode.findByIdAndUpdate(
      req.params.id,
      {
        ...req.body,
        video: req.file ? req.file.filename : episode.video,
      },
      {
        new: true,
      }
    );
    return res.json({
      episode: newEpisode,
      msg: "Episode updated succesfully.",
    });
  } catch (e) {
    return res.status(400).json({ error: e.message });
  }
});

module.exports = router;
