const mongoose = require("mongoose");

const paymentSchema = new mongoose.Schema(
  {
    orderId: {
      type: String,
      default: null
    },

    amount: {
      type: Number,
      required: true
    },

    status: {
      type: String,
      default: "SUCCESS"
    }
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model(
  "Payment",
  paymentSchema
);