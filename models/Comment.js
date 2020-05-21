const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const commentTypes = [
  "release",
  "personnel",
  "product",
  "seller",
  "track",
  "review",
  "buyer",
];

const CommentSchema = new Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    body: {
      type: String,
      required: true,
    },
    username: {
      type: String,
      required: true,
    },
    parentCommentId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Comment",
      default: null,
    },
    deleted: {
      type: Boolean,
      default: false,
    },
    likes: {
      type: Map,
      of: Boolean,
    },
    resourceType: {
      type: String,
      enum: commentTypes,
      required: true,
    },
    resourceId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Resource",
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = Comment = mongoose.model("Comment", CommentSchema);
