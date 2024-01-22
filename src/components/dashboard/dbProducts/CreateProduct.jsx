import { React, useState } from "react";
import { toast } from "react-hot-toast";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useFormik } from "formik";
import { useNavigate } from "react-router-dom";
import { faArrowLeft, faPen } from "@fortawesome/free-solid-svg-icons";

import Spinner from "../../spinner/Spinner";
import Sidebar from "../sidebar/Sidebar";
import "../sass/dashboard.css";

const CreateProduct = ({ headers }) => {
  const [Loading, setLoading] = useState();
  const [categoryArr, setCategoryArr] = useState([
    "bed and sofa cover",
    "men wear",
    "leather items",
    "woman wear",
  ]);

  const [images, setImages] = useState();

  let initialValues = {
    name: "",
    description: "",
    category: "bed and sofa cover",
    imageUrls: [],
    stocks: "",
    price: "",
  };
  const navigate = useNavigate();

  const Formik = useFormik({
    initialValues: initialValues,
    onSubmit: async (values, actions) => {
      setLoading(true);
      const url = `${import.meta.env.VITE_BASE_URL}/api/v1/create-product`;

      const cloudName = import.meta.env.VITE_CLOUD_NAME;
      const uploadPreset = import.meta.env.VITE_UPLOAD_PRESET;

      for (const key in images) {
        if (images.hasOwnProperty(key)) {
          // console.log(images[key]);
          const data = new FormData();
          data.append("file", images[key]);
          data.append("upload_preset", uploadPreset);
          data.append("cloud_name", cloudName);

          try {
            const url = `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`;
            const res = await axios.post(url, data);
            const secureUrl = res.data.secure_url;
            const publicId = res.data.public_id;

            const imageObject = { secureUrl, publicId };

            values.imageUrls.push(imageObject);
            values.imageUrls.reverse();
          } catch (error) {
            console.log(error);
          }
        }
      }

      await axios
        .post(url, values, headers)
        .then((res) => {
          setLoading(false);
          console.log(values);
          toast.success("created successfully");
          navigate("/admin/dashboard/products/");
          actions.resetForm();
        })
        .catch((e) => {
          // alert("some error occurs");
          console.log(e);
        });
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
      if (!images) {
        errors.category = "Product images are required";
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
            <h1>{Pencil} Create Product</h1>
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
              <div className="uploadPhoto">
                <label>Product images</label>
                <input
                  type="file"
                  name="productImages"
                  accept=".png, .jpg, .jpeg"
                  onChange={(e) => setImages(e.target.files)}
                  multiple
                  required
                />
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
                  Create
                </button>
              </div>
            </form>
          )}
        </main>
      </div>
    </>
  );
};

export default CreateProduct;
