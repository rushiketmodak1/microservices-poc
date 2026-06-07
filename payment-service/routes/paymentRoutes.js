const express = require("express");

const router = express.Router();

const Payment = require("../models/Payment");


// Create Payment
router.post("/", async (req, res) => {

  try {

    const payment = await Payment.create({
      orderId: req.body.orderId || null,
      amount: req.body.amount,
      status: "SUCCESS"
    });

    res.status(201).json(payment);

  } catch (error) {

    res.status(500).json({
      message: error.message
    });
  }
});


// Get All Payments
router.get("/", async (req, res) => {

  try {

    const payments = await Payment.find();

    res.json(payments);

  } catch (error) {

    res.status(500).json({
      message: error.message
    });
  }
});


// Get Payment By Id
router.get("/:id", async (req, res) => {

  try {

    const payment = await Payment.findById(
      req.params.id
    );

    if (!payment) {

      return res.status(404).json({
        message: "Payment not found"
      });
    }

    res.json(payment);

  } catch (error) {

    res.status(500).json({
      message: error.message
    });
  }
});

module.exports = router;