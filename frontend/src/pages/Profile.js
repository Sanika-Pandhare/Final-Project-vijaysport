// import React, { useEffect, useState } from 'react'
// import SummaryApi from '../common';

// const Profile = () => {
//     const [user, setUser] = useState(null)
//     const [orders, setOrders] = useState([])

//     // 🔥 Fetch user
//     const fetchUser = async () => {
//         const res = await fetch("http://localhost:8080/api/user-details", {
//             method: "GET",
//             credentials: "include"
//         })
//         const data = await res.json()

//         if (data.success) {
//             setUser(data.data)
//         }
//     }

//     // 🔥 Fetch orders
//     const fetchOrders = async () => {
//         const res = await fetch("http://localhost:8080/api/my-orders", {
//             method: "GET",
//             credentials: "include"
//         })
//         const data = await res.json()

//         if (data.success) {
//             setOrders(data.data)
//         }
//     }

//     useEffect(() => {
//         fetchUser()
//         fetchOrders()
//     }, [])

//     return (
//         <div className="container mx-auto p-6">

//             {/* 🔹 USER INFO */}
//             <div className="bg-white shadow-md rounded p-4 mb-6">
//                 <h2 className="text-xl font-bold mb-4">User Profile</h2>

//                 {user && (
//                     <div className="flex items-center gap-4">
//                         <img
//                             src={user.profilePic || "https://via.placeholder.com/80"}
//                             alt="profile"
//                             className="w-16 h-16 rounded-full"
//                         />

//                         <div>
//                             <p className="font-semibold">{user.name}</p>
//                             <p className="text-gray-600">{user.email}</p>
//                             <p className="text-sm text-gray-400">Role: {user.role}</p>
//                         </div>
//                     </div>
//                 )}
//             </div>

//             {/* 🔹 ORDER HISTORY */}
//             <div className="bg-white shadow-md rounded p-4">
//                 <h2 className="text-xl font-bold mb-4">Purchase History</h2>

//                 {orders.length === 0 ? (
//                     <p>No orders yet</p>
//                 ) : (
//                     orders.map(order => (
//                         <div key={order._id} className="border p-3 mb-3 rounded">
                            
//                             <div className="flex justify-between">
//                                 <p className="font-semibold">Order ID: {order.orderId}</p>
//                                 <p className="text-green-600">{order.paymentStatus}</p>
//                             </div>

//                             <p className="text-gray-600">
//                                 Total: ₹{order.totalAmount}
//                             </p>

//                             <p className="text-sm text-gray-400">
//                                 {new Date(order.createdAt).toLocaleString()}
//                             </p>

//                             {/* PRODUCTS */}
//                             <div className="mt-2">
//                                 {order.products.map((item, index) => (
//                                     <div key={index} className="text-sm">
//                                         Product ID: {item.productId} | Qty: {item.quantity}
//                                     </div>
//                                 ))}
//                             </div>

//                         </div>
//                     ))
//                 )}
//             </div>
//         </div>
//     )
// }

// export default Profile


import React, { useEffect, useState } from "react";
import SummaryApi from "../common";
import {
  ShoppingBag,
  Package,
  Truck,
  CheckCircle,
} from "lucide-react";

const Profile = () => {
  const [user, setUser] = useState(null);
  const [orders, setOrders] = useState([]);

  const steps = [
    {
      key: "placed",
      label: "Order Placed",
      icon: ShoppingBag,
    },
    {
      key: "packed",
      label: "Packed",
      icon: Package,
    },
    {
      key: "shipped",
      label: "In Transit",
      icon: Truck,
    },
    {
      key: "delivered",
      label: "Delivered",
      icon: CheckCircle,
    },
  ];

  const fetchUser = async () => {
    const res = await fetch(SummaryApi.current_user.url, {
      method: SummaryApi.current_user.method,
      credentials: "include",
    });

    const data = await res.json();

    if (data.success) {
      setUser(data.data);
    }
  };

  const fetchOrders = async () => {
    const res = await fetch(SummaryApi.order.myOrders.url, {
      method: SummaryApi.order.myOrders.method,
      credentials: "include",
    });

    const data = await res.json();

    if (data.success) {
      setOrders(data.data);
    }
  };

  useEffect(() => {
    fetchUser();
    fetchOrders();
  }, []);

  const getStepIndex = (status) => {
    if (status === "placed" || status === "confirmed") return 0;
    if (status === "packed") return 1;
    if (status === "shipped" || status === "out_for_delivery") return 2;
    if (status === "delivered") return 3;
    return 0;
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-6">

      {/* USER */}
      <div className="bg-white shadow rounded-2xl p-5 mb-6">
        <h2 className="text-2xl font-bold mb-4">My Profile</h2>

        {user && (
          <div className="flex items-center gap-4">
            <img
              src={user.profilePic || "https://via.placeholder.com/100"}
              alt="profile"
              className="w-20 h-20 rounded-full border object-cover"
            />

            <div>
              <p className="font-bold text-lg">{user.name}</p>
              <p className="text-gray-600">{user.email}</p>
            </div>
          </div>
        )}
      </div>

      {/* ORDERS */}
      <div className="bg-white shadow rounded-2xl p-5">
        <h2 className="text-2xl font-bold mb-5">Track Your Orders</h2>

        {orders.length === 0 ? (
          <p>No Orders Found</p>
        ) : (
          orders.map((order) => {
            const activeStep = getStepIndex(order.orderStatus);

            return (
              <div
                key={order._id}
                className="border rounded-2xl p-5 mb-6"
              >
                {/* TOP */}
                <div className="flex flex-col md:flex-row md:justify-between gap-2 mb-5">
                  <div>
                    <p className="font-bold text-sm">
                      Order ID : {order._id}
                    </p>
                    <p className="text-sm text-gray-500">
                      {new Date(order.createdAt).toLocaleString()}
                    </p>
                  </div>

                  <div className="md:text-right">
                    <p className="font-bold text-lg">
                      ₹{order.totalAmount}
                    </p>
                    <p className="text-green-600 font-semibold capitalize">
                      {order.paymentStatus}
                    </p>
                  </div>
                </div>

                {/* PRODUCTS */}
                <div className="mb-6">
                  <p className="font-semibold mb-2">Products</p>

                  {order.products.map((item, index) => (
                    <div
                      key={index}
                      className="flex justify-between text-sm border-b py-1"
                    >
                      <span>{item.name}</span>
                      <span>Qty : {item.quantity}</span>
                    </div>
                  ))}
                </div>

                {/* TRACKER */}
                <div className="overflow-x-auto">
                  <div className="min-w-[650px] flex items-center justify-between relative">

                    {steps.map((step, index) => {
                      const Icon = step.icon;
                      const completed = index <= activeStep;

                      return (
                        <div
                          key={step.key}
                          className="flex-1 flex flex-col items-center relative"
                        >
                          {/* LINE */}
                          {index !== steps.length - 1 && (
                            <div
                              className={`absolute top-6 left-1/2 w-full h-1 ${
                                index < activeStep
                                  ? "bg-blue-500"
                                  : "bg-gray-300"
                              }`}
                            />
                          )}

                          {/* CIRCLE */}
                          <div
                            className={`z-10 w-14 h-14 rounded-full flex items-center justify-center border-2 ${
                              completed
                                ? "bg-blue-100 border-blue-500 text-blue-600"
                                : "bg-white border-gray-300 text-gray-400"
                            }`}
                          >
                            <Icon size={24} />
                          </div>

                          {/* LABEL */}
                          <p className="text-sm text-center mt-2 font-medium px-1">
                            {step.label}
                          </p>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* STATUS */}
                <p className="mt-5 text-sm font-semibold text-blue-600 capitalize">
                  Current Status : {order.orderStatus.replaceAll("_", " ")}
                </p>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};

export default Profile;