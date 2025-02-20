import React from "react";
import { motion } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";
import { FaShoppingBag } from "react-icons/fa";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../redux/userSlice"; // Import logout action
import { clearOrder } from "../redux/orderSlice"; 
import itech from "../assets/logo.png";

const Navbar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  
  // Get authToken and role from Redux state
  const { authToken, role } = useSelector((state) => state.user);
  const isLoggedIn = authToken && authToken !== "null"; // Ensure valid login

  const handleLogout = () => {
    dispatch(clearOrder())
    dispatch(logout());
    navigate("/", { replace: true }); // Redirect to home after logout
  };

  return (
    <nav className="bg-white p-4 shadow-md">
      <div className="container mx-auto flex justify-between items-center">
        {/* Logo */}
        <motion.div className="flex items-center space-x-4" whileHover={{ scale: 1.05 }}>
          <Link to='/'>
          <img src={itech} alt="Logo" className="h-10" />
          </Link>
          
        </motion.div>

        {/* Navigation Links */}
        <ul className="flex space-x-6 text-gray-800 font-medium">
          <li className="hover:text-gray-600 cursor-pointer">iPhone</li>
          <li className="hover:text-gray-600 cursor-pointer">MacBook</li>
          <li className="hover:text-gray-600 cursor-pointer">iPad</li>
          <li className="hover:text-gray-600 cursor-pointer">Watch</li>
          <li className="hover:text-gray-600 cursor-pointer">AirPods</li>
          <li className="hover:text-gray-600 cursor-pointer">Accessories</li>
          <li className="hover:text-gray-600 cursor-pointer">Student Offers</li>
          <li className="text-red-500 hover:text-red-700 cursor-pointer">Open Box</li>
        </ul>

        {/* Authentication & Role-Based Options */}
        <div className="flex items-center space-x-6">
          {isLoggedIn ? (
            <>
              {/* Show Cart for Customers */}
              {role === "CUSTOMER" && 
              <Link to="/cart">
              <FaShoppingBag className="text-gray-700 cursor-pointer text-xl" />
              </Link>
              }

              {/* Show Dashboard for Admins */}
              {role === "ADMIN" && (
                <Link to="/admin-dashboard">
                  <motion.button
                    className="bg-gradient-to-r from-purple-700 to-indigo-900 text-white px-6 py-3 rounded-full shadow-xl hover:from-purple-800 hover:to-indigo-950 transition transform hover:scale-105"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    Dashboard
                  </motion.button>
                </Link>
              )}

              {/* Logout Button */}
              <motion.button
                className="bg-red-600 text-white px-6 py-3 rounded-full shadow-xl hover:bg-red-700 transition transform hover:scale-105"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleLogout}
              >
                Logout
              </motion.button>
            </>
          ) : (
            <Link to="/login">
              <motion.button
                className="bg-gradient-to-r from-purple-700 to-indigo-900 text-white px-6 py-3 rounded-full shadow-xl hover:from-purple-800 hover:to-indigo-950 transition transform hover:scale-105"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Login
              </motion.button>
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

