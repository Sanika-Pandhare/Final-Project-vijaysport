const getAllOrders = async (req, res) => {
  try {
    const orders = await orderModel
      .find()
      .sort({ createdAt: -1 })
      .populate("userId")
      .populate("products.productId");

    res.json({ success: true, data: orders });

  } catch (err) {
    res.json({ success: false, message: err.message });
  }
};

module.exports = getAllOrders;