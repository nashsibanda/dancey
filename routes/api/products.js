const express = require("express");
const router = express.Router();
const passport = require("passport");

const joiValidator = require("express-joi-validation").createValidator({
  passError: true,
});
const {
  newProductValidation,
  productValidation,
} = require("../../validation/product.joiSchema");
const {
  RecordNotFoundError,
  NotAuthorizedError,
} = require("../../validation/errors");

const Product = require("../../models/Product");
const Seller = require("../../models/Seller");

// GET all products
router.get("/", (req, res, next) => {
  Product.find()
    .then(products => res.json(products))
    .catch(err => next(new RecordNotFoundError("No products found")));
});

// GET a product
router.get("/:id", (req, res, next) => {
  Product.findById(req.params.id)
    .then(product => res.json(product))
    .catch(err => next(new RecordNotFoundError("No product found")));
});

// GET all products from a seller
router.get("/seller/:seller_id", (req, res, next) => {
  Product.find({ sellerId: req.params.seller_id })
    .then(products => res.json(products))
    .catch(err =>
      next(new RecordNotFoundError("No products found for this seller"))
    );
});

// POST a new product
router.post(
  "/",
  passport.authenticate("jwt", { session: false }),
  joiValidator.body(newProductValidation),
  (req, res, next) => {
    Seller.findById(req.body.sellerId)
      .then(seller => {
        if (!req.user.isAdmin || !seller.adminUserIds.includes(req.user.id)) {
          return next(
            new NotAuthorizedError(
              "You are not authorized to perform this action"
            )
          );
        } else {
          const newProduct = new Product({
            ...req.body,
          });

          newProduct
            .save()
            .then(product => res.json(product))
            .catch(err => next(err));
        }
      })
      .catch(err => next(new RecordNotFoundError("No seller found")));
  }
);

// PUT replacement info for a product
router.put(
  "/:id",
  passport.authenticate("jwt", { session: false }),
  joiValidator.body(productValidation),
  (req, res, next) => {
    Product.findById(req.params.id)
      .then(product => {
        Seller.findById(product.sellerId).then(seller => {
          if (!req.user.isAdmin || !seller.adminUserIds.includes(req.user.id)) {
            return next(
              new NotAuthorizedError(
                "You are not authorized to perform this action"
              )
            );
          } else {
            Product.findOneAndReplace(
              { _id: product._id },
              Object.assign(
                {},
                product.toObject(),
                { ...req.body },
                { updatedAt: Date.now() }
              ),
              { new: true },
              (err, updatedProduct) => {
                if (err) return next(err);
                return res.json(updatedProduct);
              }
            );
          }
        });
      })
      .catch(err => next(new RecordNotFoundError("No product found")));
  }
);

// DELETE a product
router.delete(
  "/:id",
  passport.authenticate("jwt", { session: false }),
  (req, res, next) => {
    Product.findById(req.params.id)
      .then(product => {
        Seller.findById(product.sellerId).then(seller => {
          if (!req.user.isAdmin || !seller.adminUserIds.includes(req.user.id)) {
            return next(
              new NotAuthorizedError(
                "You are not authorized to perform this action"
              )
            );
          } else {
            Product.findOneAndDelete(
              { _id: product._id },
              (err, deletedProduct) => {
                if (err) return next(err);
                return res.json(deletedProduct);
              }
            );
          }
        });
      })
      .catch(err => next(new RecordNotFoundError("No product found")));
  }
);

module.exports = router;
