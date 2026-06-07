require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");

const userRoutes = require("./routes/userRoutes");

const app = express();

app.use(express.json());


// Mongo Connection
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {

    console.log(
      "Connected to usersdb"
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
    service: "user-service",
    status: "UP"
  });

});


// Routes
app.use("/users", userRoutes);


app.listen(
  process.env.PORT,
  () => {

    console.log(
      `User Service running on port ${process.env.PORT}`
    );

  }
);