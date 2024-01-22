import { React, useState, useEffect } from "react";
import { toast } from "react-hot-toast";
import axios from "axios";
import { useFormik } from "formik";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLocationDot, faMoneyBill } from "@fortawesome/free-solid-svg-icons";
import { Link, useNavigate } from "react-router-dom";

import "./sass/paymentMethods.css";

const PaymentMethods = ({ orderInfo, setOrderInfo, headers }) => {
  const [isMethodSelected, setIsMethodSelected] = useState(false);
  const [active, setActive] = useState(0);

  const navigate = useNavigate();

  document.title = "Chose a payment method";

  useEffect(() => {
    let addressInfo = sessionStorage.getItem("addressInfo"); // stringified
    addressInfo = JSON.parse(addressInfo); // parsed
    setOrderInfo(addressInfo);
  }, []);

  const handleLinkClick = (index) => {
    setActive(index);
  };

  const selectMethod = (method) => {
    setOrderInfo({ ...orderInfo, paymentMethod: method });
    setIsMethodSelected(true);
  };

  const placeOrder = async () => {
    if (!isMethodSelected) return toast.error("must chose a payment method");

    const url = `${import.meta.env.VITE_BASE_URL}/api/v1/order`;
    try {
      const res = await axios.post(url, orderInfo, headers);
      navigate("/");
      toast.success(res.data.message);
    } catch (error) {
      console.log(error);
      toast.error("An error occurs");
    }
  };

  // console.log("address form info from paymentMethods:  ", orderInfo);

  return (
    <>
      <div className="payment-methods">
        <form method="post" className="payment-methods-form">
          <span className="payment-methods-header">Payment methods</span>
          <div
            className={
              active === 1
                ? "cash-on-delivery inputs active"
                : "cash-on-delivery inputs"
            }
            onClick={() => {
              handleLinkClick(1);
              selectMethod("cashOnDelivery");
            }}
          >
            <FontAwesomeIcon className="icon" icon={faMoneyBill} />
            <span>Cash on delivery</span>
          </div>

          <div className="btn">
            <button
              type="button"
              onClick={placeOrder}
              style={{ fontWeight: "500" }}
            >
              Place order
              <FontAwesomeIcon className="icon" icon={faLocationDot} />
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default PaymentMethods;
