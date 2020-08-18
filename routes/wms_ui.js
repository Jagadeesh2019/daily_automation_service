const express = require("express");
const Wms = require("./../models/Wms");

const router = express.Router();

router.get("/:wmsRecordId", async (req, res) => {
  const record = await Wms.findById(req.params.wmsRecordId);
  try {
    res.json(record);
  } catch (error) {
    res.json(error);
  }
});

router.get("/", async (req, res) => {
  const records = await Wms.find();
  try {
    res.json(records);
  } catch (error) {
    res.json(error);
  }
});

router.post("/", async (req, res) => {
  const testRecord = new Wms({
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
    const savedPost = await testRecord.save();
    res.json({
      message: "test record created successfully",
      id: savedPost._id,
    });
  } catch (error) {
    res.json(error);
  }
});

router.get("/date/:date", async (req, res) => {
  const records = await Wms.find({ filter_date: req.params.date });
  try {
    res.json(records);
  } catch (error) {
    res.json(error);
  }
});

module.exports = router;
