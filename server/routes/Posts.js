const express = require("express");
const router = express.Router();
const { Posts } = require("../models");

const { validateToken } = require("../middlewares/AuthMiddleware");

router.get("/", async(req, res) => {
    const listOfPosts = await Posts.findAll();
    res.json({ listOfPosts: listOfPosts});
});

router.get("/byId/:id", async (req, res) => {
    const id = req.params.id;
    const post = await Posts.findByPk(id);
    res.json(post);
});

router.post("/", validateToken, async (req, res) => {
    const post = req.body;
    await Posts.create(post);
    res.json(post);
});

router.delete("/:postId", validateToken, async (req, res) => {
    const postId = req.params.postId;
    await Posts.destroy({
      where: {
        id: postId,
      },
    });
  
    res.json("DELETED SUCCESSFULLY");
  });

module.exports = router;