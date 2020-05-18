const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const TrackSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    artists: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Personnel",
      },
    ],
    personnel: [
      {
        personnelId: { type: mongoose.Schema.Types.ObjectId, ref: "Personnel" },
        role: String,
      },
    ],
    originalVersion: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Track",
    },
    duration: Number,
    writers: [{ type: mongoose.Schema.Types.ObjectId, ref: "Personnel" }],
  },
  { timestamps: true }
);

module.exports = Track = mongoose.model("Track", TrackSchema);
