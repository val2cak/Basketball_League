
const express = require("express");
const router = express.Router();
const { Clubs } = require("../models");
const { validateToken } = require("../middlewares/AuthMiddleware");

router.get("/", async (req, res) => {
  const listOfClubs = await Clubs.findAll();
  res.json({ listOfClubs: listOfClubs });
});

router.post("/", validateToken, async (req, res) => {
  const club = req.body;
  await Clubs.create(club);
  res.json(club);
});

router.get("/byId/:id", async (req, res) => {
  const id = req.params.id;
  const club = await Clubs.findByPk(id);
  res.json(club);
});

router.delete("/:clubId", validateToken, async (req, res) => {
  const clubId = req.params.clubId;

  await Clubs.destroy({
    where: {
      id: clubId,
    },
  });

  res.json("DELETED SUCCESSFULLY");
});

module.exports = router;