const express = require("express");
const router = express.Router();
const { getPosts, addPost, updatePost, deletePost } = require("../models/posts");

router.get("/", (req, res) => {
  res.json({ data: getPosts() });
});

router.post("/", (req, res) => {
  const { title, content } = req.body;
  if (!title || !content) return res.status(400).json({ error: "Title and content required" });
  const post = addPost(title, content);
  res.status(201).json({ data: post });
});

router.put("/:id", (req, res) => {
  const { id } = req.params;
  const { title, content } = req.body;
  const post = updatePost(Number(id), title, content);
  if (!post) return res.status(404).json({ error: "Post not found" });
  res.json({ data: post });
});

router.delete("/:id", (req, res) => {
  const { id } = req.params;
  const post = deletePost(Number(id));
  if (!post) return res.status(404).json({ error: "Post not found" });
  res.json({ data: post });
});

module.exports = router;
