const orderModel = require("../../models/orderModel");

const createOrder = async (req, res) => {
  try {
    const userId = req.userId;
    const { products, totalAmount, address } = req.body;

    const newOrder = new orderModel({
      userId,
      products,
      totalAmount,
      address,
      paymentStatus: "pending",
    });

    const savedOrder = await newOrder.save();

    res.json({
      success: true,
      data: savedOrder,
    });

  } catch (err) {
    res.json({ success: false, message: err.message });
  }
};

module.exports = createOrder;