const express = require("express");
const app = express();
require("dotenv").config();
const { PORT } = process.env;
const connectDB = require("./connection");
const cors = require("cors");

connectDB();
app.use(cors());
app.use(express.json());
app.use(express.static("public"));
app.use(express.static("public2"));
app.use("/users", require("./controllers/users"));
app.use("/animes", require("./controllers/animes"));
app.use("/lists", require("./controllers/lists"));
app.use("/likes", require("./controllers/likes"));
app.use("/dislikes", require("./controllers/dislike"));
app.use("/episodes", require("./controllers/episodes"));
app.listen(PORT, console.log("App is running on PORT : " + PORT));
