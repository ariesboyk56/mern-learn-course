const express = require("express");
const router = express.Router();
const verifyToken = require("../middleware/auth");

const Post = require("../models/Post");

// @router GET api/posts
// @desc Get post
// @success Private
router.get("/", verifyToken, async (req, res) => {
  try {
    const posts = await Post.find({ author: req.userId }).populate("author", [
      "username",
    ]);
    res.json({ success: true, posts });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
});

// @router POST api/posts
// @desc Create post
// @success Private
router.post("/", verifyToken, async (req, res) => {
  const { title, description, url, status } = req.body;

  //Simple validation
  if (!title)
    return res
      .status(400)
      .json({ success: false, message: "Title is required" });

  try {
    const newPost = new Post({
      title,
      description,
      url: url.startsWith("https://") ? url : `https://${url}`,
      status: status || "TOLEARN",
      author: req.userId,
    });
    await newPost.save();

    res.json({
      success: true,
      message: "Post created successfully !",
      post: newPost,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
});

// @router PUT api/posts
// @desc Put post
// @success Private
router.put("/:id", verifyToken, async (req, res) => {
  const { title, description, url, status } = req.body;

  //Simple Validation
  if (!title)
    return res
      .status(400)
      .json({ success: false, message: "Title is required" });

  try {
    let updatedPost = {
      title,
      description: description || "",
      url: (url.startsWith("https://") ? url : `https://${url}`) || "",
      status: status || "TOLEARN",
    };

    const postUpdateCondition = { _id: req.params.id, author: req.userId };

    updatedPost = await Post.findOneAndUpdate(
      postUpdateCondition,
      updatedPost,
      { new: true }
    );

    //User not authorized to update post or post not found
    if (!updatedPost)
      return res.status(401).json({
        success: false,
        message: "Post not found or user not authorized",
      });
    res.json({ success: true, message: "Excellent progress !", post: updatedPost });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
});


// @router DELETE api/posts
// @desc DELETE post
// @success Private
router.delete("/:id", verifyToken, async(req, res)=> {
  try {
    const postDeleteCondition = {_id: req.params.id, author: req.userId}
    const deletePost = await Post.findOneAndDelete(postDeleteCondition)
  
    //User not authorized to delete post or post not found
    if(!deletePost)
      return res
        .status(401)
        .json({success: false, message: "User not authorized to delete post or post not found"})
    res.json({
      success: true, message: "Excellent progress !", post: deletePost
    })
  } catch (error) {
    console.log(error);
    res.status(500).json({success:false, message: "Interval server error"})
  }
})


module.exports = router;
