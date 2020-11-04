const express = require("express");
const router = express.Router();
const bcryptjs = require("bcryptjs");
const jsonwebtoken = require("jsonwebtoken");

const passport = require("passport");
const secretOrKey = process.env.SECRET_OR_KEY;
const joiValidator = require("express-joi-validation").createValidator({
  passError: true,
});

const {
  RecordNotFoundError,
  ValidationError,
  NotAuthorizedError,
} = require("../../validation/errors");

const {
  registerValidation,
  loginValidation,
  userValidation,
} = require("../../validation/user.joiSchema");

const User = require("../../models/User");
const Seller = require("../../models/Seller");
const Product = require("../../models/Product");

// GET current user
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

// GET all users
router.get("/", (req, res) => {
  User.find()
    .then(users => res.json(users))
    .catch(err => next(err));
});

// POST new user
router.post("/register", joiValidator.body(registerValidation), (req, res) => {
  // Check for duplicate email
  User.findOne({ email: req.body.email }).then(user => {
    if (user) {
      return next(
        new RecordNotFoundError("A user already exists with this email address")
      );
    } else {
      User.findOne({ username: req.body.username }).then(user => {
        if (user) {
          return next(
            new RecordNotFoundError("A user already exists with this username")
          );
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
                  const payload = {
                    id: user.id,
                    username: user.username,
                    isAdmin: user.isAdmin,
                  };

                  jsonwebtoken.sign(
                    payload,
                    secretOrKey,
                    { expiresIn: 3600 },
                    (err, token) => {
                      res.json({
                        success: true,
                        token: "Bearer " + token,
                      });
                    }
                  );
                })
                .catch(err => next(err));
            });
          });
        }
      });
    }
  });
});

// POST new login session
router.post("/login", joiValidator.body(loginValidation), (req, res, next) => {
  const { email, password } = req.body;

  User.findOne({ email }).then(user => {
    // Check if this user exists
    if (!user) {
      return next(
        new RecordNotFoundError("No user exists with that email address")
      );
    }

    // Compare password to saved password hash
    bcryptjs.compare(password, user.password).then(isMatch => {
      if (!isMatch) {
        return next(new ValidationError("Password is incorrect"));
      }

      const payload = {
        id: user.id,
        username: user.username,
        isAdmin: user.isAdmin,
      };

      const expiryTime = user.isAdmin ? "1d" : 3600;

      // Sign in user with jsonwebtoken
      jsonwebtoken.sign(
        payload,
        secretOrKey,
        { expiresIn: expiryTime },
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

// PUT replacement info for a user
router.put(
  "/:id",
  passport.authenticate(
    "jwt",
    { session: false },
    joiValidator.body(userValidation),
    (req, res, next) => {
      User.findById(req.params.id)
        .then(user => {
          if (user.deleted) {
            return next(new RecordNotFoundError("User is deleted"));
          } else if (!req.user.isAdmin || user._id != req.user.id) {
            return next(
              new NotAuthorizedError(
                "You are not authorized to perform this action"
              )
            );
          } else {
            User.findOneAndReplace(
              { _id: user._id },
              Object.assign(
                {},
                user.toObject(),
                { ...req.body },
                { updatedAt: Date.now() }
              ),
              { new: true },
              (err, updatedUser) => {
                if (err) return next(err);
                return res.json(updatedUser);
              }
            );
          }
        })
        .catch(err => next(new RecordNotFoundError("No user found")));
    }
  )
);

// DELETE a user
router.delete(
  "/:id",
  passport.authenticate("jwt", { session: false }),
  (req, res, next) => {
    User.findById(req.params.id)
      .then(user => {
        if (user.deleted) {
          return next(new RecordNotFoundError("User is already deleted"));
        } else if (!req.user.isAdmin || user._id != req.user.id) {
          return next(
            new NotAuthorizedError(
              "You are not authorized to perform this action"
            )
          );
        } else {
          User.findByIdAndUpdate(
            user._id,
            { $set: { deleted: true, email: null } },
            { new: true },
            (err, deletedUser) => {
              if (err || !deletedUser) {
                return next(err);
              } else if (deletedUser.sellerId) {
                // Remove all assignments as seller admin
                Seller.findByIdAndUpdate(
                  deletedUser.sellerId,
                  { $pull: { adminUserIds: deletedUser._id } },
                  { new: true },
                  (err, updatedSeller) => {
                    if (updatedSeller.adminUserIds.length == 0) {
                      Seller.findOneAndReplace(
                        updatedSeller._id,
                        Object.assign(
                          {},
                          updatedSeller.toObject(),
                          { deleted: true },
                          { updatedAt: Date.now() }
                        ),
                        { new: true },
                        (err, deletedSeller) => {
                          if (err) return next(err);
                          Product.find({
                            sellerId: deletedSeller._id,
                          }).then(products => {
                            if (products) {
                              Product.updateMany(
                                { sellerId: deletedSeller._id },
                                { $set: { deleted: true } }
                              ).then(() => res.json(deletedUser));
                            } else {
                              return res.json(deletedUser);
                            }
                          });
                        }
                      );
                    } else {
                      return res.json(deletedUser);
                    }
                  }
                );
              } else {
                return res.json(deletedUser);
              }
            }
          );
        }
      })
      .catch(err => next(new RecordNotFoundError("No user found")));
  }
);

module.exports = router;
