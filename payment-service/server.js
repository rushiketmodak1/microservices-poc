require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");

const paymentRoutes =
  require("./routes/paymentRoutes");

const app = express();

app.use(express.json());


// Mongo Connection
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {

    console.log(
      "Connected to paymentsdb"
    );

  })
  .catch((err) => {

    console.error(
      "Mongo Error:",
      err.message
    );

  });


// Health Check
app.get("/health", (req, res) => {

  res.status(200).json({
    service: "payment-service",
    status: "UP"
  });

});


// Routes
app.use(
  "/payments",
  paymentRoutes
);


app.listen(
  process.env.PORT,
  () => {

    console.log(
      `Payment Service running on port ${process.env.PORT}`
    );

  }
);