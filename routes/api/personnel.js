const express = require("express");
const router = express.Router();
const passport = require("passport");

const joiValidator = require("express-joi-validation").createValidator({
  passError: true,
});
const {
  ValidationError,
  RecordNotFoundError,
} = require("../../validation/errors");

const {
  newPersonnelValidation,
  updatePersonnelValidation,
} = require("../../validation/personnel.joiSchema");

const Personnel = require("../../models/Personnel");
const Release = require("../../models/Release");

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
router.get("/release/:release_id", (req, res) => {
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

// POST a new personnel record
router.post(
  "/",
  // passport.authenticate("jwt", { session: false }),
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

router.delete(
  "/:id",
  // passport.authenticate("jwt", { session: false }),
  (req, res, next) => {
    Personnel.findByIdAndDelete(req.params.id, (err, deletedPersonnel) => {
      if (err || !deletedPersonnel) {
        return next(new RecordNotFoundError("No personnel found"));
      } else {
        Release.updateMany(
          {
            $or: [
              { "personnel.personnelId": deletedPersonnel._id },
              { mainArtists: { $elemMatch: { $eq: deletedPersonnel._id } } },
            ],
          },
          {
            $pull: {
              personnel: { personnelId: deletedPersonnel._id },
              mainArtists: deletedPersonnel._id,
            },
          },
          (err, resp) => {
            console.log(resp);
            return res.json(deletedPersonnel);
          }
        );
      }
    });
  }
);

module.exports = router;
