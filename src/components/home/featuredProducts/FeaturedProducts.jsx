import React from "react";
import "./sass/featuredProducts.css";
import { Link } from "react-router-dom";

import ProductCard from "../../productCard/ProductCard";
import Spinner from "../../spinner/Spinner";

const FeaturedProducts = ({ ALL_PRODUCTS, ERROR, headers }) => {
  const limitedProductArray = ALL_PRODUCTS.slice(0, 8).map((product, index) => (
    <ProductCard
      key={product._id || index}
      id={product._id}
      title={product.name}
      price={product.price}
      imageUrl={product.imageUrls[0].secureUrl}
      stocks={product.stocks}
      headers={headers}
    />
  ));
  // console.log("hello", ERROR);
  return (
    <>
      <div className="FeaturedProducts">
        <header>
          <h1>Featured Products</h1>
          <Link style={{ color: "transparent" }} to="/products">
            <button>View all</button>
          </Link>
        </header>
        {ERROR ? (
          <Spinner />
        ) : (
          <div className="products">{limitedProductArray}</div>
        )}
      </div>
    </>
  );
};

export default FeaturedProducts;
