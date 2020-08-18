const express = require("express");
const router = express.Router();
const Wms = require("./../models/Wms.js");
const Reseller = require("./../models/Reseller.js");
const Mokam = require("./../models/Mokam.js");
const RedX = require("./../models/RedX.js");
const Stores = require("./../models/Stores.js");

router.get("/date/:date", async (req, res) => {
  const resultObject = {};
  // based on the date fetch the data from all databases

  const wms_records = await Wms.find({ filter_date: req.params.date });
  const reseller_records = await Reseller.find({
    filter_date: req.params.date,
  });

  const mokam_records = await Mokam.find({
    filter_date: req.params.date,
  });

  const redx_records = await RedX.find({
    filter_date: req.params.date,
  });

  const stores_records = await Stores.find({
    filter_date: req.params.date,
  });

  const allRecords = [
    wms_records,
    reseller_records,
    mokam_records,
    redx_records,
    stores_records,
  ];

  const results = await res.json({
    report_date: new Date(),
    total_tests: aggregateTotalTests(allRecords),
    total_fail_tests: aggregatedTotalFailedtests(allRecords),
    total_pass_tests: aggregatedTotalPassedtests(allRecords),
    total_skip_tests: aggregatedTotalSkippedtests(allRecords),
    fail_percentage: failPercentage(allRecords),
    pass_percentage: passPercentage(allRecords),
    skip_percentage: skipPercentage(allRecords),
    wms_ui: wmsUiTotalTests(wms_records),
    reseller_ui: resellerUiTotalTests(reseller_records),
    mokam_ui: mokamUiTotalTests(mokam_records),
    redx_ui: redxUiTotalTests(redx_records),
    stores_ui: storesUiTotalTests(stores_records),
    duration: aggregateDuration(allRecords),
  });
});

function aggregateDuration(allRecords) {
  let dur = 0;
  allRecords.filter((item) => {
    item.filter((itemData) => {
      dur += itemData.duration;
    });
  });
  const min = Math.floor((dur / 1000 / 60) << 0);
  const sec = Math.floor((dur / 1000) % 60);
  return min + "m" + sec + "sec";
}

function aggregateTotalTests(allRecords) {
  let tt = 0;
  allRecords.filter((item) => {
    item.filter((itemData) => {
      tt += itemData.total_tests;
    });
  });
  return tt;
}

function aggregatedTotalFailedtests(allRecords) {
  let total_fail_tests = 0;
  allRecords.filter((item) => {
    item.filter((itemData) => {
      total_fail_tests += itemData.fail_count;
    });
  });
  return total_fail_tests;
}

function aggregatedTotalPassedtests(allRecords) {
  let total_pass_tests = 0;
  allRecords.filter((item) => {
    item.filter((itemData) => {
      total_pass_tests += itemData.pass_count;
    });
  });
  return total_pass_tests;
}

function aggregatedTotalSkippedtests(allRecords) {
  let total_skip_tests = 0;
  allRecords.filter((item) => {
    item.filter((itemData) => {
      total_skip_tests += itemData.skip_count;
    });
  });
  return total_skip_tests;
}

function passPercentage(allRecords) {
  let pass_percentage = 0;
  let item_counter = 0;
  allRecords.filter((item) => {
    item.filter((itemData) => {
      pass_percentage += itemData.pass_percentage;
      item_counter++;
    });
  });
  return roundNumber(pass_percentage / item_counter, 2);
}

function failPercentage(allRecords) {
  let fail_percentage = 0;
  let item_counter = 0;
  allRecords.filter((item) => {
    item.filter((itemData) => {
      fail_percentage += itemData.fail_percentage;
      item_counter++;
    });
  });
  return roundNumber(fail_percentage / item_counter, 2);
}

function skipPercentage(allRecords) {
  let skip_percentage = 0;
  let item_counter = 0;
  allRecords.filter((item) => {
    item.filter((itemData) => {
      skip_percentage += itemData.skip_percentage;
      item_counter++;
    });
  });
  return roundNumber(skip_percentage / item_counter, 2);
}

function wmsUiTotalTests(wms_records) {
  let wms_total_test = 0;
  wms_records.filter((item) => {
    wms_total_test += item.total_tests;
  });
  //console.log(wms_total_test);
  return wms_total_test;
}

function resellerUiTotalTests(reseller_records) {
  let reseller_total_test = 0;
  reseller_records.filter((item) => {
    reseller_total_test += item.total_tests;
  });
  //console.log(reseller_total_test);
  return reseller_total_test;
}

function mokamUiTotalTests(mokam_records) {
  let mokam_total_test = 0;
  mokam_records.filter((item) => {
    mokam_total_test += item.total_tests;
  });
  //console.log(mokam_total_test);
  return mokam_total_test;
}

function redxUiTotalTests(redx_records) {
  let redx_total_test = 0;
  redx_records.filter((item) => {
    redx_total_test += item.total_tests;
  });
  //console.log(redx_total_test);
  return redx_total_test;
}

function storesUiTotalTests(stores_records) {
  let stores_total_test = 0;
  stores_records.filter((item) => {
    stores_total_test += item.total_tests;
  });
  //console.log(stores_total_test);
  return stores_total_test;
}

function roundNumber(num, scale) {
  if (!("" + num).includes("e")) {
    return +(Math.round(num + "e+" + scale) + "e-" + scale);
  } else {
    var arr = ("" + num).split("e");
    var sig = "";
    if (+arr[1] + scale > 0) {
      sig = "+";
    }
    return +(
      Math.round(+arr[0] + "e" + sig + (+arr[1] + scale)) +
      "e-" +
      scale
    );
  }
}

module.exports = router;
