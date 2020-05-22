const express = require("express");
const router = express.Router();
const passport = require("passport");

const joiValidator = require("express-joi-validation").createValidator({
  passError: true,
});
const {
  sellerValidation,
  newSellerValidation,
} = require("../../validation/seller.joiSchema");

const {
  RecordNotFoundError,
  NotAuthorizedError,
  ValidationError,
} = require("../../validation/errors");

const Seller = require("../../models/Seller");
const User = require("../../models/User");

// GET all sellers
router.get("/", (req, res, next) => {
  Seller.find()
    .then(sellers => res.json(sellers))
    .catch(err => next(new RecordNotFoundError("No sellers found")));
});

// GET a seller
router.get("/:id", (req, res, next) => {
  Seller.findById(req.params.id)
    .then(seller => res.json(seller))
    .catch(err => next(new RecordNotFoundError("No seller found")));
});

// POST a new seller
router.post(
  "/",
  passport.authenticate("jwt", { session: false }),
  joiValidator.body(newSellerValidation),
  (req, res, next) => {
    // Check if user is already a seller
    User.findById(req.user.id)
      .then(user => {
        if (user.sellerId) {
          return next(
            new NotAuthorizedError(
              `You are already a seller with the seller ID ${user.sellerId}`
            )
          );
        } else {
          const newSeller = new Seller({
            sellerName: req.body.sellerName,
            adminUserIds: [req.user.id],
            location: req.body.location,
          });

          newSeller
            .save()
            .then(seller => {
              // Add sellerId to user
              User.findByIdAndUpdate(req.user.id, {
                $set: { sellerId: seller._id },
              }).then(() => res.json(seller));
            })
            .catch(err => next(err));
        }
      })
      .catch(err => next(new RecordNotFoundError("No user found")));
  }
);

// PUT replacement info for a seller
router.put(
  "/:id",
  passport.authenticate("jwt", { session: false }),
  joiValidator.body(sellerValidation),
  (req, res, next) => {
    Seller.findById(req.params.id)
      .then(seller => {
        if (seller.deleted) {
          return next(new RecordNotFoundError("Seller is deleted"));
        } else if (
          !req.user.isAdmin ||
          !seller.adminUserIds.includes(req.user.id)
        ) {
          return next(
            new NotAuthorizedError(
              "You are not authorized to person this edit."
            )
          );
        } else {
          // Check that user isn't removing themself as a seller admin
          if (
            req.body.adminUserIds &&
            !req.body.adminUserIds.includes(req.user.id)
          ) {
            return next(
              new ValidationError(
                "You must include yourself as an admin. Use the resign function to relinquish admin control"
              )
            );
          } else {
            Seller.findOneAndReplace(
              { _id: seller._id },
              Object.assign(
                {},
                seller.toObject(),
                { ...req.body },
                { updatedAt: Date.now() }
              ),
              { new: true },
              (err, updatedSeller) => {
                if (err) return next(err);
                return res.json(updatedSeller);
              }
            );
          }
        }
      })
      .catch(err => next(new RecordNotFoundError("No seller found")));
  }
);

// PUT an admin resignation on a seller
router.put(
  "/:id/resign",
  passport.authenticate("jwt", { session: false }),
  (req, res, next) => {
    Seller.findById(req.params.id)
      .then(seller => {
        if (user.sellerId != seller._id) {
          return next(
            new NotAuthorizedError(
              "You are not an administrator of this seller account"
            )
          );
        } else if (seller.adminUserIds.length < 2) {
          return next(
            new NotAuthorizedError(
              "You are the only administrator of this seller account. Either delete the seller account or first choose another user to administer it."
            )
          );
        } else {
          Seller.findByIdAndUpdate(
            seller._id,
            { $pull: { adminUserIds: req.user.id } },
            { new: true },
            (err, updatedSeller) => {
              if (err) return next(err);
              User.findByIdAndUpdate(
                req.user.id,
                { $set: { sellerId: null } },
                () => res.json(updatedSeller)
              );
            }
          );
        }
      })
      .catch(err => next(new RecordNotFoundError("No seller found")));
  }
);

// DELETE a seller
router.delete(
  "/:id",
  passport.authenticate("jwt", { session: false }),
  (req, res, next) => {
    Seller.findById(req.params.id)
      .then(seller => {
        if (seller.deleted) {
          return next(new RecordNotFoundError("Seller is already deleted"));
        } else if (
          !req.user.isAdmin ||
          !seller.adminUserIds.includes(req.user.id)
        ) {
          return next(
            new NotAuthorizedError(
              "You are not authorized to perform this action."
            )
          );
        } else {
          Seller.findOneAndUpdate(
            { _id: seller._id },
            { $set: { deleted: true } },
            { new: true },
            (err, deletedSeller) => {
              if (err) return next(err);
              return res.json(deletedSeller);
            }
          );
        }
      })
      .catch(err => next(new RecordNotFoundError("No seller found")));
  }
);

module.exports = router;
