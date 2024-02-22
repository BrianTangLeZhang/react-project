const express = require("express");
const router = express.Router();
const Anime = require("../models/Anime");
const Episode = require("../models/Episode");
const List = require("../models/List");
const auth = require("../middleware/auth");
const multer = require("multer"); //handle file upload
const fs = require("fs"); //allows you to read and write on the file system
const path = require("path"); //allows you to change directors

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const destination =
      file.fieldname === "image" ? "./public/image" : "./public/background";
    cb(null, destination);
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

const uploadImg = multer({ storage });

//ADD ANIME
router.post(
  "/",
  auth,
  uploadImg.fields([
    { name: "image", maxCount: 1 },
    { name: "background", maxCount: 1 },
  ]),
  async (req, res) => {
    try {
      if (!req.user.isAdmin)
        return res.status(400).json({ msg: "You are not allowed to do this" });
      let anime = new Anime(req.body);
      anime.image = req.files["image"][0].filename;
      anime.background = req.files["background"][0].filename;
      anime.save();
      return res.json({ anime, msg: "Anime uploaded Successfully" });
    } catch (e) {
      return res.status(400).json({ error: e.message });
    }
  }
);

//SHOW ALL ANIME ON PAGE
router.get("/", async (req, res) => {
  try {
    const animes = await Anime.find({ OnlyVIP: false }).populate("episodes");
    return res.json(animes);
  } catch (e) {
    return res.status(400).json({ error: e.message });
  }
});

router.get("/all", auth, async (req, res) => {
  try {
    const animes = await Anime.find().populate("episodes");
    return res.json(animes);
  } catch (e) {
    return res.status(400).json({ error: e.message });
  }
});

router.get("/vip", auth, async (req, res) => {
  try {
    const animes = await Anime.find({ OnlyVIP: true }).populate("episodes");
    return res.json(animes);
  } catch (e) {
    return res.status(400).json({ error: e.message });
  }
});

//GET ANIME BY ID
router.get("/:id", async (req, res) => {
  try {
    const anime = await Anime.findById(req.params.id).populate({
      path: "episodes.episode",
    });
    if (!anime) return res.json({ msg: "Anime not found" });
    return res.json(anime);
  } catch (e) {
    return res.status(400).json({ error: e.message });
  }
});

//DELETE ANIME
router.delete("/:id", auth, async (req, res) => {
  try {
    if (!req.user.isAdmin) {
      res.status(401).json({ msg: "You are not allowed to delete the Anime" });
    }
    const anime = await Anime.findById(req.params.id);
    anime.likes.length = 0;
    anime.dislikes.length = 0;
    anime.save();
    if (!anime) return res.json({ msg: "Anime not found" });
    if (anime.image) {
      const filepath1 = path.join(__dirname, "../public/image/" + anime.image);
      fs.unlinkSync(filepath1);
    }
    if (anime.background) {
      const filepath2 = path.join(__dirname, "../public/background/" + anime.background);
      fs.unlinkSync(filepath2);
    }
    await Episode.deleteMany({ anime: req.params.id });
    await List.deleteOne({ favourites: { anime: { _id: req.params.id } } });
    await Anime.findByIdAndDelete(req.params.id);
    return res.json({ msg: "Anime deleted succesfully." });
  } catch (e) {
    return res.status(400).json({ error: e.message });
  }
});

//UPDATE ANIME INFO
router.put(
  "/:id",
  auth,
  uploadImg.fields([{ name: "image", maxCount: 1 }]),
  async (req, res) => {
    try {
      if (!req.user.isAdmin) {
        res.status(401).json({ msg: "You are not allowed to do this action" });
      }
      const anime = await Anime.findById(req.params.id);

      if (!anime) return res.json({ msg: "Anime not found" });
      if (req?.files["image"][0] && anime.image) {
        const filepath1 = path.join(
          __dirname,
          "../public/image/" + anime.image
        );
        fs.unlinkSync(filepath1);
      }
      const newAnime = await Anime.findByIdAndUpdate(
        req.params.id,
        {
          ...req.body,
          image: req.files["image"][0]
            ? req.files["image"][0].filename
            : anime.image,
        },
        {
          new: true,
        }
      );
      return res.json({
        anime: newAnime,
        msg: "Anime updated succesfully.",
      });
    } catch (e) {
      return res.status(400).json({ error: e.message });
    }
  }
);

router.patch("/anime/:id", auth, async (req, res) => {
  try {
    if (!req.user.isAdmin)
      return res.json({ msg: "You are not allowed to do this" });
    let anime = await Anime.findById(req.params.id);
    if (!anime) return res.json({ msg: "Anime not found" });
    await Anime.findByIdAndUpdate(req.params.id, {
      OnlyVIP: !anime.OnlyVIP,
    });
    return res.json({ msg: "Anime status has been updated" });
  } catch (e) {
    return res.status(400).json({ error: e.message });
  }
});

router.patch("/:id", auth, async (req, res) => {
  try {
    if (!req.user.isAdmin)
      return res.json({ msg: "You are not allowed to do this" });
    let anime = await Anime.findById(req.params.id);
    if (!anime) return res.json({ msg: "Anime not found" });
    await Anime.findByIdAndUpdate(req.params.id, {
      isActive: !anime.isActive,
    });
    return res.json({ msg: "Anime status has been updated" });
  } catch (e) {
    return res.status(400).json({ error: e.message });
  }
});

module.exports = router;
