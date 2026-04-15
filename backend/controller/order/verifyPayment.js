const orderModel = require("../../models/orderModel");

const verifyPayment = async (req, res) => {
  try {
    const { orderId, razorpay_payment_id, razorpay_signature } = req.body;

    // 🔥 update order
    await orderModel.findByIdAndUpdate(orderId, {
      paymentStatus: "paid",
      payment: {
        razorpay_payment_id,
        razorpay_signature,
      },
      orderStatus: "confirmed",
    });

    res.json({ success: true });

  } catch (err) {
    res.json({ success: false, message: err.message });
  }
};

module.exports = verifyPayment;