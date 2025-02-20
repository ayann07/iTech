import { Routes, Route, } from "react-router-dom";
import Home from "./pages/Home";
import Navbar from "./components/Navbar";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Footer from "./components/Footer";
import AdminDashboardLayout from "./pages/admin_dashboard/AdminDashboardLayout";
import DashboardHome from "./pages/admin_dashboard/DashBoardHome";
import AddProduct from "./pages/admin_dashboard/AddProduct"
import ProtectedRoute from "./utils/ProtectedRoute";
import Products from "./pages/admin_dashboard/ManageProducts";
import EditProduct from "./pages/admin_dashboard/EditProduct";
import CustomerProtectedRoute from "./utils/CustomerProtectedRoute";
import Cart from "./pages/Cart";
import ManageProducts from "./pages/admin_dashboard/ManageProducts";
import ProductDetail from "./components/ProductDetail";
import Checkout from "./pages/Checkout";

function App() {

  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Signup />} />
        <Route path="/product-detail/:id" element={<ProductDetail/>}/>


        <Route element={<CustomerProtectedRoute />}>
           <Route path="/cart" element={<Cart />} /> 
           <Route path="/checkout" element={<Checkout />} /> 
        </Route>

        <Route element={<ProtectedRoute />}>
          <Route path="/admin-dashboard/*" element={<AdminDashboardLayout />}>
            <Route index element={<DashboardHome />} />
            <Route path="products" element={<ManageProducts />} />
            <Route path="add-product" element={<AddProduct />} />
            <Route path="edit-product/:id" element={<EditProduct/>}/>
          </Route>
        </Route>
      </Routes>
      <Footer />
    </>
  )
}

export default App
