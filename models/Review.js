const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const reviewTypes = [
  "release",
  "personnel",
  "product",
  "seller",
  "track",
  "buyer",
];

const ReviewSchema = new Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    body: {
      type: String,
    },
    username: {
      type: String,
      required: true,
    },
    rating: {
      type: Number,
      min: 1,
      max: 5,
      required: true,
    },
    comments: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Comment",
      },
    ],
    likes: {
      type: Map,
      of: Boolean,
    },
    resourceType: {
      type: String,
      enum: reviewTypes,
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

module.exports = Review = mongoose.model("Review", ReviewSchema);
