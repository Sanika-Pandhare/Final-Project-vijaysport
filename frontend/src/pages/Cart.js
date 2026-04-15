
// import React, { useContext, useEffect, useState } from "react";
// import SummaryApi from "../common";
// import Context from "../context";
// import displayINRCurrency from "../helpers/displayCurrency";
// import { MdDelete } from "react-icons/md";

// const Cart = () => {
//   const [data, setData] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [showAddressModal, setShowAddressModal] = useState(false);
//   const [address, setAddress] = useState({
//     house: "",
//     area: "",
//     pincode: "",
//     city: "",
//     state: "",
//     landmark: "",
//   });

//   const context = useContext(Context);

//   // 🔹 Fetch cart
//   const fetchData = async () => {
//     const res = await fetch(SummaryApi.addToCartProductView.url, {
//       method: SummaryApi.addToCartProductView.method,
//       credentials: "include",
//       headers: { "content-type": "application/json" },
//     });
//     const result = await res.json();
//     console.log("add to card view product view :",result.data);
    
//     if (result.success) setData(result.data);
//   };

//   useEffect(() => {
//     setLoading(true);
//     fetchData().finally(() => setLoading(false));
//   }, []);

//   // 🔹 Totals
//   const totalQty = data.reduce((acc, item) => acc + item.quantity, 0);
//   const totalPrice = data.reduce(
//     (acc, item) => acc + item.quantity * item?.productId?.sellingPrice,
//     0
//   );

//   // 🔥 HANDLE PAYMENT
//   const handlePayment = async () => {
//     try {
//       const response = await fetch(SummaryApi.createOrder.url, {
//         method: SummaryApi.createOrder.method,
//         credentials: "include",
//         headers: { "content-type": "application/json" },
//         body: JSON.stringify({
//           amount: totalPrice,
//           address, // 🔥 send address also
//         }),
//       });

//       const data = await response.json();

//       const options = {
//         key: "rzp_test_SbqOG2TsjgzOL8",
//         amount: data.order.amount,
//         currency: "INR",
//         name: "Vijay Sport",
//         order_id: data.order.id,

//         handler: async function (response) {
//           const verifyRes = await fetch(SummaryApi.verifyPayment.url, {
//             method: SummaryApi.verifyPayment.method,
//             credentials: "include",
//             headers: { "content-type": "application/json" },
//             body: JSON.stringify(response),
//           });

//           const verifyData = await verifyRes.json();

//           if (verifyData.success) {
//             alert("Payment Successful");
//             window.location.href = "/profile";
//           } else {
//             alert("Payment Failed");
//           }
//         },
//       };

//       const rzp = new window.Razorpay(options);
//       rzp.open();

//     } catch (err) {
//       console.error(err);
//     }
//   };

//   // 🔥 HANDLE ADDRESS SUBMIT
//   const handleAddressSubmit = () => {
//     const { house, area, pincode, city, state } = address;

//     if (!house || !area || !pincode || !city || !state) {
//       alert("Fill all required fields");
//       return;
//     }

//     setShowAddressModal(false);
//     handlePayment(); // 🔥 payment after address
//   };

//   return (
//     <div className="container mx-auto p-4">

//       {/* CART ITEMS */}
//       <div className="flex flex-col lg:flex-row gap-10">
//         <div className="w-full max-w-3xl">
//           {data.map((product) => (
//             <div key={product._id} className="bg-white border rounded grid grid-cols-[128px,1fr] my-2">
//               <img
//                 src={product?.productId?.productImage[0]}
//                 className="w-32 h-32 object-contain"
//               />

//               <div className="p-3 relative">
//                 <div
//                   className="absolute right-2 top-2 text-red-600 cursor-pointer"
//                   onClick={() => {}}
//                 >
//                   <MdDelete />
//                 </div>

//                 <h2>{product?.productId?.productName}</h2>
//                 <p className="text-red-600">
//                   {displayINRCurrency(product?.productId?.sellingPrice)}
//                 </p>

//                 <p>Qty: {product.quantity}</p>
//               </div>
//             </div>
//           ))}
//         </div>

//         {/* SUMMARY */}
//         <div className="w-full max-w-sm">
//           <div className="bg-white p-4">
//             <h2 className="bg-red-600 text-white px-3 py-1">Summary</h2>

//             <div className="flex justify-between mt-2">
//               <p>Quantity</p>
//               <p>{totalQty}</p>
//             </div>

//             <div className="flex justify-between">
//               <p>Total Price</p>
//               <p>{displayINRCurrency(totalPrice)}</p>
//             </div>

//             {/* 🔥 NEW BUTTON */}
//             <button
//               className="bg-purple-600 text-white w-full mt-3 py-2"
//               onClick={() => setShowAddressModal(true)}
//             >
//               Add Delivery Address
//             </button>
//           </div>
//         </div>
//       </div>

//       {/* 🔥 ADDRESS MODAL */}
//       {showAddressModal && (
//         <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center">
//           <div className="bg-white p-5 w-full max-w-md rounded">

//             <h2 className="text-lg font-semibold mb-3">Add Address</h2>

//             <input placeholder="House / Building"
//               className="w-full border p-2 mb-2"
//               onChange={(e) => setAddress({ ...address, house: e.target.value })}
//             />

//             <input placeholder="Area"
//               className="w-full border p-2 mb-2"
//               onChange={(e) => setAddress({ ...address, area: e.target.value })}
//             />

//             <input placeholder="Pincode"
//               className="w-full border p-2 mb-2"
//               onChange={(e) => setAddress({ ...address, pincode: e.target.value })}
//             />

//             <input placeholder="City"
//               className="w-full border p-2 mb-2"
//               onChange={(e) => setAddress({ ...address, city: e.target.value })}
//             />

//             <input placeholder="State"
//               className="w-full border p-2 mb-2"
//               onChange={(e) => setAddress({ ...address, state: e.target.value })}
//             />

//             <input placeholder="Landmark (optional)"
//               className="w-full border p-2 mb-2"
//               onChange={(e) => setAddress({ ...address, landmark: e.target.value })}
//             />

//             <div className="flex justify-between mt-3">
//               <button
//                 className="bg-gray-400 px-4 py-2"
//                 onClick={() => setShowAddressModal(false)}
//               >
//                 Cancel
//               </button>

//               <button
//                 className="bg-purple-600 text-white px-4 py-2"
//                 onClick={handleAddressSubmit}
//               >
//                 Continue
//               </button>
//             </div>

//           </div>
//         </div>
//       )}

//     </div>
//   );
// };

// export default Cart;

import React, { useContext, useEffect, useState } from "react";
import SummaryApi from "../common";
import Context from "../context";
import displayINRCurrency from "../helpers/displayCurrency";
import { MdDelete } from "react-icons/md";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";

const Cart = () => {
  const [data, setData] = useState([]);
  const [showAddressModal, setShowAddressModal] = useState(false);
  const [processing, setProcessing] = useState(false);

  const context = useContext(Context);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  // 🔹 Fetch cart data
  const fetchData = async () => {
    try {
      const res = await fetch(SummaryApi.addToCartProductView.url, {
        method: SummaryApi.addToCartProductView.method,
        credentials: "include",
        headers: { "content-type": "application/json" },
      });

      const result = await res.json();

      if (result.success) {
        setData(result.data);
      }
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  // 🔹 Delete cart product
  const deleteCartProduct = async (id) => {
    try {
      await fetch(SummaryApi.deleteCartProduct.url, {
        method: SummaryApi.deleteCartProduct.method,
        credentials: "include",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ _id: id }),
      });

      toast.success("Item removed");
      fetchData();
      context.fetchUserAddToCart();
    } catch (err) {
      toast.error("Delete failed");
    }
  };

  // 🔹 totals
  const totalQty = data.reduce((acc, item) => acc + item.quantity, 0);

  const totalPrice = data.reduce(
    (acc, item) =>
      acc + item.quantity * item?.productId?.sellingPrice,
    0
  );

  // 🔥 MAIN FLOW: ORDER → PAYMENT → VERIFY
  const handleOrderAndPayment = async (formData) => {
    if (processing) return;

    setProcessing(true);

    try {
      // 🔹 prepare products
      const products = data.map((item) => ({
        productId: item.productId._id,
        name: item.productId.productName,
        price: item.productId.sellingPrice,
        quantity: item.quantity,
      }));

      // 🔹 create order
      const res = await fetch(SummaryApi.order.create.url, {
        method: SummaryApi.order.create.method,
        credentials: "include",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({
          products,
          totalAmount: totalPrice,
          address: formData,
        }),
      });

      const result = await res.json();

      if (!result.success) {
        toast.error("Order creation failed");
        setProcessing(false);
        return;
      }

      const orderId = result.data._id;

      // 🔹 Razorpay options
      const options = {
        key: "rzp_test_SbqOG2TsjgzOL8",
        amount: totalPrice * 100,
        currency: "INR",
        name: "Vijay Sport",
        description: "Order Payment",

        handler: async function (response) {
          try {
            const verifyRes = await fetch(
              SummaryApi.order.verifyPayment.url,
              {
                method: SummaryApi.order.verifyPayment.method,
                credentials: "include",
                headers: { "content-type": "application/json" },
                body: JSON.stringify({
                  orderId,
                  ...response,
                }),
              }
            );

            const verifyData = await verifyRes.json();

            if (verifyData.success) {
              toast.success("Payment Successful 🎉");

              // 🔥 clear cart (optional but important)
              data.forEach(async (item) => {
                await fetch(SummaryApi.deleteCartProduct.url, {
                  method: SummaryApi.deleteCartProduct.method,
                  credentials: "include",
                  headers: { "content-type": "application/json" },
                  body: JSON.stringify({ _id: item._id }),
                });
              });

              context.fetchUserAddToCart();
              reset();
              setShowAddressModal(false);

              window.location.href = "/profile";
            } else {
              toast.error("Payment Failed");
            }
          } catch (err) {
            toast.error("Verification failed");
          }

          setProcessing(false);
        },

        modal: {
          ondismiss: () => {
            toast.error("Payment cancelled");
            setProcessing(false);
          },
        },

        theme: {
          color: "#7c3aed",
        },
      };

      const rzp = new window.Razorpay(options);
      rzp.open();

    } catch (err) {
      console.error(err);
      toast.error("Something went wrong");
      setProcessing(false);
    }
  };

  return (
    <div className="container mx-auto p-4">

      {data.length === 0 && (
        <p className="text-center py-10">Cart is empty</p>
      )}

      <div className="flex flex-col lg:flex-row gap-8">

        {/* CART ITEMS */}
        <div className="w-full lg:w-2/3">
          {data.map((product) => (
            <div
              key={product._id}
              className="bg-white p-3 rounded shadow flex gap-4 mb-3"
            >
              <img
                src={product?.productId?.productImage[0]}
                className="w-24 h-24 object-contain"
              />

              <div className="flex-1">
                <h2 className="font-semibold">
                  {product?.productId?.productName}
                </h2>

                <p className="text-red-600">
                  {displayINRCurrency(
                    product?.productId?.sellingPrice
                  )}
                </p>

                <p>Qty: {product.quantity}</p>
              </div>

              <MdDelete
                className="text-red-600 cursor-pointer"
                onClick={() => deleteCartProduct(product._id)}
              />
            </div>
          ))}
        </div>

        {/* SUMMARY */}
        <div className="w-full lg:w-1/3">
          <div className="bg-white p-4 rounded shadow">
            <h2 className="bg-red-600 text-white px-3 py-1 mb-2">
              Summary
            </h2>

            <div className="flex justify-between">
              <p>Quantity</p>
              <p>{totalQty}</p>
            </div>

            <div className="flex justify-between">
              <p>Total Price</p>
              <p>{displayINRCurrency(totalPrice)}</p>
            </div>

            <button
              disabled={data.length === 0}
              className="bg-purple-600 text-white w-full mt-4 py-2 rounded disabled:bg-gray-400"
              onClick={() => setShowAddressModal(true)}
            >
              Add Delivery Address
            </button>
          </div>
        </div>
      </div>

      {/* 🔥 ADDRESS MODAL */}
      {showAddressModal && (
        <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-50">
          <form
            onSubmit={handleSubmit(handleOrderAndPayment)}
            className="bg-white p-6 w-full max-w-md rounded space-y-3"
          >
            <h2 className="text-lg font-semibold">
              Delivery Address
            </h2>

            <div>
              <label>House *</label>
              <input
                {...register("house", { required: true })}
                className="w-full border p-2 rounded"
              />
              {errors.house && (
                <p className="text-red-500 text-sm">Required</p>
              )}
            </div>

            <div>
              <label>Area *</label>
              <input
                {...register("area", { required: true })}
                className="w-full border p-2 rounded"
              />
            </div>

            <div className="grid grid-cols-2 gap-2">
              <input
                {...register("pincode", { required: true })}
                placeholder="Pincode"
                className="border p-2 rounded"
              />
              <input
                {...register("city", { required: true })}
                placeholder="City"
                className="border p-2 rounded"
              />
            </div>

            <input
              {...register("state", { required: true })}
              placeholder="State"
              className="border p-2 rounded w-full"
            />

            <input
              {...register("landmark")}
              placeholder="Landmark"
              className="border p-2 rounded w-full"
            />

            <div className="flex justify-between pt-3">
              <button
                type="button"
                onClick={() => setShowAddressModal(false)}
                className="bg-gray-300 px-4 py-2 rounded"
              >
                Cancel
              </button>

              <button
                disabled={processing}
                className="bg-purple-600 text-white px-4 py-2 rounded"
              >
                {processing ? "Processing..." : "Continue"}
              </button>
            </div>
          </form>
        </div>
      )}

    </div>
  );
};

export default Cart;