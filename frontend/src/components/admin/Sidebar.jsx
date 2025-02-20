import { Link } from "react-router-dom";

const Sidebar = () => {
  return (
    <div className="w-64 bg-gray-900 text-white h-screen p-5">
      <h2 className="text-2xl font-bold">Admin Panel</h2>
      <ul className="mt-5 space-y-4">
        <li><Link to="/admin-dashboard" className="hover:text-gray-300">Dashboard</Link></li>
        <li><Link to="/admin-dashboard/products" className="hover:text-gray-300">Manage Products</Link></li>
        <li><Link to="/admin-dashboard/add-product" className="hover:text-gray-300">Add Product</Link></li>
      </ul>
    </div>
  );
};

export default Sidebar;
