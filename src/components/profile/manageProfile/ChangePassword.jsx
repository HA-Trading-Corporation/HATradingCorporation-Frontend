import React from "react";
import { toast } from "react-hot-toast";
import axios from "axios";
import { useFormik } from "formik";

import ProfileSidebar from "../profileSidebar/ProfileSidebar";

import "../sass/profile.css";

const ChangePassword = ({ headers }) => {
  let initialValues = {
    password: "",
    confirmPassword: "",
    newPassword: "",
  };

  document.title = "Update password";

  const Formik = useFormik({
    initialValues: initialValues,
    onSubmit: async (values, actions) => {
      const url = `${import.meta.env.VITE_BASE_URL}/api/v1/change-pass`;
      await axios
        .put(url, values, headers)
        .then((res) => {
          toast.success(res.data.message);
          navigate("/account");
          actions.resetForm();
        })
        .catch((error) => {
          console.log(error);
          toast.error(error.response.data.message);
          actions.resetForm();
        });
    },
    validate: (values) => {
      const errors = {};
      if (!values.password) {
        errors.password = "Please enter your password";
      }
      if (!values.confirmPassword) {
        errors.confirmPassword = "Please confirm your password";
      }

      if (!values.newPassword) {
        errors.newPassword = "Please enter your new password";
      }
      return errors;
    },
  });

  return (
    <>
      <div className="profile">
        <ProfileSidebar />
        <main>
          <header>
            <span>Change password</span>
          </header>
          <form className="change-password" onSubmit={Formik.handleSubmit}>
            <div className="inputs">
              <div className="password">
                <label>Password</label>
                <input
                  type="password"
                  placeholder="password"
                  onChange={Formik.handleChange}
                  onBlur={Formik.handleBlur}
                  value={Formik.values.password}
                  name="password"
                  required
                />
                {Formik.touched.password && Formik.errors.password && (
                  <span className="error">{Formik.errors.password}</span>
                )}
              </div>
              <div className="confirm-password">
                <label>Confirm password</label>
                <input
                  type="password"
                  placeholder="confirm password"
                  onChange={Formik.handleChange}
                  onBlur={Formik.handleBlur}
                  value={Formik.values.confirmPassword}
                  name="confirmPassword"
                  required
                />
                {Formik.touched.confirmPassword &&
                  Formik.errors.confirmPassword && (
                    <span className="error">
                      {Formik.errors.confirmPassword}
                    </span>
                  )}
              </div>
              <div className="new-password">
                <label>New password</label>
                <input
                  type="password"
                  placeholder="new password"
                  onChange={Formik.handleChange}
                  onBlur={Formik.handleBlur}
                  value={Formik.values.newPassword}
                  name="newPassword"
                  required
                />
                {Formik.touched.newPassword && Formik.errors.newPassword && (
                  <span className="error">{Formik.errors.newPassword}</span>
                )}
              </div>
            </div>
            <button type="submit">Change password </button>
          </form>
        </main>
      </div>
    </>
  );
};

export default ChangePassword;
