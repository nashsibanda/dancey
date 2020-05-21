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
} = require("../../validation/errors");

const Seller = require("../../models/Seller");

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
    const newSeller = new Seller({
      sellerName: req.body.sellerName,
      adminUserIds: [req.user.id],
      location: req.body.location,
    });

    newSeller
      .save()
      .then(seller => res.json(seller))
      .catch(err => next(err));
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
        if (seller.userId != req.user.id || !req.user.isAdmin) {
          return next(
            new NotAuthorizedError(
              "You are not authorized to person this edit."
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
        if (seller.userId != req.user.id || !req.user.isAdmin) {
          return next(
            new NotAuthorizedError(
              "You are not authorized to person this edit."
            )
          );
        } else {
          Seller.findOneAndDelete({ _id: seller._id }, (err, deletedSeller) => {
            if (err) return next(err);
            return res.json(deletedSeller);
          });
        }
      })
      .catch(err => next(new RecordNotFoundError("No seller found")));
  }
);

module.exports = router;
