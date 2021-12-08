const express = require("express");
const router = express.Router();
const { Games } = require("../models");

const { validateToken } = require("../middlewares/AuthMiddleware");

router.get("/", async(req, res) => {
    const listOfGames = await Games.findAll({ order: [['dateTime', 'ASC']]});
    res.json({ listOfGames: listOfGames} );
});

router.post("/", validateToken, async (req, res) => {
    const game = req.body;
    await Games.create(game);
    res.json(game);
});

router.put("/score", validateToken, async (req, res) => {
  const { newScore, id } = req.body;
  await Games.update({ gameScore: newScore }, { where: { id: id } });
  res.json(newScore);
});

router.delete("/:gameId", validateToken, async (req, res) => {
  const gameId = req.params.gameId;

  await Games.destroy({
    where: {
      id: gameId,
    },
  });

  res.json("DELETED SUCCESSFULLY");
});

module.exports = router;
  