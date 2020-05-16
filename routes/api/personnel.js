const express = require("express");
const router = express.Router();
const passport = require("passport");

const Personnel = require("../../models/Personnel");
const Release = require("../../models/Release");
const {
  validateNewPersonnelInput,
  validateUpdatePersonnelInput,
} = require("../../validation/personnelInputValidation");

// GET all personnel
router.get("/", (req, res) => {
  Personnel.find()
    .sort({ createdAt: -1 })
    .then(personnelCollection => res.json(personnelCollection))
    .catch(err =>
      res.status(404).json({ noPersonnelCollectionFound: "No personnel found" })
    );
});

// GET a single release
router.get("/:id", (req, res) => {
  Personnel.findById(req.params.id)
    .then(personnelRecord => res.json(personnelRecord))
    .catch(err =>
      res.status(404).json({ noPersonnelRecordFound: "No personnel found" })
    );
});

// GET all personnel by release
router.get("/releases/:release_id", (req, res) => {
  Release.findById(req.params.release_id)
    .then(release => {
      const personnelIds = [];
      release.personnel.forEach(personnel => {
        personnelIds.push(personnel.personnelId);
      });
      Personnel.find({ _id: { $in: personnelIds } })
        .then(personnelCollection => res.json(personnelCollection))
        .catch(err =>
          res
            .status(404)
            .json({ noPersonnelCollectionFound: "No personnel found" })
        );
    })
    .catch(err => res.status(404).json({ noReleaseFound: "No release found" }));
});

// POST a new personnel record
router.post(
  "/",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const { errors, isValid } = validateNewPersonnelInput(req.body);
    if (!isValid) return res.status(400).json(errors);

    const newPersonnel = new Personnel({
      ...req.body,
    });

    newPersonnel
      .save()
      .then(newPersonnelRecord => res.json(newPersonnelRecord));
  }
);

// PATCH a personnel record
router.patch(
  "/:id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Personnel.findById(req.params.id)
      .then(personnelRecord => {
        const { errors, isValid } = validateUpdatePersonnelInput(req.body);
        if (!isValid) return res.status(400).json(errors);
        Personnel.findOneAndUpdate(
          { _id: personnelRecord._id },
          {
            $set: {
              ...req.body,
              modifiedAt: Date.now(),
            },
          },
          { new: true },
          (err, updatedPersonnelRecord) => {
            if (err) return res.status(400).json(err);
            return res.json(updatedPersonnelRecord);
          }
        );
      })
      .catch(err =>
        res.status(404).json({ noPersonnelRecordFound: "No personnel found" })
      );
  }
);

router.delete(
  "/:id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Personnel.findByIdAndDelete(req.params.id, (err, deletedPersonnel) => {
      if (err) return res.status(400).json(err);
      return res.json(deletedPersonnel);
    });
  }
);

module.exports = router;
