const mongoose = require("mongoose");

// define schema
const UserSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    mobile_number: {
      type: String,
    },
    gender: {
      type: String,
    },
    state: {
      type: String,
    },
    city: {
      type: String,
    },
    name: {
      type: String,
    },
    pincode: {
      type: String,
    },
    password: {
      type: String,
      required: true,
    },
    image: {
      public_id: {
        type: String,
      },
      url: {
        type: String,
      },
    },
    role: {
      type: String,
      default: "student",
    },
  },
  { timestamps: true }
);

// create collection

const UserModal = mongoose.model("users", UserSchema);
module.exports = UserModal;
