import React from "react";
import { Link } from "react-router-dom";
import "./sass/emptyCart.css";
import emptyCartSvg from "../../../assets/empty-cart.svg";

const EmptyCart = () => {
  return (
    <>
      <div className="empty-cart">
        <div className="empty-cart-items">
          <div className="empty-cart-svg">
            <img src={emptyCartSvg} alt="emptyCart" />
          </div>
          <div className="empty-cart-text">
            <span>Cart is empty!</span>
          </div>
          <div className="empty-cart-button">
            <Link to="/products">
              <button>View products</button>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default EmptyCart;
