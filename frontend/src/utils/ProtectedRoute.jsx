import { Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";

const ProtectedRoute = () => {
    const { authToken, role } = useSelector(state => state.user); // Get user state

    if (!authToken || role !== "ADMIN") {
        return <Navigate to="/" replace />; // Redirect to home instead of login
      }


    return <Outlet />;
};

export default ProtectedRoute;

