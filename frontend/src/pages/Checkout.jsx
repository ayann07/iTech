import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { clearOrder } from "../redux/orderSlice"
import { BASE_URL } from "../main";
import toast from "react-hot-toast";

const Checkout = () => {
  const { orderItems } = useSelector((state) => state.order);
  const {authToken} = useSelector((state)=>state.user)
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const totalPrice = orderItems.reduce((acc, item) => acc + item.subTotal, 0);

  const handleProceedToPayment = async () => {
    try {
      const orderData = {
        orderItems: orderItems.map(({ productId, quantity }) => ({
          productId,
          quantity,
        })),
      };
      const res = await fetch(`${BASE_URL}/orders/place`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': authToken
        },
        body: JSON.stringify(orderData)
      })
      const data = await res.json();
      if (!res.ok) {
        toast.error("Some error occured while placing order");
      }
      let orderId = data.data.id;

      const res2 = await fetch(`${BASE_URL}/stripe/create-checkout-session/${orderId}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': authToken
        }
      })
      if (!res2.ok) {
        toast.error("Some error occured while processing payment");
      }
      const data2 = await res2.json();
      const checkoutUrl = data2.data.sessionUrl;
      window.location.href = checkoutUrl;
    }
    catch (error) {
      toast.error(error.message || 'An unexpected error occurred');
    }

  };

  const handleCancel = () => {
    dispatch(clearOrder())
    navigate("/");
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

      {/* Action Buttons */}
      <div className="flex justify-center gap-4 mt-6">
        <button
          onClick={handleCancel}
          className="border-2 border-gray-800 font-semibold py-2 px-6 rounded-full bg-gray-800 text-white transition ease-in-out duration-300 "
        >
          Cancel
        </button>
        <button
          onClick={handleProceedToPayment}
          className="bg-gradient-to-r from-indigo-600 via-purple-600 to-indigo-700 text-white py-2 px-6 rounded-full hover:from-indigo-700 hover:to-purple-700 transition ease-in-out duration-300"
        >
          Proceed to Payment
        </button>


      </div>
    </div>
  );
};

export default Checkout;
