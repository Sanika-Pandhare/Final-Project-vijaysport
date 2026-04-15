// const mongoose = require("mongoose");

// const orderSchema = new mongoose.Schema(
//   {
//     userId: {
//       type: mongoose.Schema.Types.ObjectId,
//       ref: "user",
//       required: true,
//     },

//     products: [
//       {
//         productId: {
//           type: mongoose.Schema.Types.ObjectId,
//           ref: "product",
//           required: true,
//         },
//         quantity: {
//           type: Number,
//           required: true,
//           min: 1,
//         },
//       },
//     ],

//     totalAmount: {
//       type: Number,
//       required: true,
//       min: 0,
//     },

//     paymentId: {
//       type: String,
//       required: true,
//     },

//     orderId: {
//       type: String,
//       required: true,
//     },

//     paymentStatus: {
//       type: String,
//       enum: ["pending", "paid", "failed"],
//       default: "pending",
//     },
//   },
//   {
//     timestamps: true,
//   }
// );

// const orderModel = mongoose.model("order", orderSchema);

// module.exports = orderModel;


const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
      required: true,
    },

    products: [
      {
        productId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "product",
          required: true,
        },
        name: String, // 🔥 snapshot
        price: Number, // 🔥 snapshot
        quantity: {
          type: Number,
          required: true,
          min: 1,
        },
      },
    ],

    totalAmount: {
      type: Number,
      required: true,
    },

    // 🔥 DELIVERY ADDRESS (CRITICAL)
    address: {
      house: String,
      area: String,
      city: String,
      state: String,
      pincode: String,
      landmark: String,
    },

    // 🔥 PAYMENT INFO
    payment: {
      razorpay_order_id: String,
      razorpay_payment_id: String,
      razorpay_signature: String,
    },

    paymentStatus: {
      type: String,
      enum: ["pending", "paid", "failed"],
      default: "pending",
    },

    // 🔥 ORDER STATUS (ADMIN CONTROLLED)
    orderStatus: {
      type: String,
      enum: [
        "placed",
        "confirmed",
        "packed",
        "shipped",
        "out_for_delivery",
        "delivered",
        "cancelled",
      ],
      default: "placed",
    },

  },
  { timestamps: true }
);

module.exports = mongoose.model("order", orderSchema);