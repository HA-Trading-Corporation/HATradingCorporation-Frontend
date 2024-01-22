import { React, useState, useEffect } from "react";
import axios from "axios";

import { useNavigate } from "react-router-dom";

import ProfileSidebar from "../profileSidebar/ProfileSidebar";
import Spinner from "../../spinner/Spinner";

import "../sass/profile.css";
import ReviewBox from "../reviewBox/ReviewBox";

const MyOrders = ({ headers }) => {
  const [myOrders, setMyOrders] = useState([]);
  const [Loading, setLoading] = useState(true);

  const [isFormVisible, setFormVisible] = useState(false);
  const [productId, setProductId] = useState();

  const [reload, setReload] = useState(0);

  const navigate = useNavigate();

  document.title = "My orders";

  useEffect(() => {
    const fetchData = async () => {
      const url = `${import.meta.env.VITE_BASE_URL}/api/v1/my-orders`;
      axios
        .get(url, headers)
        .then((res) => {
          setMyOrders(res.data.my_orders);
          setLoading(false);
        })
        .catch((err) => {
          console.log(err);
        });
    };

    fetchData();
  }, []);

  useEffect(() => {
    setLoading(true);

    const fetchData = async () => {
      const url = `${import.meta.env.VITE_BASE_URL}/api/v1/my-orders`;
      axios
        .get(url, headers)
        .then((res) => {
          setMyOrders(res.data.my_orders);
          setLoading(false);
        })
        .catch((err) => {
          console.log(err);
        });
    };

    fetchData();
  }, [reload]);

  const toggleFormVisibility = (productId) => {
    setFormVisible(!isFormVisible);
    setProductId(productId);
  };

  const mappedOrders = myOrders.map((values, index) => {
    const orderedProducts = values.orderedProducts;
    return (
      <div key={index} className="order">
        <div className="orderId-status">
          <h3>#{values._id}</h3>
          {values.status == "cancelled" ? (
            <span style={{ color: "red" }}>{values.status}</span>
          ) : (
            <span>{values.status}</span>
          )}
        </div>
        {orderedProducts.map((values, index) => {
          return (
            <div key={index} className="ordered-product">
              <div className="ordered-product-info">
                <div className="ordered-product-img">
                  <img src={values.product.image} />
                </div>
                <div className="ordered-product-headers">
                  <span
                    style={{ cursor: "pointer" }}
                    onClick={() => navigate(`/products/${values.product._id}`)}
                  >
                    {values.product.name}
                  </span>
                  <span>Quantity: {values.quantity}</span>
                  <span>Price: ৳{values.product.price} </span>
                  {values.status == "delivered" ? (
                    <button
                      type="button"
                      className="review-button"
                      onClick={() => toggleFormVisibility(values.product._id)}
                    >
                      Review
                    </button>
                  ) : null}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    );
  });

  return (
    <>
      <div className="profile">
        <ProfileSidebar />
        <main className="my-orders">
          <header>
            <span>My Orders</span>
          </header>
          {Loading ? (
            <Spinner />
          ) : myOrders.length == 0 ? (
            <div className="order-is-empty is-empty ">
              <span>No orders are available</span>
            </div>
          ) : (
            mappedOrders
          )}
        </main>
      </div>
      <ReviewBox
        isFormVisible={isFormVisible}
        setFormVisible={setFormVisible}
        productId={productId}
        setReload={setReload}
        headers={headers}
      />
    </>
  );
};

export default MyOrders;
