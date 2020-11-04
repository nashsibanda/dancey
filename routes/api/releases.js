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

const { RecordNotFoundError } = require("../../validation/errors");

const Release = require("../../models/Release");

// GET all releases
router.get("/", (req, res, next) => {
  const itemsPerPage = parseInt(req.query.itemsPerPage);
  const pageNum = parseInt(req.query.pageNum);

  if (req.query.count) {
    Release.countDocuments()
      .then(releasesCount => res.json(releasesCount))
      .catch(err => next(new RecordNotFoundError("No releases found")));
  } else {
    Release.find()
      .sort({ createdAt: 1 })
      .skip(pageNum > 0 ? (pageNum - 1) * itemsPerPage : 0)
      .limit(itemsPerPage)
      .populate("mainArtists")
      .then(releases => res.json(releases))
      .catch(err => {
        console.log(err);
        next(new RecordNotFoundError("No releases found"));
      });
  }
});

router.get("/random", (req, res, next) => {
  if (req.query.with_image) {
    Release.aggregate([
      { $match: { "images.0": { $exists: true } } },
      {
        $lookup: {
          from: "personnels",
          localField: "mainArtists",
          foreignField: "_id",
          as: "mainArtists",
        },
      },
      { $sample: { size: parseInt(req.query.number) } },
    ])
      .then(releases => res.json(releases))
      .catch(err => {
        console.log(err);
        next(new RecordNotFoundError("No releases found"));
      });
  } else {
    Release.aggregate([
      {
        $lookup: {
          from: "personnels",
          localField: "mainArtists",
          foreignField: "_id",
          as: "mainArtists",
        },
      },
      { $sample: { size: parseInt(req.query.number) } },
    ])
      .then(releases => res.json(releases))
      .catch(err => {
        console.log(err);
        next(new RecordNotFoundError("No releases found"));
      });
  }
});

// GET a single release
router.get("/:id", (req, res, next) => {
  Release.findById(req.params.id)
    .then(release => res.json(release))
    .catch(err => next(new RecordNotFoundError("No release found")));
});

// GET all releases by personnel
router.get("/personnel/:personnel_id", (req, res, next) => {
  const personnelId = req.params.personnel_id;
  const itemsPerPage = parseInt(req.query.itemsPerPage);
  const pageNum = parseInt(req.query.pageNum);
  const query = {
    $or: [
      {
        personnel: {
          $elemMatch: {
            personnelIds: {
              $elemMatch: {
                $eq: mongoose.Types.ObjectId(personnelId),
              },
            },
          },
        },
      },
      {
        mainArtists: {
          $elemMatch: {
            $eq: mongoose.Types.ObjectId(personnelId),
          },
        },
      },
      {
        label: {
          $elemMatch: {
            labelIds: {
              $elemMatch: {
                $eq: mongoose.Types.ObjectId(personnelId),
              },
            },
          },
        },
      },
    ],
  };
  if (req.query.count) {
    Release.countDocuments(query)
      .then(releasesCount => res.json(releasesCount))
      .catch(err => next(new RecordNotFoundError("No releases found")));
  } else {
    Release.find(query)
      .sort({ createdAt: -1 })
      .skip(pageNum > 0 ? (pageNum - 1) * itemsPerPage : 0)
      .limit(itemsPerPage)
      .populate("mainArtists")
      .then(releases => res.json(releases))
      .catch(err => {
        console.log(err);
        next(new RecordNotFoundError("No releases found"));
      });
  }
});

// GET all releases by track
router.get("/track/:track_id", (req, res, next) => {
  const trackId = req.params.track_id;
  Release.find({
    trackListing: {
      $elemMatch: {
        trackId: { $eq: mongoose.Types.ObjectId(trackId) },
      },
    },
  })
    .populate("mainArtists")
    .then(releases => res.json(releases))
    .catch(err => next(new RecordNotFoundError("No releases found")));
});

// POST a new release
router.post(
  "/",
  passport.authenticate("jwt", { session: false }),
  joiValidator.body(newReleaseValidation),
  (req, res, next) => {
    const newRelease = new Release({
      ...req.body,
    });

    newRelease
      .save()
      .then(release => res.json(release))
      .catch(err => next(err));
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
        if (release.deleted)
          return next(new RecordNotFoundError("Release is deleted"));
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
            if (err) return next(err);
            res.json(updatedRelease);
          }
        );
      })
      .catch(err => next(new RecordNotFoundError("No release found")));
  }
);

router.delete(
  "/:id",
  passport.authenticate("jwt", { session: false }),
  (req, res, next) => {
    Release.findById(req.params.id)
      .then(release => {
        if (release.deleted) {
          return next(new RecordNotFoundError("Release is already deleted"));
        } else {
          Release.findByIdAndUpdate(
            req.params.id,
            { $set: { deleted: true } },
            { new: true },
            (err, deletedRelease) => {
              if (err) return next(err);
              return res.json(deletedRelease);
            }
          );
        }
      })
      .catch(err => next(new RecordNotFoundError("Release not found")));
  }
);

module.exports = router;
