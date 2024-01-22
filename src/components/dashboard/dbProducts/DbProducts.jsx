import { React, useState, useEffect } from "react";
import { toast } from "react-hot-toast";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useNavigate } from "react-router-dom";

import {
  faCartShopping,
  faPen,
  faPlus,
  faRotateLeft,
  faSearch,
  faTrash,
} from "@fortawesome/free-solid-svg-icons";
import axios from "axios";

import Spinner from "../../spinner/Spinner";
import Sidebar from "../sidebar/Sidebar";
import "../sass/dashboard.css";

const DbProducts = ({ headers }) => {
  const [Loading, setLoading] = useState(true);
  const [reload, setReload] = useState(0);
  const [products, setProducts] = useState([]);
  const [searchBoxWidth, setSearchBoxWidth] = useState(0);
  const [Search, setSearch] = useState(false);
  const [searchValue, setSearchValue] = useState("");
  const [filteredProducts, setFilteredProducts] = useState([]);

  const CartShopping = (
    <FontAwesomeIcon className="icon" icon={faCartShopping} />
  );

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(
          `${import.meta.env.VITE_BASE_URL}/api/v1/all-products`
        );
        const products = res.data.all_products;
        setProducts(products);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const res = await axios.get(
          `${import.meta.env.VITE_BASE_URL}/api/v1/all-products`
        );
        const products = res.data.all_products;
        setProducts(products);
        localStorage.setItem("products", JSON.stringify(products));
        setLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [reload]);

  const navigate = useNavigate();

  const handleReloadClick = () => {
    setReload((prevCount) => prevCount + 1);
    setSearch(false);
  };

  const toggleSearch = () => {
    setSearchBoxWidth((prevWidth) => (prevWidth === 0 ? 200 : 0));
  };

  const handleInputChange = (event) => {
    setSearchValue(event.target.value);
  };

  const handleFilterProducts = () => {
    try {
      const filtered = products.filter((product) =>
        product.name.toLowerCase().includes(searchValue.toLowerCase())
      );
      setSearch(true);
      setFilteredProducts(filtered);
    } catch (error) {
      console.log(error);
    }
  };

  const createProduct = () => {
    navigate("/admin/dashboard/products/create-product");
  };

  const updateProduct = (id) => {
    navigate(`/admin/dashboard/products/update-product/${id}`);
  };

  const deleteProduct = async (id) => {
    const url = `${import.meta.env.VITE_BASE_URL}/api/v1/delete-product/${id}`;
    axios
      .delete(url, headers)
      .then((res) => {
        toast.success("deleted successfully");
        setReload((prevCount) => prevCount + 1);
      })
      .catch((e) => {
        console.log(e);
        toast.error("some error occurs");
      });
  };

  const gettingId = (id) => {
    navigate(`/products/${id}`);
  };

  const all_products = products.map((value, index) => {
    let formattedProductObj = {
      ...value,
      reviews: undefined,
      imageUrls: undefined,
    };
    return (
      <div key={index}>
        <h3>{index + 1} :</h3>
        <div onDoubleClick={() => gettingId(value._id)} className="product">
          <pre>{JSON.stringify(formattedProductObj, null, 2)}</pre>
          <div className="icons">
            <FontAwesomeIcon
              title="update"
              onClick={() => updateProduct(value._id)}
              className="icon"
              icon={faPen}
            />
            <FontAwesomeIcon
              onClick={() => {
                deleteProduct(value._id);
              }}
              title="delete"
              className="icon"
              icon={faTrash}
            />
          </div>
        </div>
      </div>
    );
  });

  const filtered_products = filteredProducts.map((value, index) => {
    const productWithoutReviews = { ...value, reviews: undefined };
    return (
      <div key={index}>
        <h3>{index + 1} :</h3>
        <div onDoubleClick={() => gettingId(value._id)} className="product">
          <pre>{JSON.stringify(productWithoutReviews, null, 2)}</pre>
          <div className="icons">
            <FontAwesomeIcon
              title="update"
              onClick={() => updateProduct(value._id)}
              className="icon"
              icon={faPen}
            />
            <FontAwesomeIcon
              onClick={() => {
                deleteProduct(value._id);
              }}
              title="delete"
              className="icon"
              icon={faTrash}
            />
          </div>
        </div>
      </div>
    );
  });

  const filter_conditioned_products = Search ? (
    filteredProducts == 0 ? (
      <div className="not-found">
        <span>Product not found!</span>
      </div>
    ) : (
      filtered_products
    )
  ) : products.length == 0 ? (
    <div className="not-found">
      <span>Product not found!</span>
    </div>
  ) : (
    all_products
  );

  return (
    <>
      <div className="admin-panel">
        <Sidebar />
        <main className="main-content">
          <header>
            <h1>{CartShopping} Products</h1>
          </header>

          <nav className="tools-nav">
            <span>
              {Search
                ? `(${filteredProducts.length} items are available)`
                : `(${products.length} items are available)`}
            </span>
            <div className="icons">
              <FontAwesomeIcon
                className="icon"
                onClick={createProduct}
                title="add product"
                icon={faPlus}
              />
              <FontAwesomeIcon
                className="icon"
                title="reload"
                onClick={handleReloadClick}
                icon={faRotateLeft}
              />
              <FontAwesomeIcon
                className="icon"
                title="search"
                icon={faSearch}
                onClick={toggleSearch}
              />
              <div
                className="search-box"
                style={{
                  width: searchBoxWidth,
                }}
              >
                <input
                  type="text"
                  onChange={handleInputChange}
                  placeholder="Search..."
                />
                <button onClick={handleFilterProducts}>Go</button>
              </div>
            </div>
          </nav>

          {Loading ? (
            <Spinner />
          ) : (
            <div className="products-listing">
              {filter_conditioned_products}
            </div>
          )}
        </main>
      </div>
    </>
  );
};

export default DbProducts;
