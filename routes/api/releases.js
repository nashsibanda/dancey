const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const passport = require("passport");

const joiValidator = require("express-joi-validation").createValidator({
  passError: true,
});

const {
  newReleaseValidation,
  updateReleaseValidation,
} = require("../../validation/release.joiSchema");

const Release = require("../../models/Release");

// GET all releases
router.get("/", (req, res) => {
  Release.find()
    .sort({ createdAt: -1 })
    .then(releases => res.json(releases))
    .catch(err =>
      res.status(404).json({ noReleasesFound: "No releases found" })
    );
});

// GET a single release
router.get("/:id", (req, res) => {
  Release.findById(req.params.id)
    .then(release => res.json(release))
    .catch(err => res.status(404).json({ noReleaseFound: "No release found" }));
});

// GET all releases by personnel
router.get("/personnel/:personnel_id", (req, res) => {
  Release.find({ "personnel.personnelId": req.params.personnel_id })
    .then(releases => res.json(releases))
    .catch(err =>
      res.status(404).json({ noReleasesFound: "No releases found" })
    );
});

// POST a new release
router.post(
  "/",
  passport.authenticate("jwt", { session: false }),
  joiValidator.body(newReleaseValidation),
  (req, res) => {
    const newRelease = new Release({
      ...req.body,
    });

    newRelease.save().then(release => res.json(release));
  }
);

// PUT replacement info for a release
router.put(
  "/:id",
  passport.authenticate("jwt", { session: false }),
  joiValidator.body(updateReleaseValidation),
  (req, res, next) => {
    Release.findById(req.params.id)
      .then(release => {
        Release.findOneAndReplace(
          { _id: release._id },
          Object.assign(
            {},
            release.toObject(),
            { ...req.body },
            { updatedAt: Date.now() }
          ),
          { new: true },
          (err, updatedRelease) => {
            console.log("HELLO");
            if (err) return next(err);

            return res.json(updatedRelease);
          }
        );
      })
      .catch(err => {
        return next(new Error("No release found"));
      });
  }
);

router.delete(
  "/:id",
  passport.authenticate("jwt", { session: false }),
  (req, res, next) => {
    Release.findByIdAndDelete(req.params.id, (err, deletedRelease) => {
      if (err) return next(err);
      return res.json(deletedRelease);
    });
  }
);

module.exports = router;
