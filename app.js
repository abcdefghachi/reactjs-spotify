const express = require("express");
const app = express();
require("dotenv/config");

const cors = require("cors");
const { default: mongoose } = require("mongoose");

app.use(cors({ origin: true }));
app.use(express.json());

app.get("/", (req, res) => {
  return res.json("Hi there");
});

// user authentication route
const userRoute = require("./server/routes/auth");
app.use("/api/users/", userRoute);

// Artist Routes
const artistsRoutes = require("./server/routes/artists");
app.use("/api/artists/", artistsRoutes);

// Albums Routes
const albumsRoute = require("./server/routes/albums");
app.use("/api/albums/", albumsRoute);

// Songs Routes
const songsRoutes = require("./server/routes/songs");
app.use("/api/songs/", songsRoutes);

mongoose.connect(process.env.DB_STRING, { useNewUrlParser: true });
mongoose.connection
  .once("open", () => console.log("Connected"))
  .on("error", (error) => {
    console.log(`Error: ${error}`);
  });

app.listen(4000, () => console.log("Listen to port 4000"));
