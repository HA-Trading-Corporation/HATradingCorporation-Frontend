import { React, useState, useEffect } from "react";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";

import ProfileSidebar from "../profileSidebar/ProfileSidebar";

import "../sass/profile.css";
import Spinner from "../../spinner/Spinner";

const Wishlist = ({ headers }) => {
  const [wishlistItems, setWishlistItems] = useState([]);
  const [reload, setReload] = useState(0);
  const [Loading, setLoading] = useState(true);

  const navigate = useNavigate();

  document.title = "My wishlist";

  useEffect(() => {
    const fetchData = async () => {
      const url = `${import.meta.env.VITE_BASE_URL}/api/v1/get-wishlist-items`;
      axios
        .get(url, headers)
        .then((res) => {
          setWishlistItems(res.data.data);
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
      const url = `${import.meta.env.VITE_BASE_URL}/api/v1/get-wishlist-items`;
      axios
        .get(url, headers)
        .then((res) => {
          setWishlistItems(res.data.data);
          setLoading(false);
        })
        .catch((err) => {
          console.log(err);
        });
    };

    fetchData();
  }, [reload]);

  const removeProduct = (id) => {
    const url = `${import.meta.env.VITE_BASE_URL}/api/v1/remove-from-wishlist`;
    axios
      .post(url, { id: id }, headers)
      .then((res) => {
        setReload(reload + 1);
      })
      .catch((err) => console.log(err));
  };

  const mappedWishlistItems = wishlistItems.map((values, index) => {
    return (
      <div key={index} className="wishlist-product">
        <div className="wishlist-product-info">
          <div className="wishlist-product-img">
            <img src={values.image} />
          </div>
          <div className="wishlist-product-headers">
            <span
              style={{ cursor: "pointer" }}
              onClick={() => navigate(`/products/${values.id}`)}
            >
              {values.name}
            </span>
            <span>Price: ৳{values.price} </span>
            <span onClick={() => removeProduct(values._id)} className="remove">
              <FontAwesomeIcon icon={faTrash} /> Remove
            </span>
          </div>
        </div>
      </div>
    );
  });

  return (
    <>
      <div className="profile">
        <ProfileSidebar />
        <main className="my-wishlist">
          <header>
            <span>My wishlists</span>
          </header>
          {/*  */}
          {Loading ? (
            <Spinner />
          ) : wishlistItems.length == 0 ? (
            <div className="wishlist-is-empty is-empty">
              <span>Wishlist is empty</span>
            </div>
          ) : (
            mappedWishlistItems
          )}
          {/*  */}
        </main>
      </div>
    </>
  );
};

export default Wishlist;
