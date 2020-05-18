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
  },
  {
    timestamps: true,
  }
);

module.exports = Personnel = mongoose.model("Personnel", PersonnelSchema);
