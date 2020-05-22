const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const currencies = require("../validation/currencies");
const mediaCondition = require("../validation/mediaCondition");

const ProductSchema = new Schema(
  {
    releaseId: {
      type: Schema.Types.ObjectId,
      required: true,
    },
    price: {
      type: Number,
      required: true,
      min: 0,
    },
    currency: {
      type: String,
      enum: Object.keys(currencies),
      required: true,
    },
    condition: {
      type: String,
      enum: Object.keys(mediaCondition),
      required: true,
    },
    sellerId: {
      type: Schema.Types.ObjectId,
      required: true,
    },
    description: String,
    sold: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

module.exports = Product = mongoose.model("Product", ProductSchema);
