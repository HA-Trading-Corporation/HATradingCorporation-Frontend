import { React, useState } from "react";
import axios from "axios";
import "./sass/notEmptyCart.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";

const NotEmptyCart = ({ cartItems, reload, setReload, headers }) => {
  const navigate = useNavigate();
  const removeProduct = (id) => {
    const url = `${import.meta.env.VITE_BASE_URL}/api/v1/remove-from-cart`;
    axios
      .post(url, { id: id }, headers)
      .then((res) => {
        setReload(reload + 1);
      })
      .catch((err) => console.log(err));
  };

  const decreaseQuantity = (productId) => {
    const url = `${import.meta.env.VITE_BASE_URL}/api/v1/decrease-quantity`;
    axios
      .put(url, { id: productId }, headers)
      .then((res) => {
        setReload(reload + 1);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const increaseQuantity = (productId) => {
    const url = `${import.meta.env.VITE_BASE_URL}/api/v1/increase-quantity`;
    axios
      .put(url, { id: productId }, headers)
      .then((res) => {
        setReload(reload + 1);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  let totalPrice = cartItems.reduce(
    (total, cartItem) => total + cartItem.product.price,
    0
  );

  totalPrice = totalPrice.toFixed(2);

  const mappedCartProducts = cartItems.map((values, index) => {
    return (
      <div key={index} className="cart-product">
        <div className="cart-product-info">
          <div className="cart-product-img">
            <img src={values.product.image} />
          </div>
          <div className="cart-product-headers">
            <span>{values.product.name}</span>
            <span>Price: ৳{values.product.price} </span>
            <span onClick={() => removeProduct(values._id)} className="remove">
              <FontAwesomeIcon icon={faTrash} /> Remove
            </span>
          </div>
        </div>
        <div className="cart-product-quantity">
          <button onClick={() => decreaseQuantity(values._id)}>-</button>
          <span>{values.quantity}</span>
          <button onClick={() => increaseQuantity(values._id)}>+</button>
        </div>
      </div>
    );
  });

  return (
    <>
      <div className="cart">
        <div className="cart-list">{mappedCartProducts}</div>

        <div className="order-summary">
          <div className="order-summary-info">
            <div className="order-summary-header">
              <span>Order summary</span>
            </div>
            <div className="order-summary-subtotal">
              <span>Subtotal ({cartItems.length} items)</span>
              <span>৳{totalPrice}</span>
            </div>
            <div className="order-summary-delivery">
              <span>Delivery fee</span>
              <span>{"Free"}</span>
            </div>
            <div className="order-summary-total">
              <span>Total</span>
              <span>৳{totalPrice}</span>
            </div>
            <button
              className="check-out"
              onClick={() => navigate("checkout/address")}
            >
              Check out
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default NotEmptyCart;
