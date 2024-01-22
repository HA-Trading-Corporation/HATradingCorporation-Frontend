import { React, useState, useEffect } from "react";
import { toast } from "react-hot-toast";
import { GoogleLogin } from "@react-oauth/google";
import axios from "axios";
import { useFormik } from "formik";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import "./sass/registration.css";
import { Link, useNavigate } from "react-router-dom";

const Registration = () => {
  const [showPass, setShowPass] = useState(false);

  document.title = "Registration";

  const navigate = useNavigate();

  useEffect(() => {
    const token = sessionStorage.getItem("token");
    if (token) {
      navigate("/");
    }
  }, []);

  let initialValues = {
    name: "",
    username: "",
    password: "",
  };

  const Formik = useFormik({
    initialValues: initialValues,
    onSubmit: async (values, actions) => {
      const url = `${import.meta.env.VITE_BASE_URL}/register`;
      await axios
        .post(url, values)
        .then((res) => {
          sessionStorage.setItem("token", res.data.token);
          actions.resetForm();
          toast.success(res.data.message);
          navigate("/account");
        })
        .catch((e) => {
          console.log(e);
          const errorMessage = e.response.data.message;
          toast.error(errorMessage);
        });
    },
    validate: (values) => {
      const errors = {};
      // Manual validation for the "name" field
      if (!values.name) {
        errors.name = "Please enter your name";
      }
      if (!values.username) {
        errors.username = "Please enter your email";
      }
      if (!values.password) {
        errors.password = "Please enter your password";
      }

      return errors;
    },
  });

  const togglePasswordVisibility = () => {
    setShowPass(!showPass);
  };

  const link = (
    <Link style={{ textDecoration: "none" }} to="/login">
      <span> Login </span>
    </Link>
  );

  return (
    <>
      <div className="registration">
        <form
          method="post"
          className="registration-form"
          onSubmit={Formik.handleSubmit}
        >
          <span className="registration-header">Register here</span>
          <div className="name inputs">
            <input
              type="text"
              name="name"
              placeholder="Full name"
              style={{ width: "100%" }}
              onChange={Formik.handleChange}
              onBlur={Formik.handleBlur}
              value={Formik.values.name}
              min="3"
              max="10"
              autoComplete="name"
              required
            />
          </div>
          {Formik.touched.name && Formik.errors.name && (
            <div className="error">{Formik.errors.name}</div>
          )}
          <div className="email inputs">
            <input
              type="email"
              name="username"
              placeholder="Email"
              style={{ width: "100%" }}
              onChange={Formik.handleChange}
              onBlur={Formik.handleBlur}
              value={Formik.values.username}
              autoComplete="username"
              required
            />
          </div>
          {Formik.touched.username && Formik.errors.username && (
            <div className="error">{Formik.errors.username}</div>
          )}
          <div className="passwd inputs">
            <input
              type={showPass ? "text" : "password"}
              name="password"
              placeholder="Password"
              onChange={Formik.handleChange}
              onBlur={Formik.handleBlur}
              value={Formik.values.password}
              autoComplete="current-password"
              required
            />

            <FontAwesomeIcon
              className="show-pass"
              icon={showPass ? faEyeSlash : faEye}
              onClick={togglePasswordVisibility}
            />
          </div>
          {Formik.touched.password && Formik.errors.password && (
            <div className="error">{Formik.errors.password}</div>
          )}
          <div className="btn">
            <button type="submit" style={{ fontWeight: "500" }}>
              Register
            </button>
          </div>

          <span className="or">or</span>

          <div className="google-auth">
            <GoogleLogin
              onSuccess={async (credentialResponse) => {
                console.log(credentialResponse);
                const url = `${
                  import.meta.env.VITE_BASE_URL
                }/google-registration`;
                try {
                  const res = await axios.post(url, credentialResponse);

                  sessionStorage.setItem("token", res.data.token);
                  toast.success(res.data.message);
                  navigate("/account");
                } catch (error) {
                  toast.error(error.response.data.message);
                }
              }}
              onError={() => {
                toast.error("Registration Failed");
              }}
            />
          </div>

          <div className="new-customer">
            <span>Already have an account? {link} here.</span>
          </div>
        </form>
      </div>
    </>
  );
};

export default Registration;
