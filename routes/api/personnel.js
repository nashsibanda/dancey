const express = require("express");
const router = express.Router();
const passport = require("passport");

const joiValidator = require("express-joi-validation").createValidator({
  passError: true,
});
const { RecordNotFoundError } = require("../../validation/errors");

const {
  newPersonnelValidation,
  updatePersonnelValidation,
} = require("../../validation/personnel.joiSchema");

const Personnel = require("../../models/Personnel");
const Release = require("../../models/Release");
const Track = require("../../models/Track");

// GET all personnel
router.get("/", (req, res, next) => {
  Personnel.find()
    .sort({ createdAt: -1 })
    .then(personnelCollection => res.json(personnelCollection))
    .catch(err => next(new RecordNotFoundError("No personnel found")));
});

// GET a single personnel record
router.get("/:id", (req, res, next) => {
  Personnel.findById(req.params.id)
    .then(personnelRecord => {
      Release.find({
        $or: [
          { "personnel.personnelId": personnelRecord._id },
          { mainArtists: { $elemMatch: { $eq: personnelRecord._id } } },
        ],
      }).then(releases => console.log(releases));
      res.json(personnelRecord);
    })
    .catch(err => next(new RecordNotFoundError("No personnel found")));
});

// GET all personnel by release
router.get("/get/release/:release_id", (req, res) => {
  Release.findById(req.params.release_id)
    .then(release => {
      const personnelIds = [];
      release.personnel.forEach(personnel => {
        personnelIds.push(personnel.personnelId);
      });
      Personnel.find({ _id: { $in: personnelIds } })
        .then(personnelCollection => res.json(personnelCollection))
        .catch(err => next(new RecordNotFoundError("No personnel found")));
    })
    .catch(err => next(new RecordNotFoundError("No release found")));
});

// GET all personnel from a release's tracks
router.get("/get/release/:release_id/tracks", (req, res) => {
  Release.findById(req.params.release_id)
    .populate("trackListing.trackId")
    .then(release => {
      const personnelIdSet = new Set();
      release.trackListing.forEach(({ trackId }) => {
        trackId.personnel.forEach(personnel => {
          personnelIdSet.add(personnel.personnelId);
        });
        trackId.mainArtists.forEach(mainArtist => {
          personnelIdSet.add(mainArtist);
        });
        trackId.writers.forEach(writer => {
          personnelIdSet.add(writer);
        });
      });
      const personnelIds = Array.from(personnelIdSet);
      Personnel.find({ _id: { $in: personnelIds } })
        .then(personnelCollection => res.json(personnelCollection))
        .catch(err => next(new RecordNotFoundError("No personnel found")));
    })
    .catch(err => next(new RecordNotFoundError("No release found")));
});

// GET all personnel by track
router.get("/get/track/:track_id", (req, res) => {
  Track.findById(req.params.track_id)
    .then(track => {
      const personnelIdSet = new Set();
      track.personnel.forEach(personnel => {
        personnelIdSet.add(personnel.personnelId);
      });
      track.mainArtists.forEach(mainArtist => {
        personnelIdSet.add(mainArtist);
      });
      track.writers.forEach(writer => {
        personnelIdSet.add(writer);
      });
      const personnelIds = Array.from(personnelIdSet);
      Personnel.find({ _id: { $in: personnelIds } })
        .then(personnelCollection => res.json(personnelCollection))
        .catch(err => next(new RecordNotFoundError("No personnel found")));
    })
    .catch(err => next(new RecordNotFoundError("No release found")));
});

// POST a new personnel record
router.post(
  "/",
  passport.authenticate("jwt", { session: false }),
  joiValidator.body(newPersonnelValidation),
  (req, res) => {
    const newPersonnel = new Personnel({
      ...req.body,
    });

    newPersonnel
      .save()
      .then(newPersonnelRecord => res.json(newPersonnelRecord));
  }
);

// PUT replacement info for a personnel record
router.put(
  "/:id",
  passport.authenticate("jwt", { session: false }),
  joiValidator.body(updatePersonnelValidation),
  (req, res, next) => {
    Personnel.findById(req.params.id)
      .then(personnelRecord => {
        if (personnel.deleted)
          return next(new RecordNotFoundError("Personnel is deleted"));
        Personnel.findOneAndReplace(
          { _id: personnelRecord._id },
          Object.assign(
            {},
            personnelRecord.toObject(),
            { ...req.body },
            { updatedAt: Date.now() }
          ),
          { new: true },
          (err, updatedPersonnelRecord) => {
            if (err) return next(err);
            return res.json(updatedPersonnelRecord);
          }
        );
      })
      .catch(err => next(new RecordNotFoundError("No personnel found")));
  }
);

// DELETE a personnel record
router.delete(
  "/:id",
  passport.authenticate("jwt", { session: false }),
  (req, res, next) => {
    Personnel.findById(req.params.id)
      .then(personnelRecord => {
        if (personnelRecord.deleted) {
          return next(new RecordNotFoundError("Personnel is already deleted"));
        } else {
          Personnel.findByIdAndUpdate(
            req.params.id,
            { $set: { deleted: true } },
            { new: true },
            (err, deletedPersonnel) => {
              if (err || !deletedPersonnel) {
                return next(new RecordNotFoundError("No personnel found"));
              } else {
                // Remove all personnel references in Release documents
                Release.updateMany(
                  {
                    $or: [
                      {
                        mainArtists: {
                          $elemMatch: { $eq: deletedPersonnel._id },
                        },
                      },
                      { "personnel.personnelId": deletedPersonnel._id },
                    ],
                  },
                  {
                    $pull: {
                      personnel: { personnelId: deletedPersonnel._id },
                      mainArtists: deletedPersonnel._id,
                    },
                  }
                ).then(() => {
                  // Remove all personnel references in Track documents
                  Track.updateMany(
                    {
                      $or: [
                        { "personnel.personnelId": deletedPersonnel._id },
                        {
                          writers: {
                            $elemMatch: { $eq: deletedPersonnel._id },
                          },
                        },
                        {
                          artists: {
                            $elemMatch: { $eq: deletedPersonnel._id },
                          },
                        },
                      ],
                    },
                    {
                      $pull: {
                        personnel: { personnelId: deletedPersonnel._id },
                        artists: deletedPersonnel._id,
                        writers: deletedPersonnel._id,
                      },
                    }
                  ).then(() => res.json(deletedPersonnel));
                });
              }
            }
          );
        }
      })
      .catch(err => next(new RecordNotFoundError("No personnel found")));
  }
);

module.exports = router;
