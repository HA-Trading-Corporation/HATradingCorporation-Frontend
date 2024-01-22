import { React, useState, useEffect } from "react";
import axios from "axios";
import NotEmptyCart from "./notEmptyCart/NotEmptyCart";
import EmptyCart from "./emptyCart/EmptyCart";
import Spinner from "../spinner/Spinner";
import { useNavigate } from "react-router-dom";

const Cart = ({ headers }) => {
  let userCart = localStorage.getItem("user");
  userCart = JSON.parse(userCart);

  const [cartItems, setCartItems] = useState(
    userCart != null ? userCart.cart : ""
  );
  const [reload, setReload] = useState(1);
  const [Loading, setLoading] = useState(true);
  document.title = "Products cart";

  const navigate = useNavigate();

  useEffect(() => {
    const token = sessionStorage.getItem("token");
    if (!token) {
      navigate("/login");
    }
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      const url = `${import.meta.env.VITE_BASE_URL}/api/v1/get-cart-items`;
      axios
        .get(url, headers)
        .then((res) => {
          setCartItems(res.data.data);
          setLoading(false);
        })
        .catch((err) => {
          console.log(err);
        });
    };

    fetchData();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      const url = `${import.meta.env.VITE_BASE_URL}/api/v1/get-user-info`;

      try {
        const res = await axios.get(url, headers);
        sessionStorage.setItem("user", JSON.stringify(res.data));
        setLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    setLoading(true);
    const fetchData = async () => {
      const url = `${import.meta.env.VITE_BASE_URL}/api/v1/get-cart-items`;
      axios
        .get(url, headers)
        .then((res) => {
          setCartItems(res.data.data);
          setLoading(false);
        })
        .catch((err) => {
          console.log(err);
        });
    };

    fetchData();
  }, [reload]);

  return (
    <>
      {Loading ? (
        <Spinner />
      ) : cartItems.length == 0 ? (
        <EmptyCart />
      ) : (
        <NotEmptyCart
          cartItems={cartItems}
          reload={reload}
          setReload={setReload}
          headers={headers}
        />
      )}
    </>
  );
};

export default Cart;
