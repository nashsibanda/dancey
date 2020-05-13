const express = require("express");
const router = express.Router();

const Personnel = require("../../models/Personnel");
const Release = require("../../models/Release");
const {
  validateNewPersonnelInput,
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

module.exports = router;
