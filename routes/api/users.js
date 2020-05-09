const express = require("express");
const router = express.Router();
const bcryptjs = require("bcryptjs");
const jsonwebtoken = require("jsonwebtoken");

const passport = require("passport");
const keys = require("../../config/keys");
const validateLoginInput = require("../../validation/login");
const validateRegisterInput = require("../../validation/register");

const User = require("../../models/User");

// Current user route
router.get(
  "/current",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const { id, username, email } = req.user;
    res.json({
      id,
      username,
      email,
    });
  }
);

// Registration route
router.post("/register", (req, res) => {
  // Initial validation
  const { errors, isValid } = validateRegisterInput(req.body);
  if (!isValid) return res.status(400).json(errors);

  // Check for duplicate email
  User.findOne({ email: req.body.email }).then(user => {
    if (user) {
      // Add errors to validation
      errors.email = "A user already exists with this email address";
      return res.status(400).json(errors);
    } else {
      const newUser = new User({
        ...req.body,
      });

      // Generate a hashed password and save user
      bcryptjs.genSalt(10, (err, salt) => {
        bcryptjs.hash(newUser.password, salt, (err, hash) => {
          // if (err) throw err;
          if (err) throw err;
          newUser.password = hash;
          newUser
            .save()
            .then(user => {
              // Sign in user after registration
              const payload = { id: user.id, username: user.username };

              jsonwebtoken.sign(
                payload,
                keys.secretOrKey,
                { expiresIn: 3600 },
                (err, token) => {
                  res.json({
                    success: true,
                    token: "Bearer " + token,
                  });
                }
              );
            })
            .catch(err => console.error(err));
        });
      });
    }
  });
});

// Login route
router.post("/login", (req, res) => {
  // Initial validation
  const { errors, isValid } = validateLoginInput(req.body);
  if (!isValid) {
    return res.status(400).json(errors);
  }

  const { email, password } = req.body;

  User.findOne({ email }).then(user => {
    // Check if this user exists
    if (!user) {
      // Send error in validation
      errors.email = "No user exists with that email address";
      return res.status(404).json(errors);
    }

    // Compare password to saved password hash
    bcryptjs.compare(password, user.password).then(isMatch => {
      if (!isMatch) {
        // Use validator for error
        errors.password = "Password is incorrect";
        return res.status(400).json(errors);
      }

      const payload = { id: user.id, username: user.username };

      // Sign in user with jsonwebtoken
      jsonwebtoken.sign(
        payload,
        keys.secretOrKey,
        { expiresIn: 3600 },
        (err, token) => {
          res.json({
            success: true,
            token: "Bearer " + token,
          });
        }
      );
    });
  });
});

module.exports = router;
