const express = require("express");
const router = express.Router();
const { getUsers, addUser } = require("../models/users");

router.get("/", (req, res) => {
  res.json({ data: getUsers() });
});

router.post("/", (req, res) => {
  const { username } = req.body;
  if (!username) return res.status(400).json({ error: "Username required" });
  const user = addUser(username);
  res.status(201).json({ data: user });
});

module.exports = router;
