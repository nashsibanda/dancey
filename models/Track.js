const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const TrackSchema = new Schema(
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
        personnelIds: [
          { type: mongoose.Schema.Types.ObjectId, ref: "Personnel" },
        ],
        role: String,
      },
    ],
    originalVersion: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Track",
    },
    duration: Number,
    writers: [{ type: mongoose.Schema.Types.ObjectId, ref: "Personnel" }],
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
  { timestamps: true }
);

module.exports = Track = mongoose.model("Track", TrackSchema);
