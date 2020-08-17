const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
  res.send("Control at all users");
});

router.get("/specific", (req, res) => {
  res.send("Control at specific root");
});

module.exports = router;
