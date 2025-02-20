import { Outlet } from "react-router-dom";
import Sidebar from '../../components/admin/Sidebar'

const AdminDashboardLayout = () => {
    return (
        <div className="flex">
            {/* Sidebar */}
            <Sidebar />
            {/* Main Content */}
            <div className="w-full p-6">
                <Outlet /> {/* Renders the nested routes inside the dashboard */}
            </div>
        </div>
    );
};

export default AdminDashboardLayout;
