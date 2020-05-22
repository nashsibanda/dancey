const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const countries = require("../validation/countries");

const SellerSchema = new Schema(
  {
    sellerName: {
      type: String,
      required: true,
    },
    adminUserIds: [
      {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "User",
      },
    ],
    location: {
      type: String,
      enum: Object.keys(countries),
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
    deleted: { type: Boolean, default: false },
  },
  { timestamps: true }
);

module.exports = Seller = mongoose.model("Seller", SellerSchema);
