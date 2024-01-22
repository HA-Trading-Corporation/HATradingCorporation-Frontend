import { React, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-hot-toast";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useFormik } from "formik";
import { faArrowLeft, faPen } from "@fortawesome/free-solid-svg-icons";

import Spinner from "../../spinner/Spinner";
import Sidebar from "../sidebar/Sidebar";
import "../sass/dashboard.css";

const UpdateProduct = ({ headers }) => {
  const [Loading, setLoading] = useState();

  const [categoryArr, setCategoryArr] = useState([
    "bed and sofa cover",
    "men wear",
    "leather items",
    "woman wear",
  ]);

  const { id } = useParams();
  const navigate = useNavigate();

  const productsLocalStorage = localStorage.getItem("products");
  const parsed = JSON.parse(productsLocalStorage);
  const filteredProduct = parsed.filter((obj) => obj._id === id)[0];

  const initialValues = {
    name: filteredProduct.name,
    description: filteredProduct.description,
    category: filteredProduct.category,
    stocks: filteredProduct.stocks,
    price: filteredProduct.price,
  };

  const Formik = useFormik({
    initialValues: initialValues,
    onSubmit: async (values, actions) => {
      setLoading(true);

      const url = `${
        import.meta.env.VITE_BASE_URL
      }/api/v1/update-product/${id}`;
      await axios
        .put(url, values, headers)
        .then((res) => {
          setLoading(false);
          toast.success("updated successfully");
        })
        .catch((e) => {
          toast.error("some error occurs");
          console.log(e);
        });
      navigate("/admin/dashboard/products/");
      actions.resetForm();
    },
    validate: (values) => {
      const errors = {};

      // Manual validation for the "name" field
      if (!values.name) {
        errors.name = "Product name is required";
      }
      if (!values.description) {
        errors.description = "Product description is required";
      }
      if (!values.category) {
        errors.category = "Product category is required";
      }
      if (!values.stocks) {
        errors.stocks = "Product stocks are required";
      }
      if (!values.price) {
        errors.price = "Product price is required";
      }

      return errors;
    },
  });

  const Pencil = <FontAwesomeIcon className="icon" icon={faPen} />;
  const goBack = () => {
    navigate("/admin/dashboard/products/");
  };

  const Back = (
    <FontAwesomeIcon
      onClick={goBack}
      title="back"
      className="icon"
      icon={faArrowLeft}
    />
  );

  const addCategory = () => {
    const newCategory = prompt("Enter new category");
    setCategoryArr((prevCategories) => [...prevCategories, newCategory]);
  };

  return (
    <>
      <div className="admin-panel">
        <Sidebar />
        <main className="main-content">
          <header>
            <h1>{Pencil} Update Product</h1>
          </header>
          <nav className="create-product-nav">{Back}</nav>
          {Loading ? (
            <Spinner />
          ) : (
            <form method="post">
              <div className="name">
                <label>Product name</label>
                <input
                  type="text"
                  placeholder="Name"
                  name="name"
                  onChange={Formik.handleChange}
                  onBlur={Formik.handleBlur}
                  value={Formik.values.name}
                  required
                />
                {Formik.touched.name && Formik.errors.name && (
                  <div className="error">{Formik.errors.name}</div>
                )}
              </div>
              <div className="description">
                <label>Product description</label>
                <textarea
                  onChange={Formik.handleChange}
                  onBlur={Formik.handleBlur}
                  value={Formik.values.description}
                  name="description"
                  required
                  placeholder="Enter product description..."
                ></textarea>
                {Formik.touched.description && Formik.errors.description && (
                  <div className="error">{Formik.errors.description}</div>
                )}
              </div>
              <div className="category">
                <label>Product category</label>
                <div className="selectAndButton">
                  <select
                    onChange={Formik.handleChange}
                    value={Formik.values.category}
                    id="dropdown"
                    name="category"
                    required
                  >
                    {categoryArr.map((value, index) => (
                      <option key={index} value={value}>
                        {value}
                      </option>
                    ))}
                  </select>
                  <input
                    type="button"
                    title="add category"
                    className="addCategory"
                    onClick={addCategory}
                    value="+"
                  />
                </div>
              </div>
              <div className="stocks">
                <label>Product stocks</label>
                <input
                  type="number"
                  onChange={Formik.handleChange}
                  onBlur={Formik.handleBlur}
                  value={Formik.values.stocks}
                  name="stocks"
                  placeholder="Stocks"
                  required
                />
                {Formik.touched.stocks && Formik.errors.stocks && (
                  <div className="error">{Formik.errors.stocks}</div>
                )}
              </div>
              <div className="price">
                <label>Product price</label>
                <input
                  type="number"
                  onChange={Formik.handleChange}
                  onBlur={Formik.handleBlur}
                  value={Formik.values.price}
                  name="price"
                  placeholder="Price"
                  required
                />
                {Formik.touched.price && Formik.errors.price && (
                  <div className="error">{Formik.errors.price}</div>
                )}
              </div>
              <div className="btn">
                <button type="submit" onClick={Formik.handleSubmit}>
                  Update
                </button>
              </div>
            </form>
          )}
        </main>
      </div>
    </>
  );
};

export default UpdateProduct;
