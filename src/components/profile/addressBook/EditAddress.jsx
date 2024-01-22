import React from "react";
import { toast } from "react-hot-toast";
import axios from "axios";
import { useFormik } from "formik";
import { useNavigate } from "react-router-dom";

import ProfileSidebar from "../profileSidebar/ProfileSidebar";

import "../sass/profile.css";

const EditAddress = ({ headers }) => {
  const navigate = useNavigate();

  document.title = "Update address";

  const stringifiedUser = sessionStorage.getItem("user");
  const user = JSON.parse(stringifiedUser);

  let initialValues = {
    fullName: user.fullName,
    phone: user.phone,
    province: user.province,
    city: user.city,
    area: user.area,
    address: user.address,
  };

  const Formik = useFormik({
    initialValues: initialValues,
    onSubmit: async (values, actions) => {
      const url = `${import.meta.env.VITE_BASE_URL}/api/v1/update-user`;
      await axios
        .put(url, values, headers)
        .then((res) => {
          toast.success(res.data.message);
          navigate("/account");
          actions.resetForm();
        })
        .catch((error) => {
          console.log(error);
        });
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
      <div className="profile">
        <ProfileSidebar />
        <main className="edit-address ">
          <header>
            <span>Edit address</span>
          </header>
          <form
            method="post"
            className="edit-address edit "
            onSubmit={Formik.handleSubmit}
          >
            {/* inputs */}
            <div className="inputs">
              <div className="full-name">
                <label>Full name</label>
                <input
                  type="text"
                  placeholder="full name"
                  onChange={Formik.handleChange}
                  onBlur={Formik.handleBlur}
                  value={Formik.values.fullName}
                  name="fullName"
                  required
                />
                {Formik.touched.fullName && Formik.errors.fullName && (
                  <span className="error">{Formik.errors.fullName}</span>
                )}
              </div>
              <div className="phone">
                <label>Phone</label>
                <input
                  type="number"
                  placeholder="Phone"
                  onChange={Formik.handleChange}
                  onBlur={Formik.handleBlur}
                  value={Formik.values.phone}
                  name="phone"
                  required
                />
                {Formik.touched.phone && Formik.errors.phone && (
                  <span className="error">{Formik.errors.phone}</span>
                )}
              </div>
              <div className="province">
                <label>Province</label>
                <input
                  type="text"
                  placeholder="province"
                  onChange={Formik.handleChange}
                  onBlur={Formik.handleBlur}
                  value={Formik.values.province}
                  name="province"
                  required
                />
                {Formik.touched.province && Formik.errors.province && (
                  <span className="error">{Formik.errors.province}</span>
                )}
              </div>{" "}
              <div className="city">
                <label>City</label>
                <input
                  type="text"
                  placeholder="city"
                  onChange={Formik.handleChange}
                  onBlur={Formik.handleBlur}
                  value={Formik.values.city}
                  name="city"
                  required
                />
                {Formik.touched.city && Formik.errors.city && (
                  <span className="error">{Formik.errors.city}</span>
                )}
              </div>{" "}
              <div className="area">
                <label>Area</label>
                <input
                  type="text"
                  placeholder="area"
                  onChange={Formik.handleChange}
                  onBlur={Formik.handleBlur}
                  value={Formik.values.area}
                  name="area"
                  required
                />
                {Formik.touched.area && Formik.errors.area && (
                  <span className="error">{Formik.errors.area}</span>
                )}
              </div>{" "}
              <div className="address">
                <label>Address</label>
                <input
                  type="text"
                  placeholder="address"
                  onChange={Formik.handleChange}
                  onBlur={Formik.handleBlur}
                  value={Formik.values.address}
                  name="address"
                  required
                />
                {Formik.touched.address && Formik.errors.address && (
                  <span className="error">{Formik.errors.address}</span>
                )}
              </div>
            </div>
            {/* inputs */}
            {/* buttons */}
            <div className="buttons">
              <button type="submit" className="btn">
                Save changes
              </button>
            </div>
            {/* buttons */}
          </form>
        </main>
      </div>
    </>
  );
};

export default EditAddress;
