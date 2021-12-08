const express = require("express");
const router = express.Router();
const { Players } = require("../models");

const { validateToken } = require("../middlewares/AuthMiddleware");

router.get("/:ClubId", async (req, res) => {
    const ClubId = req.params.ClubId;
    const players = await Players.findAll({ where: { ClubId: ClubId } });
    res.json(players);
  });
  
router.post("/", validateToken, async (req, res) => {
    const player = req.body;
    await Players.create(player);
    res.json(player);
  });

router.post("/", validateToken, async (req, res) => {
    const player = req.body;
    player.ClubId = req.club.id;
    await Players.create(player);
    res.json(player);
  });

router.delete("/:playerId", validateToken, async (req, res) => {
    const playerId = req.params.playerId;
  
    await Players.destroy({
      where: {
        id: playerId,
      },
    });
  
    res.json("DELETED SUCCESSFULLY");
  });

module.exports = router;
  