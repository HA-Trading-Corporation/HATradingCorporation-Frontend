import React from "react";
import axios from "axios";
import { useFormik } from "formik";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUser,
  faPhone,
  faLocationDot,
  faCity,
  faMap,
  faMapLocationDot,
  faArrowRight,
} from "@fortawesome/free-solid-svg-icons";
import { Link, useNavigate } from "react-router-dom";

import "./sass/addressForm.css";

const AddressForm = ({ orderInfo, setOrderInfo, headers }) => {
  const navigate = useNavigate();

  document.title = "Address form";

  const stringifiedUser = sessionStorage.getItem("user");
  const user = JSON.parse(stringifiedUser);

  let initialValues = {
    fullName: user ? user.fullName : "",
    phone: user ? user.phone : "",
    province: user ? user.province : "",
    city: user ? user.city : "",
    area: user ? user.area : "",
    address: user ? user.address : "",
  };

  const Formik = useFormik({
    initialValues: initialValues,
    onSubmit: async (values, actions) => {
      // console.log("VALUE: ", values);
      sessionStorage.setItem("addressInfo", JSON.stringify(values));
      navigate("/cart/checkout/payment");
      actions.resetForm();
    },
    validate: (values) => {
      const errors = {};

      if (!values.fullName) {
        errors.fullName = "Please enter your full name";
      }

      if (values.fullName.length > 20) {
        errors.fullName = "Name can't be more than 10 words";
      }

      if (!values.province) {
        errors.province = "Please enter your province";
      }
      if (!values.city) {
        errors.city = "Please enter your city";
      }
      if (!values.area) {
        errors.area = "Please enter your area";
      }
      if (!values.address) {
        errors.address = "Please enter your address";
      }

      if (!values.phone) {
        errors.phone = "Please enter your number";
      }

      let numberAsString = values.phone.toString();
      let lengthOfNumber = numberAsString.length;

      if (lengthOfNumber !== 10) {
        errors.phone = "Please enter your number correctly";
      }

      return errors;
    },
  });

  return (
    <>
      <div className="shipping-info">
        <form
          method="post"
          className="shipping-info-form"
          onSubmit={Formik.handleSubmit}
        >
          <span className="shipping-info-header">Shipping info</span>
          <div className="fullName inputs">
            <FontAwesomeIcon className="icon" icon={faUser} />
            <input
              type="text"
              name="fullName"
              style={{ width: "100%" }}
              placeholder="Full name"
              onChange={Formik.handleChange}
              onBlur={Formik.handleBlur}
              value={Formik.values.fullName}
              autoComplete="fullName"
              required
            />
          </div>

          <div className="phone inputs">
            <FontAwesomeIcon className="icon" icon={faPhone} />
            <input
              type="number"
              name="phone"
              style={{ width: "100%" }}
              placeholder="Phone"
              onChange={Formik.handleChange}
              onBlur={Formik.handleBlur}
              value={Formik.values.phone}
              autoComplete="phone"
              required
            />
          </div>

          <div className="province inputs">
            <FontAwesomeIcon className="icon" icon={faMap} />

            <input
              type="text"
              name="province"
              style={{ width: "100%" }}
              placeholder="province"
              onChange={Formik.handleChange}
              onBlur={Formik.handleBlur}
              value={Formik.values.province}
              autoComplete="province"
              required
            />
          </div>

          <div className="city inputs">
            <FontAwesomeIcon className="icon" icon={faCity} />
            <input
              type="text"
              name="city"
              style={{ width: "100%" }}
              placeholder="city"
              onChange={Formik.handleChange}
              onBlur={Formik.handleBlur}
              value={Formik.values.city}
              autoComplete="city"
              required
            />
          </div>

          <div className="area inputs">
            <FontAwesomeIcon className="icon" icon={faMapLocationDot} />
            <input
              type="text"
              name="area"
              style={{ width: "100%" }}
              placeholder="area"
              onChange={Formik.handleChange}
              onBlur={Formik.handleBlur}
              value={Formik.values.area}
              autoComplete="area"
              required
            />
          </div>

          <div className="address inputs">
            <FontAwesomeIcon className="icon" icon={faLocationDot} />
            <input
              type="text"
              name="address"
              style={{ width: "100%" }}
              placeholder="address"
              onChange={Formik.handleChange}
              onBlur={Formik.handleBlur}
              value={Formik.values.address}
              autoComplete="address"
              required
            />
          </div>

          <div className="btn">
            <button type="submit" style={{ fontWeight: "500" }}>
              continue
              <FontAwesomeIcon className="icon" icon={faArrowRight} />
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default AddressForm;
