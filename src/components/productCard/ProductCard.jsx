import React from "react";
import axios from "axios";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";

import "./sass/productCard.css";

const ProductCard = ({ id, title, price, imageUrl, stocks, headers }) => {
  const navigate = useNavigate();

  const addToCart = () => {
    if (stocks < 1) return toast.error("product is out of stock");
    else {
      const url = `${import.meta.env.VITE_BASE_URL}/api/v1/add-to-cart`;
      const values = {
        product_id: id,
        stocks: stocks,
        quantity: 1,
      };
      axios
        .put(url, values, headers)
        .then((res) => {
          navigate("/cart");
        })
        .catch((err) => {
          console.log(err);
          toast.error(err.response.data.message);
        });
    }
  };

  return (
    <>
      <div className="product-card">
        <div
          className="product-image"
          onClick={() => navigate(`/products/${id}`)}
        >
          <img src={imageUrl} />
        </div>
        <div className="product-info">
          <span className="product-title">{title}</span>
          <p className="product-price">৳{price}</p>
          {/* <p className="product-id">{id}</p> */}
          <button onClick={addToCart} className="add-to-cart-button">
            Add to Cart
          </button>
        </div>
      </div>
    </>
  );
};

export default ProductCard;
