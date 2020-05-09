const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const passport = require("passport");

const Release = require("../../models/Release");
const validateNewReleaseInput = require("../../validation/release");

// Get all releases
router.get("/", (req, res) => {
  Release.find()
    .sort({ createdAt: -1 })
    .then(releases => res.json(releases))
    .catch(err =>
      res.status(404).json({ noReleasesFound: "No releases found" })
    );
});

// Get a single release
router.get("/:id", (req, res) => {
  Release.findById(req.params.id)
    .then(release => res.json(release))
    .catch(err => res.status(404).json({ noReleaseFound: "No release found" }));
});

// Get all releases by personnel
router.get("/personnel/:personnel_id", (req, res) => {
  Release.find({ "personnel.personnelId": req.params.personnel_id })
    .then(releases => res.json(releases))
    .catch(err =>
      res.status(404).json({ noReleasesFound: "No releases found" })
    );
});

router.post(
  "/",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const { errors, isValid } = validateNewReleaseInput(req.body);

    if (!isValid) return res.status(400).json(errors);

    const newRelease = new Release({
      ...req.body,
    });

    newRelease.save().then(release => res.json(release));
  }
);

module.exports = router;
