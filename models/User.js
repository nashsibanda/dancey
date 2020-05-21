const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const countries = require("../validation/countries");

const UserSchema = new Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
    },
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
    password: {
      type: String,
      required: true,
    },
    location: {
      type: String,
      enum: Object.keys(countries),
      required: true,
    },
    birthday: {
      type: Date,
      required: false,
    },
    comments: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Comment",
      },
    ],
    reviews: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Review",
      },
    ],
    isAdmin: { type: Boolean, default: false },
  },
  { timestamps: true }
);

module.exports = User = mongoose.model("User", UserSchema);
