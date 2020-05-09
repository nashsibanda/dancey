const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const countries = require("../validation/countries");
const formats = require("../validation/formats");

const ReleaseSchema = new Schema({
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
      labelId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Personnel",
      },
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
  createdAt: {
    type: Date,
    default: Date.now,
  },
  modifiedAt: {
    type: Date,
    default: Date.now,
  },
  releaseCountry: {
    type: String,
    enum: Object.keys(countries),
  },
});

module.exports = Release = mongoose.model("Release", ReleaseSchema);
