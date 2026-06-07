const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema(
  {
    userId: {
      type: String,
      required: true
    },

    productId: {
      type: String,
      required: true
    },

    productName: {
      type: String,
      required: true
    },

    amount: {
      type: Number,
      required: true
    },

    paymentId: {
      type: String,
      required: true
    },

    paymentStatus: {
      type: String,
      required: true
    }
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model(
  "Order",
  orderSchema
);