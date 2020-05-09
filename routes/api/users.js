const express = require("express");
const router = express.Router();
const bcryptjs = require("bcryptjs");
const User = require("../../models/User");

router.get("/test", (req, res) => res.json({ msg: "This is the users route" }));

// Registration route
router.post("/register", (req, res) => {
  // Check for duplicate email
  User.findOne({ email: req.body.email }).then(user => {
    if (user) {
      return res
        .status(400)
        .json({ email: "A user already exists with this email address" });
    } else {
      const newUser = new User({
        ...req.body,
      });

      bcryptjs.genSalt(10, (err, salt) => {
        bcryptjs.hash(newUser.password, salt, (err, hash) => {
          // if (err) throw err;
          if (err) throw err;
          newUser.password = hash;
          newUser
            .save()
            .then(user => res.json(user))
            .catch(err => console.error(err));
        });
      });
    }
  });
});

// Login route
router.post("/login", (req, res) => {
  const { email, password } = req.body;

  User.findOne({ email }).then(user => {
    if (!user)
      return res
        .status(404)
        .json({ email: "No user exists with this email address" });

    bcryptjs.compare(password, user.password).then(isMatch => {
      if (isMatch) {
        res.json({ msg: "Success" });
      } else {
        return res.status(400).json({ password: "Incorrect password" });
      }
    });
  });
});

module.exports = router;
