const express = require("express");
const app = express();
app.use(express.json()); // Middleware to parse JSON

// In-memory data store
let posts = [
  { id: 1, title: "First Post", content: "Hello world!" },
];

// GET all posts
app.get("/posts", (req, res) => {
  res.json(posts);
});

// GET single post by ID
app.get("/posts/:id", (req, res) => {
  const post = posts.find(p => p.id == req.params.id);
  post ? res.json(post) : res.status(404).send("Post not found");
});

// POST new post
app.post("/posts", (req, res) => {
  const newPost = { id: posts.length + 1, ...req.body };
  posts.push(newPost);
  res.status(201).json(newPost);
});

// PUT update post
app.put("/posts/:id", (req, res) => {
  const post = posts.find(p => p.id == req.params.id);
  if (post) {
    post.title = req.body.title || post.title;
    post.content = req.body.content || post.content;
    res.json(post);
  } else {
    res.status(404).send("Post not found");
  }
});

// DELETE post
app.delete("/posts/:id", (req, res) => {
  posts = posts.filter(p => p.id != req.params.id);
  res.send("Post deleted");
});

app.listen(3000, () => {
  console.log("Blog API running on http://localhost:3000");
});
