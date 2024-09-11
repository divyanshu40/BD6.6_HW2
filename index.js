let express = require("express");
let cors = require("cors");
let { getAllGames, getGameById } = require("./controllers");
let app = express();
app.use(cors());
app.use(express.json());

// Exercise 1: Retrieve All Games
app.get("/games", async (req, res) => {
  try {
    let result = await getAllGames();
    if (result.length === 0) {
      return res.status(404).json({ error: "No games found"});
    }
    return res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ error: "Internal server error"});
  }
});
// Exercise 2: Retrieve Game by ID
app.get("/games/details/:id", async (req, res) => {
  let id = parseInt(req.params.id);
  try {
    let result = await getGameById(id);
    if (! result) {
      return res.status(404).json({ error: "Game not found"});
    }
    return res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ error: "Internal server error"});
  }
});
module.exports = { app };