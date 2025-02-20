import React, { useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const Checkout = () => {
  const { orderItems } = useSelector((state) => state.order);
  const navigate = useNavigate();

  // State for user inputs
  const [paymentMethod, setPaymentMethod] = useState("");
  const [address, setAddress] = useState("");

  // Calculate total price
  const totalPrice = orderItems.reduce((acc, item) => acc + item.subTotal, 0);

  const handleProceed = () => {
    if (!paymentMethod || !address) {
      alert("Please fill in all fields before proceeding.");
      return;
    }

    // Redirect to payment page with order details
    navigate("/payment", {
      state: { orderItems, paymentMethod, address, totalPrice },
    });
  };

  return (
    <div className="max-w-3xl mx-auto p-8 bg-gray-100 rounded-xl shadow-lg mt-12 mb-12">
      <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">Checkout</h2>

      {/* Order Summary */}
      {orderItems.length > 0 ? (
        <div className="bg-white p-6 rounded-xl shadow-md">
          <h3 className="text-xl font-semibold text-gray-900 mb-4">Order Summary</h3>
          <ul className="space-y-4">
            {orderItems.map((item, index) => (
              <li key={index} className="flex justify-between items-center bg-gray-50 p-3 rounded-lg shadow-sm">
                <div>
                  <span className="text-lg font-medium text-gray-700">{item.name}</span>
                  <p className="text-sm text-gray-500">₹{item.price} × {item.quantity}</p>
                </div>
                <span className="text-lg font-semibold text-gray-900">₹{item.price * item.quantity}</span>
              </li>
            ))}
          </ul>
          <div className="border-t mt-4 pt-4 flex justify-between text-xl font-semibold text-gray-800">
            <span>Total:</span>
            <span className="text-blue-600">₹{totalPrice}</span>
          </div>
        </div>
      ) : (
        <p className="text-center text-lg text-gray-500">No items in your order.</p>
      )}

      {/* Payment & Address Section */}
      <div className="mt-8 bg-white p-6 rounded-xl shadow-md">
        <h3 className="text-xl font-semibold text-gray-900 mb-4">Payment & Address</h3>

        <label className="block text-gray-700 font-medium">Payment Method:</label>
        <select
          value={paymentMethod}
          onChange={(e) => setPaymentMethod(e.target.value)}
          className="w-full p-3 mt-2 border rounded-lg focus:ring-2 focus:ring-blue-400 transition"
        >
          <option value="">Select Payment Method</option>
          <option value="credit_card">Credit Card</option>
          <option value="paypal">PayPal</option>
          <option value="cash_on_delivery">Cash on Delivery</option>
        </select>

        <label className="block mt-6 text-gray-700 font-medium">Delivery Address:</label>
        <textarea
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          placeholder="Enter your full address"
          className="w-full p-3 mt-2 border rounded-lg focus:ring-2 focus:ring-blue-400 transition"
        />

<div className="flex justify-center mt-6">
  <button
    onClick={handleProceed}
    className="flex items-center bg-gradient-to-r from-indigo-600 via-purple-600 to-indigo-700 text-white py-2 px-6 rounded-full hover:from-indigo-700 hover:to-purple-700 transition ease-in-out duration-300"
  >
    Proceed to Payment
  </button>
</div>

      </div>
    </div>
  );
};

export default Checkout;
