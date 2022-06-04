const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: false,
    },
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    roles: {
      User: {
        type: Number,
        default: 8712,
      },
      Admin: Number,
      Moderator: Number,
    },
    otp: {
      type: String,
      required: false,
    },
    refreshToken: [String],
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", userSchema);
