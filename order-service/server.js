require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");

const orderRoutes =
  require("./routes/orderRoutes");

const app = express();

app.use(express.json());


// Mongo Connection
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {

    console.log(
      "Connected to ordersdb"
    );

  })
  .catch((err) => {

    console.error(
      err.message
    );

  });


// Health Endpoint
app.get("/health", (req, res) => {

  res.json({
    service:
      "order-service",
    status: "UP"
  });

});


// Routes
app.use(
  "/orders",
  orderRoutes
);


app.listen(
  process.env.PORT,
  () => {

    console.log(
      `Order Service running on port ${process.env.PORT}`
    );

  }
);