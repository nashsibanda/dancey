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
      index: {
        unique: true,
        partialFilterExpression: {
          email: { $type: "string" },
        },
      },
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
    deleted: { type: Boolean, default: false },
    sellerId: { type: Schema.Types.ObjectId, default: null },
  },
  { timestamps: true }
);

module.exports = User = mongoose.model("User", UserSchema);
