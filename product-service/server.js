require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");

const productRoutes =
  require("./routes/productRoutes");

const app = express();

app.use(express.json());


// Mongo Connection
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {

    console.log(
      "Connected to productsdb"
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
    service: "product-service",
    status: "UP"
  });

});


// Routes
app.use(
  "/products",
  productRoutes
);


app.listen(
  process.env.PORT,
  () => {

    console.log(
      `Product Service running on port ${process.env.PORT}`
    );

  }
);