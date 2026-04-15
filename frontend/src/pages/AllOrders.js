import React, { useEffect, useState } from "react";
import SummaryApi from "../common/index.js";
import displayINRCurrency from "../helpers/displayCurrency";
import { toast } from "react-toastify";

const AllOrders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);

  const statusOptions = [
    "placed",
    "confirmed",
    "packed",
    "shipped",
    "out_for_delivery",
    "delivered",
    "cancelled",
  ];

  // 🔹 Fetch all orders
  const fetchOrders = async () => {
  setLoading(true);
  try {
    const res = await fetch(SummaryApi.order.allOrders.url, {
      method: SummaryApi.order.allOrders.method,
      credentials: "include",
    });

    const result = await res.json();
    console.log("API result:", result);

    const ordersData = result?.data || result;

    if (Array.isArray(ordersData)) {
      setOrders(ordersData);
    } else {
      toast.error("No orders found");
    }

  } catch (err) {
    toast.error("Failed to fetch orders");
  }
  setLoading(false);
};

  useEffect(() => {
    fetchOrders();
  }, []);

  // 🔥 Update order status
  const updateStatus = async (orderId, status) => {
    try {
      const res = await fetch(SummaryApi.order.updateStatus.url, {
        method: SummaryApi.order.updateStatus.method,
        credentials: "include",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ orderId, status }),
      });

      const result = await res.json();

      if (result.success) {
        toast.success("Status updated");
        fetchOrders(); // refresh
      } else {
        toast.error("Update failed");
      }
    } catch (err) {
      toast.error("Error updating");
    }
  };

  return (
    <div className="p-4">

      <h2 className="text-xl font-semibold mb-4">All Orders</h2>

      {loading && <p>Loading...</p>}

      {!loading && orders.length === 0 && <p>No orders found</p>}

      <div className="space-y-4">

        {orders.map((order) => (
          <div
            key={order._id}
            className="bg-white p-4 rounded shadow"
          >
            {/* 🔹 Top Info */}
            <div className="flex justify-between flex-wrap gap-2">
              <p><b>Order ID:</b> {order._id}</p>
              <p><b>Total:</b> {displayINRCurrency(order.totalAmount)}</p>
              <p><b>Payment:</b> {order.paymentStatus}</p>
            </div>

            {/* 🔹 Address */}
            <div className="mt-2 text-sm text-gray-600">
              <p>
                {order.address?.house}, {order.address?.area},{" "}
                {order.address?.city}, {order.address?.state} -{" "}
                {order.address?.pincode}
              </p>
            </div>

            {/* 🔹 Products */}
            <div className="mt-3">
              <p className="font-semibold">Products:</p>

              {order.products.map((item, i) => (
                <div key={i} className="text-sm">
                  {item.name} × {item.quantity} ={" "}
                  {displayINRCurrency(item.price)}
                </div>
              ))}
            </div>

            {/* 🔥 STATUS UPDATE */}
            <div className="mt-3 flex items-center gap-3">

              <label>Status:</label>

              <select
                value={order.orderStatus}
                onChange={(e) =>
                  updateStatus(order._id, e.target.value)
                }
                className="border p-1 rounded"
              >
                {statusOptions.map((status) => (
                  <option key={status} value={status}>
                    {status}
                  </option>
                ))}
              </select>

            </div>
          </div>
        ))}

      </div>
    </div>
  );
};

export default AllOrders;