const express = require("express");
const router = express.Router();
const passport = require("passport");
const escapeStringRegexp = require("escape-string-regexp");
const FuzzySet = require("fuzzyset");

const { RecordNotFoundError } = require("../../validation/errors");

const Personnel = require("../../models/Personnel");
const Release = require("../../models/Release");

// GET records based on query
router.get("/", async (req, res, next) => {
  const escapedQueryString = escapeStringRegexp(req.query.keyword);
  const recordType = req.query.type;

  const recordsFound = await getCombinedRecordsObjectSwitch(
    recordType,
    escapedQueryString
  );

  const stringsOnly = Object.keys(recordsFound["personnel"]).concat(
    Object.keys(recordsFound["releases"])
  );

  console.log(stringsOnly);
  if (stringsOnly.length < 1) return res.json([]);

  const fuzzyStrings = FuzzySet(
    stringsOnly,
    false,
    escapedQueryString.length,
    escapedQueryString.length
  )
    .get(escapedQueryString, null, 0)
    .map(item => item[1]);

  const outputRecords = [];
  fuzzyStrings.forEach(string => {
    if (recordsFound.personnel[string])
      outputRecords.push(recordsFound.personnel[string]);
    if (recordsFound.releases[string])
      outputRecords.push(recordsFound.releases[string]);
  });

  res.json(outputRecords.slice(0, 25));
});

const getCombinedRecordsObjectSwitch = async function (recordType, query) {
  switch (recordType) {
    case "personnel": {
      const personnelRecords = await Personnel.find({
        name: { $regex: ".*" + query + ".*", $options: "i" },
      }).limit(50);

      const personnelObject = {};

      personnelRecords.forEach(rec => (personnelObject[rec.name] = rec));

      const combinedRecords = {
        personnel: personnelObject,
        releases: {},
      };
      return combinedRecords;
    }
    case "release": {
      const releaseRecords = await Release.find({
        title: { $regex: ".*" + query + ".*", $options: "i" },
      }).populate("mainArtists");

      const releaseObj = {};

      releaseRecords.forEach(rec => (releaseObj[rec.title] = rec));

      const combinedRecords = {
        personnel: {},
        releases: releaseObj,
      };
      return combinedRecords;
    }
    default: {
      const personnelSubRecords = await Personnel.find({
        name: { $regex: ".*" + query + ".*", $options: "i" },
      });
      const releaseSubRecords = await Release.find({
        title: { $regex: ".*" + query + ".*", $options: "i" },
      }).populate("mainArtists");

      const releaseObj = {};
      const personnelObject = {};

      releaseSubRecords.forEach(rec => (releaseObj[rec.title] = rec));
      personnelSubRecords.forEach(rec => (personnelObject[rec.name] = rec));

      const combinedRecords = {
        personnel: personnelObject,
        releases: releaseObj,
      };
      return combinedRecords;
    }
  }
};

module.exports = router;
