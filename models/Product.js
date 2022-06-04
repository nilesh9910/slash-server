const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
  {
    productName: {
      type: String,
      required: true,
    },
    brandName: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    productImages: {
      type: [String],
      required: true,
    },
    productFor: {
      type: [String],
      required: false,
    },
    productCategory: {
      type: [String],
      required: false,
    },
    productTags: {
      type: [String],
      required: false,
    },
    priceBefore: {
      type: Number,
      required: false,
    },
    inStock: {
      type: Number,
      required: true,
    },
    size: {
      type: [String],
      required: false,
    },
    color: {
      type: [[String]],
      required: false,
    },
    rating: {
      totalRating: Number,
      reviews: Number,
      required: false,
    },
    productDesc: {
      type: String,
      required: false,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Product", productSchema);
