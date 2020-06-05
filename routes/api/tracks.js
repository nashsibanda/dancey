const express = require("express");
const router = express.Router();
const passport = require("passport");

const joiValidator = require("express-joi-validation").createValidator({
  passError: true,
});
const { RecordNotFoundError } = require("../../validation/errors");

const {
  newTrackValidation,
  updateTrackValidation,
  trackListingValidation,
} = require("../../validation/track.joiSchema");

const Track = require("../../models/Track");
const Release = require("../../models/Release");

// GET all tracks
router.get("/", (req, res, next) => {
  Track.find()
    .sort({ createdAt: -1 })
    .then(tracks => res.json(tracks))
    .catch(err => next(new RecordNotFoundError("No tracks found")));
});

// GET a track by id
router.get("/:id", (req, res, next) => {
  Track.findById(req.params.id)
    .then(track => res.json(track))
    .catch(err => next(new RecordNotFoundError("No track found")));
});

// GET all tracks by personnel
router.get("/get/personnel/:personnel_id", (req, res, next) => {
  Track.find({
    $or: [
      { "personnel.personnelId": req.params.personnel_id },
      { mainArtists: { $elemMatch: { $eq: req.params.personnel_id } } },
      { writers: { $elemMatch: { $eq: req.params.personnel_id } } },
    ],
  })
    .then(tracks => res.json(tracks))
    .catch(err => next(new RecordNotFoundError("No tracks found")));
});

// GET all tracks by release
router.get("/get/release/:release_id", (req, res, next) => {
  Release.findById(req.params.release_id)
    .then(release => {
      const trackIds = release.trackListing.map(listing => listing.trackId);
      Track.find({ _id: { $in: trackIds } })
        .then(tracks => res.json(tracks))
        .catch(err => next(new RecordNotFoundError("No tracks found")));
    })
    .catch(err => next(new RecordNotFoundError("No release found")));
});

// POST a new track
router.post(
  "/",
  passport.authenticate("jwt", { session: false }),
  joiValidator.body(newTrackValidation),
  (req, res, next) => {
    const newTrack = new Track({
      ...req.body,
    });

    newTrack
      .save()
      .then(track => res.json(track))
      .catch(err => next(err));
  }
);

// POST a new track to a release
router.post(
  "/post/release/:release_id",
  passport.authenticate("jwt", { session: false }),
  joiValidator.body(trackListingValidation),
  (req, res, next) => {
    console.log(req.body);
    const newTrack = new Track({
      ...req.body.track,
    });

    newTrack
      .save()
      .then(savedTrack => {
        Release.findById(req.params.release_id)
          .then(release => {
            const updatedTrackListings = [
              ...release.trackListing,
              { ...req.body.trackListing, trackId: savedTrack._id },
            ];
            Release.findOneAndReplace(
              { _id: req.params.release_id },
              Object.assign(
                {},
                release.toObject(),
                { trackListing: updatedTrackListings },
                { updatedAt: Date.now() }
              ),
              { new: true },
              (err, updatedRelease) => {
                if (err) return next(err);
                res.json({ updatedRelease: updatedRelease, track: savedTrack });
              }
            );
          })
          .catch(err => next(new RecordNotFoundError("No release found")));
      })
      .catch(err => next(err));
  }
);

// PUT replacement info for a track
router.put(
  "/:id",
  passport.authenticate("jwt", { session: false }),
  joiValidator.body(updateTrackValidation),
  (req, res, next) => {
    Track.findById(req.params.id)
      .then(track => {
        if (track.deleted) {
          return next(new RecordNotFoundError("Track is deleted"));
        }
        Track.findOneAndReplace(
          { _id: track._id },
          Object.assign(
            {},
            track.toObject(),
            { ...req.body },
            { updatedAt: Date.now() }
          ),
          { new: true },
          (err, updatedTrack) => {
            if (err) return next(err);
            res.json(updatedTrack);
          }
        );
      })
      .catch(err => next(new RecordNotFoundError("No track found")));
  }
);

// DELETE a track
router.delete(
  "/:id",
  passport.authenticate("jwt", { session: false }),
  (req, res, next) => {
    Track.findById(req.params.id)
      .then(track => {
        if (track.deleted) {
          return next(new RecordNotFoundError("Track is already deleted"));
        } else {
          Track.findByIdAndUpdate(
            req.params.id,
            { $set: { deleted: true } },
            { new: true },
            (err, deletedTrack) => {
              if (err) return next(err);
              if (!deletedTrack)
                return next(new RecordNotFoundError("No track found"));
              Release.updateMany(
                { "trackListing.trackId": deletedTrack._id },
                { $set: { "trackListing.$[listing].trackId": null } },
                { arrayFilters: [{ "elem.trackId": deletedTrack._id }] },
                (err, updateResponse) => {
                  if (err) return next(err);
                  console.log(updateResponse);
                  return res.json(deletedTrack);
                }
              );
            }
          );
        }
      })
      .catch(err => next(new RecordNotFoundError("No track found")));
  }
);

module.exports = router;
