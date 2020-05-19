const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const countries = require("../validation/countries");
const formats = require("../validation/formats");

const ReleaseSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    mainArtists: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Personnel",
      },
    ],
    personnel: [
      {
        personnelId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Personnel",
        },
        role: {
          type: String,
        },
      },
    ],
    trackListing: [
      {
        order: Number,
        trackId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Track",
        },
      },
    ],
    label: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Personnel",
      },
    ],
    description: String,
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
    releaseYear: {
      type: Number,
      min: 1890,
      max: 2030,
    },
    format: {
      type: String,
      enum: formats,
    },
    releaseCountry: {
      type: String,
      enum: Object.keys(countries),
    },
    originalReleaseCountry: {
      type: String,
      enum: Object.keys(countries),
    },
    comments: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Comment",
      },
    ],
  },
  {
    timestamps: true,
  }
);

module.exports = Release = mongoose.model("Release", ReleaseSchema);
