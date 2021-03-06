const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const countries = require("../validation/countries");

const PersonnelSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    alsoKnownAs: [{ type: String }],
    associated: [
      {
        type: mongoose.Schema.Types.ObjectId,
      },
    ],
    dateOfBirth: {
      type: Date,
    },
    countryOfOrigin: {
      type: String,
      enum: Object.keys(countries),
    },
    images: [
      {
        description: String,
        imageUrl: {
          type: String,
        },
        mainImage: {
          type: Boolean,
          default: false,
        },
      },
    ],
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
    deleted: { type: Boolean, default: false },
  },
  {
    timestamps: true,
  }
);

module.exports = Personnel = mongoose.model("Personnel", PersonnelSchema);
