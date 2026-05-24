const express = require("express");
const router = express.Router();

const Order = require("../models/Order");

router.post("/", async (req, res) => {
  try {
    const order = new Order(req.body);
    const savedOrder = await order.save();

    res.json(savedOrder);
  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
});

module.exports = router;