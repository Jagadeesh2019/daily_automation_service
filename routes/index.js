const express = require("express");
const router = express.Router();
const http = require("http");
const fs = require("fs");

router.get("/", (req, res) => {
  res.json({ message: "This is Root1" });
});

module.exports = router;
