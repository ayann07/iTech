import { Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";

const CustomerProtectedRoute = () => {
  const { authToken, role } = useSelector((state) => state.user);
  const isAuthenticated = authToken && authToken !== "null";

  // Allow only logged-in users with role "CUSTOMER"
  return isAuthenticated && role === "CUSTOMER" ? <Outlet /> : <Navigate to="/" replace />;
};

export default CustomerProtectedRoute;
