const express = require("express");
const router = express.Router();

const Personnel = require("../../models/Personnel");

router.get("/", (req, res) => {
  Personnel.find()
    .sort({ createdAt: -1 })
    .then(personnel => res.json(personnel))
    .catch(err =>
      res.status(404).json({ noPersonnelFound: "No personnel found" })
    );
});

module.exports = router;
