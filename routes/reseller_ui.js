const express = require("express");
const router = express.Router();
const Reseller = require("./../models/Reseller.js");

router.get("/", async (req, res) => {
  const allRecords = await Reseller.find({});
  try {
    res.json(allRecords);
  } catch (error) {
    res.json(error);
  }
});

router.post("/", async (req, res) => {
  const record = new Reseller({
    duration: req.body.duration,
    total_tests: req.body.total_tests,
    pass_count: req.body.pass_count,
    fail_count: req.body.fail_count,
    skip_count: req.body.skip_count,
    pass_percentage: req.body.pass_percentage,
    fail_percentage: req.body.fail_percentage,
    skip_percentage: req.body.skip_percentage,
    filter_date: req.body.filter_date,
  });

  try {
    const savedPost = await record.save();
    res.json({
      message: "test record created successfully",
      id: savedPost._id,
    });
  } catch (error) {
    res.json(error);
  }
});

module.exports = router;
