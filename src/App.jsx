import { React, useState, useEffect } from "react";
import "./App.css";
import { Routes, Route, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast, Toaster } from "react-hot-toast";
import Navbar from "./components/navbar/Navbar";
import NavbarV2 from "./components/navbarV2/NavbarV2";
import Home from "./components/home/Home";
import Footer from "./components/footer/Footer";
import Login from "./components/loginSignin/login/Login";
import Registration from "./components/loginSignin/registration/Registration";
import Cart from "./components/cart/Cart";
import AllProducts from "./components/allProducts/AllProducts";
import ProductDetails from "./components/productDetails/ProductDetails";
// dashboard
import Welcome from "./components/dashboard/welcome/Welcome";
import DbProducts from "./components/dashboard/dbProducts/DbProducts";
import CreateProduct from "./components/dashboard/dbProducts/CreateProduct";
import UpdateProduct from "./components/dashboard/dbProducts/UpdateProduct";
import DbOrders from "./components/dashboard/dbOrders/DbOrders";
// profile
import ManageProfile from "./components/profile/manageProfile/ManageProfile";
import UpdateProfile from "./components/profile/manageProfile/UpdateProfile";
import MyProfile from "./components/profile/manageProfile/MyProfile";
import ChangePassword from "./components/profile/manageProfile/ChangePassword";
import AddressBook from "./components/profile/addressBook/AddressBook";
import EditAddress from "./components/profile/addressBook/EditAddress";
import Wishlist from "./components/profile/wishlist/Wishlist";
import MyOrders from "./components/profile/myOrders/MyOrders";
// order
import AddressForm from "./components/order/addressForm/AddressForm";
import PaymentMethods from "./components/order/paymentMethods/PaymentMethods";

// route protectors
import Protected from "./Protected";
import IsAdmin from "./IsAdmin";

function App() {
  const [ALL_PRODUCTS, setALL_PRODUCTS] = useState([]);
  const [ALL_PRODUCTS_ERROR, setALL_PRODUCTS_ERROR] = useState();
  // search functions
  const [Search, setSearch] = useState(false);
  const [searchFiltered, setSearchFiltered] = useState([]);
  const [searchValue, setSearchValue] = useState();
  // Order states
  const [orderInfo, setOrderInfo] = useState();

  document.title = "H&A trading corporation";

  const navigate = useNavigate();

  // { testing
  // ------------api header--------------------------------
  const token = sessionStorage.getItem("token");
  const headers = {
    "Content-Type": "application/json",
    Authorization: `bearer ${token}`,
  };

  const config = {
    headers: headers,
  };
  // ------------api header--------------------------------
  // ------------log out--------------------------------
  const logout = () => {
    sessionStorage.removeItem("token");
    navigate("/login");
  };
  // ------------log out--------------------------------
  // } testing

  useEffect(() => {
    const url = `${import.meta.env.VITE_BASE_URL}/api/v1/all-products`;
    axios
      .get(url)
      .then((res) => {
        const data = res.data.all_products;
        setALL_PRODUCTS(data);
      })
      .catch((e) => {
        setALL_PRODUCTS_ERROR(e);
      });
  }, []);

  const handleSearch = (e) => {
    setSearch(true);
    navigate("/products");
    try {
      const filtered = ALL_PRODUCTS.filter((product) =>
        product.name.toLowerCase().includes(searchValue.toLowerCase())
      );
      setSearchFiltered(filtered);
    } catch (error) {
      console.log(error);
    }
  };

  const conditioned_navbar =
    token == undefined ? (
      <Navbar setSearchValue={setSearchValue} handleSearch={handleSearch} />
    ) : (
      <NavbarV2 setSearchValue={setSearchValue} handleSearch={handleSearch} />
    );

  return (
    <>
      <Toaster />
      {conditioned_navbar}

      <Routes>
        <Route
          path="/"
          element={
            <Home
              ALL_PRODUCTS={ALL_PRODUCTS}
              ERROR={ALL_PRODUCTS_ERROR}
              headers={config}
            />
          }
        />
        <Route path="/login" element={<Login />} />
        <Route path="/registration" element={<Registration />} />
        <Route path="/cart" element={<Cart headers={config} />} />
        <Route
          path="/products"
          element={
            <AllProducts
              Search={Search}
              setSearch={setSearch}
              searchFiltered={searchFiltered}
              ALL_PRODUCTS={ALL_PRODUCTS}
              ERROR={ALL_PRODUCTS_ERROR}
              headers={config}
            />
          }
        />
        <Route
          path="/products/:id"
          element={<ProductDetails headers={config} />}
        />
        {/* dashboard */}
        <Route
          path="/admin/dashboard"
          element={<IsAdmin Components={Welcome} headers={config} />}
        />
        <Route
          path="/admin/dashboard/products"
          element={<IsAdmin Components={DbProducts} headers={config} />}
        />
        <Route
          path="/admin/dashboard/products/create-product"
          element={<IsAdmin Components={CreateProduct} headers={config} />}
        />
        <Route
          path="/admin/dashboard/products/update-product/:id"
          element={<IsAdmin Components={UpdateProduct} headers={config} />}
        />
        <Route
          path="/admin/dashboard/orders"
          element={<IsAdmin Components={DbOrders} headers={config} />}
        />
        {/* profile */}
        <Route
          path="/account"
          element={<Protected Components={ManageProfile} headers={config} />}
        />
        <Route
          path="/account/profile"
          element={<Protected Components={MyProfile} headers={config} />}
        />
        <Route
          path="/account/profile/edit"
          element={<Protected Components={UpdateProfile} headers={config} />}
        />
        <Route
          path="/account/profile/edit/password"
          element={<Protected Components={ChangePassword} headers={config} />}
        />{" "}
        <Route
          path="/account/address"
          element={<Protected Components={AddressBook} headers={config} />}
        />
        <Route
          path="/account/address/edit"
          element={<Protected Components={EditAddress} headers={config} />}
        />{" "}
        <Route
          path="/account/wishlist"
          element={<Protected Components={Wishlist} headers={config} />}
        />{" "}
        <Route
          path="/account/myorders"
          element={<Protected Components={MyOrders} headers={config} />}
        />
        {/* order */}
        <Route
          path="/cart/checkout/address"
          element={
            <Protected
              Components={AddressForm}
              orderInfo={orderInfo}
              setOrderInfo={setOrderInfo}
              headers={config}
            />
          }
        />
        <Route
          path="/cart/checkout/payment"
          element={
            <Protected
              Components={PaymentMethods}
              orderInfo={orderInfo}
              setOrderInfo={setOrderInfo}
              headers={config}
            />
          }
        />
      </Routes>
      {/* <MessengerCustomerChat pageId="100063634398339" appId="<APP_ID>" />, */}
      <Footer />
    </>
  );
}

export default App;
