const express = require("express");
const axios = require("axios");

const router = express.Router();

const Order = require("../models/Order");


// Create Order
router.post("/", async (req, res) => {

  try {

    const {
      userId,
      productId
    } = req.body;

    console.log(
      "Fetching Product..."
    );

    const productResponse =
      await axios.get(
        `${process.env.PRODUCT_URL}/products/${productId}`
      );

    const product =
      productResponse.data;

    console.log(
      "Product Found:",
      product.name
    );

    console.log(
      "Calling Payment Service..."
    );

    const paymentResponse =
      await axios.post(
        `${process.env.PAYMENT_URL}/payments`,
        {
          amount: product.price
        }
      );

    const payment =
      paymentResponse.data;

    console.log(
      "Payment Success"
    );

    const order =
      await Order.create({

        userId,

        productId,

        productName:
          product.name,

        amount:
          product.price,

        paymentId:
          payment._id,

        paymentStatus:
          payment.status
      });

    console.log(
      "Order Created"
    );

    res.status(201).json(order);

  } catch (error) {

    console.error(error);

    res.status(500).json({
      message: error.message
    });
  }
});


// Get All Orders
router.get("/", async (req, res) => {

  try {

    const orders =
      await Order.find();

    res.json(orders);

  } catch (error) {

    res.status(500).json({
      message: error.message
    });
  }
});


// Get Order By Id
router.get("/:id", async (req, res) => {

  try {

    const order =
      await Order.findById(
        req.params.id
      );

    if (!order) {

      return res.status(404).json({
        message:
          "Order not found"
      });
    }

    res.json(order);

  } catch (error) {

    res.status(500).json({
      message: error.message
    });
  }
});

module.exports = router;