import { React, useState, useEffect } from "react";
import { toast } from "react-hot-toast";
import { GoogleLogin } from "@react-oauth/google";
import axios from "axios";
import { useFormik } from "formik";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import { Link, useNavigate } from "react-router-dom";
import "./sass/login.css";

const Login = () => {
  const [showPass, setShowPass] = useState(false);

  document.title = "Login";

  const navigate = useNavigate();

  useEffect(() => {
    const token = sessionStorage.getItem("token");
    if (token) {
      navigate("/");
    }
  }, []);

  let initialValues = {
    username: "",
    password: "",
  };

  const Formik = useFormik({
    initialValues: initialValues,
    onSubmit: async (values, actions) => {
      const url = `${import.meta.env.VITE_BASE_URL}/login`;
      axios
        .post(url, values)
        .then((res) => {
          sessionStorage.setItem("token", res.data.token);
          navigate("/account");
          actions.resetForm();
        })
        .catch((err) => {
          console.log(err);
          toast.error(err.response.data.message);
        });
    },
    validate: (values) => {
      const errors = {};
      // Manual validation for the "name" field
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
    <Link style={{ textDecoration: "none" }} to="/registration">
      <span> Register </span>
    </Link>
  );

  return (
    <>
      <div className="login">
        <form
          method="post"
          className="login-form"
          onSubmit={Formik.handleSubmit}
        >
          <span className="login-header">Login here</span>
          <div className="email inputs">
            <input
              type="email"
              name="username"
              style={{ width: "100%" }}
              placeholder="Email"
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
              autoComplete="password"
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
              Login
            </button>
          </div>

          <span className="or">or</span>

          <div className="google-auth">
            <GoogleLogin
              onSuccess={async (credentialResponse) => {
                console.log(credentialResponse);
                const url = `${import.meta.env.VITE_BASE_URL}/google-login`;
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
                console.log("Login Failed");
                toast.error("Login Failed");
              }}
            />
          </div>

          <div className="new-customer">
            <span>New customer? {link} here.</span>
          </div>
        </form>
      </div>
    </>
  );
};

export default Login;
