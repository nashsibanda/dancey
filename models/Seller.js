const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const countries = require("../validation/countries");

const SellerSchema = new Schema(
  {
    sellerName: {
      type: String,
      required: true,
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    location: {
      type: string,
      enum: Object.keys(countries),
    },
    reviews: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Review",
      },
    ],
  },
  { timestamps: true }
);

module.exports = Seller = mongoose.model("Seller", SellerSchema);
