const express = require("express");
const router = express.Router();
const http = require("http");
const fs = require("fs");
//const htmlData = require("./../index.html");

router.get("/index.html", (req, res) => {
  //res.json({ message: "This is Root1" });
  res.writeHead(200, {
    "Content-Type": "text/html",
  });
  fs.readFile("./index.html", null, function (error, data) {
    if (error) {
      res.writeHead(404);
      res.write("Whoops! File not found!");
    } else {
      res.write(data);
    }
    res.end();
  });
});

module.exports = router;
