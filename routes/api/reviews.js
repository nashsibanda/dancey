const express = require("express");
const router = express.Router();
const passport = require("passport");

const joiValidator = require("express-joi-validation").createValidator({
  passError: true,
});
const { reviewValidation } = require("../../validation/review.joiSchema");

const Release = require("../../models/Release");
const Personnel = require("../../models/Personnel");
const Product = require("../../models/Product");
const Review = require("../../models/Review");
const Seller = require("../../models/Seller");
const Track = require("../../models/Track");
const User = require("../../models/User");

const {
  RecordNotFoundError,
  NotAuthorizedError,
  ResourceNotFoundError,
} = require("../../validation/errors");

const reviewResource = resource => {
  switch (resource) {
    case "release":
      return Release;
    case "personnel":
      return Personnel;
    case "product":
      return Product;
    case "seller":
      return Seller;
    case "track":
      return Track;
    case "buyer":
      return User;
    default:
      return new ResourceNotFoundError(`No resource called ${resource}`);
  }
};

// GET all reviews -
// TODO Testing only!
router.get(
  "/all",
  passport.authenticate("jwt", { session: false }),
  (req, res, next) => {
    if (!req.user.isAdmin)
      return next(
        new NotAuthorizedError("You are not authorized to perform this action")
      );
    Review.find()
      .then(reviews => res.json(reviews))
      .catch(err => next(new RecordNotFoundError("No reviews found")));
  }
);

// GET all reviews for a resource
router.get("/get/:resource/:resource_id", (req, res, next) => {
  reviewResource(req.params.resource)
    .findById(req.params.resource_id)
    .then(({ reviews }) => {
      Review.find({ _id: { $in: reviews } })
        .then(resourceReviews => res.json(resourceReviews))
        .catch(err => next(new RecordNotFoundError("No reviews found")));
    })
    .catch(err =>
      next(new RecordNotFoundError(`No ${req.params.resource} found`))
    );
});

// GET one review
router.get("/:id", (req, res, next) => {
  Review.findById(req.params.id)
    .then(review => res.json(review))
    .catch(err => next(new RecordNotFoundError("No review found")));
});

// POST a review
router.post(
  "/",
  passport.authenticate("jwt", { session: false }),
  joiValidator.body(reviewValidation),
  (req, res, next) => {
    const newReview = new Review({
      userId: req.user.id,
      username: req.user.username,
      body: req.body.body,
      rating: req.body.rating,
      resourceId: req.body.resourceId,
      resourceType: req.body.resourceType,
    });
    newReview.save().then(review => {
      reviewResource(req.body.resourceType).findByIdAndUpdate(
        req.body.resourceId,
        {
          $addToSet: { reviews: review._id },
        },
        { new: true },
        (err, updatedResource) => {
          if (err) return next(err);
          res.json(review);
        }
      );
    });
  }
);

// PUT replacement info for a review
router.put(
  "/:id",
  passport.authenticate("jwt", { session: false }),
  joiValidator.body(reviewValidation),
  (req, res, next) => {
    Review.findById(req.params.id)
      .then(review => {
        if (review.deleted) {
          return next(new RecordNotFoundError("Review is deleted"));
        } else if (review.userId != req.user.id || !req.user.isAdmin) {
          return next(
            new NotAuthorizedError(
              "You are not authorized to perform this edit."
            )
          );
        } else {
          Review.findOneAndReplace(
            { _id: review._id },
            Object.assign(
              {},
              review.toObject(),
              { ...req.body },
              { updatedAt: Date.now() }
            ),
            { new: true },
            (err, updatedReview) => {
              if (err) return next(err);
              return res.json(updatedReview);
            }
          );
        }
      })
      .catch(err => next(new RecordNotFoundError("No review found")));
  }
);

// PUT a like or unlike on a review
router.put(
  "/:id/like",
  passport.authenticate("jwt", { session: false }),
  (req, res, next) => {
    Review.findById(req.params.id)
      .then(review => {
        if (review.deleted)
          return next(new RecordNotFoundError("Review is deleted"));
        const newLikes = Object.fromEntries(review.likes || []);
        const myId = req.user.id.toString();
        newLikes[myId] = !newLikes[myId];
        if (newLikes[myId] == false) delete newLikes[myId];
        Review.findOneAndReplace(
          { _id: review._id },
          Object.assign({}, review.toObject(), { likes: newLikes }),
          { new: true },
          (err, updatedReview) => {
            if (err) return next(err);
            return res.json(updatedReview);
          }
        );
      })
      .catch(err => next(new RecordNotFoundError("No review found")));
  }
);

// DELETE a review
router.delete(
  "/:id",
  passport.authenticate("jwt", { session: false }),
  (req, res, next) => {
    Review.findById(req.params.id)
      .then(review => {
        if (review.deleted) {
          return next(new RecordNotFoundError("Review is already deleted"));
        } else if (!req.user.isAdmin || review.userId != req.user.id) {
          return next(
            new NotAuthorizedError(
              "You are not authorized to perform this action"
            )
          );
        } else {
          Review.findByIdAndUpdate(
            req.params.id,
            { $set: { deleted: true } },
            { new: true },
            (err, deletedReview) => {
              reviewResource(deletedReview.resourceType).findByIdAndUpdate(
                deletedReview.resourceId,
                {
                  $pull: { reviews: deletedReview._id },
                },
                { new: true },
                (err, updatedResource) => {
                  if (err) return next(err);
                  res.json(deletedReview);
                }
              );
            }
          );
        }
      })
      .catch(err => next(new RecordNotFoundError("No review found")));
  }
);

module.exports = router;
