const express = require("express");
const app = express();
const usersRouter = require("./routes/users");
const postsRouter = require("./routes/posts");

app.use(express.json());

// Mount routers
app.use("/api/users", usersRouter);
app.use("/api/posts", postsRouter);

module.exports = app;
