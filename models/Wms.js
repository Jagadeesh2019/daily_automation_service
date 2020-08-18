const mongoose = require("mongoose");

const WmsSchema = mongoose.Schema({
  date: {
    type: Date,
    default: Date.now,
  },
  duration: {
    type: String,
    required: true,
  },
  total_tests: {
    type: Number,
    required: true,
  },
  pass_count: {
    type: Number,
    required: true,
  },
  fail_count: {
    type: Number,
    required: true,
  },
  skip_count: {
    type: Number,
    required: true,
  },
  pass_percentage: {
    type: Number,
    required: true,
  },
  fail_percentage: {
    type: Number,
    required: true,
  },
  skip_percentage: {
    type: Number,
    required: true,
  },
  filter_date: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("Wms", WmsSchema);
