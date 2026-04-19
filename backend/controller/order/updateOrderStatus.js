const orderModel = require("../../models/orderModel.js");
const updateOrderStatus = async (req, res) => {
  try {
    const { orderId, status } = req.body;

    await orderModel.findByIdAndUpdate(orderId, {
      orderStatus: status,
    });

    res.json({ success: true });

  } catch (err) {
    res.json({ success: false, message: err.message });
  }
};

module.exports = updateOrderStatus;