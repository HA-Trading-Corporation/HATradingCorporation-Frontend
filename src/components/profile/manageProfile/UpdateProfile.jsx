import React from "react";
import { toast } from "react-hot-toast";
import axios from "axios";
import { useFormik } from "formik";
import { useNavigate } from "react-router-dom";

import ProfileSidebar from "../profileSidebar/ProfileSidebar";

import "../sass/profile.css";

const UpdateProfile = ({ headers }) => {
  const navigate = useNavigate();

  document.title = "Update account";

  const stringifiedUser = sessionStorage.getItem("user");
  const user = JSON.parse(stringifiedUser);

  let initialValues = {
    name: user.name,
    username: user.username,
    phone: user.phone ? user.phone : "",
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
      // Manual validation for the "name" field
      if (!values.name) {
        errors.name = "Please enter your name";
      }

      if (values.name.length > 20) {
        errors.name = "Name can't be more than 10 words";
      }

      if (!values.username) {
        errors.username = "Please enter your email";
      }

      if (!values.phone) {
        errors.phone = "Please enter your number";
      }

      let numberAsString = values.phone.toString();
      let lengthOfNumber = numberAsString.length;

      if (lengthOfNumber !== 10) {
        // the len is set to 10 because it doesn't count 0
        errors.phone = "Please enter your number correctly";
      }

      return errors;
    },
  });

  return (
    <>
      <div className="profile">
        <ProfileSidebar />
        <main className="edit-profile">
          <header>
            <span>Edit profile</span>
          </header>
          <form
            method="post"
            className="edit-profile edit"
            onSubmit={Formik.handleSubmit}
          >
            {/* inputs */}
            <div className="inputs">
              <div className="name">
                <label>Name</label>
                <input
                  type="text"
                  placeholder="name"
                  onChange={Formik.handleChange}
                  onBlur={Formik.handleBlur}
                  value={Formik.values.name}
                  name="name"
                  required
                />
                {Formik.touched.name && Formik.errors.name && (
                  <span className="error">{Formik.errors.name}</span>
                )}
              </div>
              <div className="email">
                <label>Email</label>
                <input
                  type="email"
                  placeholder="email"
                  onChange={Formik.handleChange}
                  onBlur={Formik.handleBlur}
                  value={Formik.values.username}
                  name="username"
                  required
                />
                {Formik.touched.username && Formik.errors.username && (
                  <span className="error">{Formik.errors.username}</span>
                )}
              </div>
              <div className="phone">
                <label>Phone</label>
                <input
                  type="number"
                  placeholder="phone"
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
              <div className="password">
                <label>Password</label>
                <input
                  type="password"
                  placeholder="password"
                  onChange={(e) => e.target.value}
                  value={"***********"}
                  required
                />
              </div>
            </div>
            {/* inputs */}
            {/* buttons */}
            <div className="buttons">
              <button type="submit" className="btn">
                Save changes
              </button>
              <span>or</span>
              <input
                onClick={() => navigate("/account/profile/edit/password")}
                className="btn"
                type="button"
                value={"Change password"}
              />
            </div>
            {/* buttons */}
          </form>
        </main>
      </div>
    </>
  );
};

export default UpdateProfile;
