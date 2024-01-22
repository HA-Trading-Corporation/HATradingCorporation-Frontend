import React from "react";
import { Link } from "react-router-dom";
import "./sass/breadCrumb.css";

const BreadCrumb = ({ productName }) => {
  return (
    <>
      <div className="bread-crumb">
        <Link to="/" className="home">
          <p>Home</p>
        </Link>
        {"/"}
        <Link to="/products" className="home">
          <p>Products</p>
        </Link>
        {"/"} <p className="product-name">{productName}</p>
      </div>
    </>
  );
};

export default BreadCrumb;
