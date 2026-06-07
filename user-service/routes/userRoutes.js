const express = require("express");
const router = express.Router();

const User = require("../models/User");


// Create User
router.post("/", async (req, res) => {

  try {

    const user = await User.create({
      name: req.body.name,
      email: req.body.email
    });

    res.status(201).json(user);

  } catch (error) {

    res.status(500).json({
      message: error.message
    });
  }
});


// Get All Users
router.get("/", async (req, res) => {

  try {

    const users = await User.find();

    res.json(users);

  } catch (error) {

    res.status(500).json({
      message: error.message
    });
  }
});


// Get User By Id
router.get("/:id", async (req, res) => {

  try {

    const user = await User.findById(
      req.params.id
    );

    if (!user) {

      return res.status(404).json({
        message: "User not found"
      });
    }

    res.json(user);

  } catch (error) {

    res.status(500).json({
      message: error.message
    });
  }
});

module.exports = router;