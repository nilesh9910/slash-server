const mongoose = require("mongoose");

const cartSchema = new mongoose.Schema(
  {
    userId: {
      type: String,
      required: true,
    },
    cartItems: {
      product: {
        productId: {
          type: String,
          required: true,
        },
        size: {
          type: String,
          required: false,
        },
        color: {
          type: String,
          required: false,
        },
        quantity: {
          type: Number,
          default: 1,
          required: true,
        },
      },
    },
  },
  { timestamps: true }
);
