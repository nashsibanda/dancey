const express = require("express");
const router = express.Router();
const passport = require("passport");

const joiValidator = require("express-joi-validation").createValidator({
  passError: true,
});
const { commentValidation } = require("../../validation/comment.joiSchema");

const Comment = require("../../models/Comment");
const Release = require("../../models/Release");
const Personnel = require("../../models/Personnel");
const Product = require("../../models/Product");
const Review = require("../../models/Review");
const Seller = require("../../models/Seller");
const Track = require("../../models/Track");
const User = require("../../models/User");

const {
  RecordNotFoundError,
  ResourceNotFoundError,
  NotAuthorizedError,
} = require("../../validation/errors");

const commentResource = resource => {
  switch (resource) {
    case "release":
      return Release;
    case "personnel":
      return Personnel;
    case "product":
      return Product;
    case "review":
      return Review;
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

// GET all comments - admin only
router.get(
  "/all",
  passport.authenticate("jwt", { session: false }),
  (req, res, next) => {
    if (!req.user.isAdmin)
      return next(
        new NotAuthorizedError("You are not authorized to perform this action")
      );
    Comment.find()
      .then(comments => res.json(comments))
      .catch(err => next(new RecordNotFoundError("No comments found")));
  }
);

// GET all comments for a resource
router.get("/get/:resource/:resource_id", (req, res, next) => {
  commentResource(req.params.resource)
    .findById(req.params.resource_id)
    .then(({ comments }) => {
      Comment.find({ _id: { $in: comments } })
        .then(resourceComments => res.json(resourceComments))
        .catch(err => next(new RecordNotFoundError("No comments found")));
    })
    .catch(err =>
      next(new RecordNotFoundError(`No ${req.params.resource} found`))
    );
});

// GET one comment
router.get("/:id", (req, res, next) => {
  Comment.findById(req.params.id)
    .then(comment => res.json(comment))
    .catch(err => next(new RecordNotFoundError("No comment found")));
});

// POST a comment
router.post(
  "/",
  passport.authenticate("jwt", { session: false }),
  joiValidator.body(commentValidation),
  (req, res, next) => {
    const newComment = new Comment({
      userId: req.user.id,
      username: req.user.username,
      body: req.body.body,
      resourceId: req.body.resourceId,
      resourceType: req.body.resourceType,
      parentCommentId: req.body.parentCommentId,
    });
    newComment.save().then(comment => {
      commentResource(req.body.resourceType).findByIdAndUpdate(
        req.body.resourceId,
        {
          $addToSet: { comments: comment._id },
        },
        { new: true },
        (err, updatedResource) => {
          if (err) return next(err);
          res.json(comment);
        }
      );
    });
  }
);

// PUT replacement info for a comment
router.put(
  "/:id",
  passport.authenticate("jwt", { session: false }),
  joiValidator.body(commentValidation),
  (req, res, next) => {
    Comment.findById(req.params.id)
      .then(comment => {
        if (comment.deleted)
          return next(new RecordNotFoundError("Comment is deleted"));
        if (comment.userId != req.user.id || !req.user.isAdmin) {
          return next(
            new NotAuthorizedError(
              "You are not authorized to perform this edit."
            )
          );
        } else {
          Comment.findOneAndReplace(
            { _id: comment._id },
            Object.assign(
              {},
              comment.toObject(),
              { ...req.body },
              { updatedAt: Date.now() }
            ),
            { new: true },
            (err, updatedComment) => {
              if (err) return next(err);
              return res.json(updatedComment);
            }
          );
        }
      })
      .catch(err => next(new RecordNotFoundError("No comment found")));
  }
);

// PUT a like or unlike on a comment
router.put(
  "/:id/like",
  passport.authenticate("jwt", { session: false }),
  (req, res, next) => {
    Comment.findById(req.params.id)
      .then(comment => {
        if (comment.deleted)
          return next(new RecordNotFoundError("Comment is deleted"));
        const newLikes = Object.fromEntries(comment.likes || []);
        const myId = req.user.id.toString();
        newLikes[myId] = !newLikes[myId];
        if (newLikes[myId] == false) delete newLikes[myId];
        Comment.findOneAndReplace(
          { _id: comment._id },
          Object.assign({}, comment.toObject(), { likes: newLikes }),
          { new: true },
          (err, updatedComment) => {
            if (err) return next(err);
            return res.json(updatedComment);
          }
        );
      })
      .catch(err => next(new RecordNotFoundError("No comment found")));
  }
);

// DELETE a comment
router.delete(
  "/:id",
  passport.authenticate("jwt", { session: false }),
  (req, res, next) => {
    Comment.findById(req.params.id)
      .then(comment => {
        if (comment.deleted)
          return next(new RecordNotFoundError("Comment is already deleted"));
        if (!req.user.isAdmin || comment.userId != req.user.id) {
          return next(
            new NotAuthorizedError(
              "You are not authorized to perform this action"
            )
          );
        } else {
          Comment.findByIdAndUpdate(
            comment._id,
            { $set: { deleted: true, body: "", userId: null, username: null } },
            { new: true },
            (err, deletedComment) => {
              if (err) return next(err);
              return res.json(deletedComment);
            }
          );
        }
      })
      .catch(err => next(new RecordNotFoundError("No comment found")));
  }
);

module.exports = router;
