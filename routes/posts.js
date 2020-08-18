const express = require("express");
const router = express.Router();
//Import Models
const Post = require("../models/Post");

router.get("/", async (req, res) => {
  try {
    const posts = await Post.find({});
    res.json(posts);
  } catch (error) {
    res.json({ message: error });
  }
});

router.post("/", async (req, res) => {
  const post = new Post({
    title: req.body.title,
    description: req.body.description,
  });

  try {
    const savedPost = await post.save();
    res.json({
      message: "Post created successfully!!",
      id: savedPost._id,
    });
  } catch (error) {
    res.json({ message: error });
  }
});

//Specific Post
router.get("/:postId", async (req, res) => {
  try {
    const postDetails = await Post.findById(req.params.postId);
    if (postDetails !== null) res.json(postDetails);
    else res.json({ message: "Id deleted" });
  } catch (error) {
    res.json(error);
  }
});

//Delete a specific post
router.delete("/:postId", async (req, res) => {
  try {
    const deleteDetails = await Post.remove({ _id: req.params.postId });
    if (deleteDetails.deletedCount === 0)
      res.json({ message: "record already deleted" });
    res.json(deleteDetails);
  } catch (error) {
    res.json(error);
  }
});

// Update
router.patch("/:postId", async (req, res) => {
  try {
    const updatedPost = await Post.updateOne(
      { _id: req.params.postId },
      { $set: { title: req.body.title } }
    );
    res.json(updatedPost);
  } catch (error) {
    res.json(error);
  }
});

module.exports = router;
