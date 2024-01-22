import { React, useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import axios from "axios";
import {
  faBan,
  faList,
  faRotateLeft,
  faSearch,
  faTrash,
} from "@fortawesome/free-solid-svg-icons";

import Sidebar from "../sidebar/Sidebar";
import Spinner from "../../spinner/Spinner";

import "../sass/dashboard.css";

const DbOrders = ({ headers }) => {
  const [Loading, setLoading] = useState(true);
  const [reload, setReload] = useState(0);

  const [orders, setOrders] = useState([]);
  const [orderStatusAndId, setOrderStatusAndID] = useState({});

  const navigate = useNavigate();
  const orderList = <FontAwesomeIcon className="icon" icon={faList} />;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(
          `${import.meta.env.VITE_BASE_URL}/api/v1/all-orders`,
          headers
        );
        const orders = res.data.all_orders;
        setOrders(orders);
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
      try {
        const res = await axios.get(
          `${import.meta.env.VITE_BASE_URL}/api/v1/all-orders`,
          headers
        );
        const orders = res.data.all_orders;
        setOrders(orders);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [reload]);

  useEffect(() => {
    const updateOrderStatus = async () => {
      const url = `${import.meta.env.VITE_BASE_URL}/api/v1/change-order-status`;
      try {
        const res = await axios.post(url, orderStatusAndId, headers);
        setReload((prevCount) => prevCount + 1);
      } catch (error) {
        console.log(error);
      }
    };
    updateOrderStatus();
  }, [orderStatusAndId]);

  const handleReloadClick = () => {
    setReload((prevCount) => prevCount + 1);
    // setSearch(false);
  };

  const removeOrder = async (orderId) => {
    const url = `${import.meta.env.VITE_BASE_URL}/api/v1/remove-order`;

    axios
      .post(url, { orderId: orderId }, headers)
      .then((res) => {
        toast.success(res.data.message);
        setReload((prevCount) => prevCount + 1);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const all_orders = orders.map((value, index) => {
    let orderedProducts = value.orderedProducts;

    if (orders.length == 0) {
      return (
        <div className="not-found">
          <span>Orders not found!</span>
        </div>
      );
    } else {
      return (
        <div key={index}>
          <h3>{index + 1} :</h3>
          <div className="order">
            <div className="order-info">
              <span className="orderId">#{value._id}</span>
              <span>{value.fullName}</span>
              <span>{value.address}</span>
              <span>{` ${value.province} - ${value.city} - ${value.area}`}</span>
              <span>{`(+880) ${value.phone}`}</span>
              <span className="method">{`Payment: ${value.paymentMethod}`}</span>
            </div>

            <div className="icons options">
              <label for="dropdown">Status: </label>
              <select
                id="dropdown"
                name="dropdown"
                value={value.status}
                onChange={(e) =>
                  setOrderStatusAndID({
                    orderStatus: e.target.value,
                    orderId: value._id,
                    userId: value.userId,
                  })
                }
              >
                <option value="processing">processing</option>
                <option value="shipped">shipped</option>
                <option value="delivered">delivered</option>
                <option value="cancelled">cancelled</option>
              </select>

              {value.status == "delivered" ? (
                <FontAwesomeIcon
                  onClick={() => removeOrder(value._id)}
                  title="delete"
                  className="icon"
                  icon={faTrash}
                />
              ) : value.status == "cancelled" ? (
                <FontAwesomeIcon
                  onClick={() => removeOrder(value._id)}
                  title="delete"
                  className="icon"
                  icon={faTrash}
                />
              ) : null}
            </div>
          </div>

          <div className="ordered-products">
            {orderedProducts.map((value, index) => {
              return (
                <div
                  onDoubleClick={() =>
                    navigate(`/products/${value.product._id}`)
                  }
                  key={index}
                  className={index != 0 ? "product" : "product firstProduct"}
                >
                  <span>_id: {value.product._id}</span>
                  <span>Name: {value.product.name}</span>
                  <span>Category: {value.product.category}</span>
                  <span>Price: ৳{value.product.price}</span>
                  <span>Quantity: {value.quantity}</span>
                </div>
              );
            })}
          </div>
        </div>
      );
    }
  });

  return (
    <>
      <div className="admin-panel">
        <Sidebar />
        <main className="main-content">
          <header>
            <h1>{orderList} Orders</h1>
          </header>

          <nav className="tools-nav">
            <span>
              {orders.length == 1
                ? `(${orders.length} order is available)`
                : `(${orders.length} orders are available)`}
            </span>
            <div className="icons">
              <FontAwesomeIcon
                className="icon"
                title="reload"
                onClick={handleReloadClick}
                icon={faRotateLeft}
              />
            </div>
          </nav>

          {Loading ? (
            <Spinner />
          ) : orders.length == 0 ? (
            <div className="not-found">
              <span>Orders not found!</span>
            </div>
          ) : (
            <div className="orders-list">{all_orders}</div>
          )}
        </main>
      </div>
    </>
  );
};

export default DbOrders;
