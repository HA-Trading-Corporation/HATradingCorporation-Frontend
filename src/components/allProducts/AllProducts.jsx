import { React, useState, useEffect } from "react";
import { Rating } from "react-simple-star-rating";
import "./sass/allProducts.css";
import ProductCard from "../productCard/ProductCard";

import Spinner from "../spinner/Spinner";

const AllProducts = ({
  ALL_PRODUCTS,
  ERROR,
  Search,
  setSearch,
  searchFiltered,
  headers,
}) => {
  const [activeItem, setActiveItem] = useState(null);
  // price-filter state
  const [min, setMin] = useState();
  const [max, setMax] = useState();
  const [priceFilter, setPriceFilter] = useState(false);
  const [priceFiltered, setPriceFiltered] = useState([]);
  // rating state
  const [rating, setRating] = useState(false);
  const [ratingNumber, setRatingNumber] = useState(0);
  const [ratingFiltered, setRatingFiltered] = useState([]);
  // catagories state
  const [category, setCategory] = useState(false);
  const [categoryFiltered, setCategoryFiltered] = useState([]);
  // pages state
  const [currentPage, setCurrentPage] = useState(1);

  document.title = "Our products";

  // price filter

  const minValue = (e) => {
    setMin(parseInt(e.target.value, 10));
  };
  const maxValue = (e) => {
    setMax(parseInt(e.target.value, 10));
  };

  const handlePriceFilter = () => {
    setPriceFilter(true);
    // console.log(`min: ${(typeof min, min)}   max: ${(typeof max, max)}`);
    const filtered = ALL_PRODUCTS.filter(
      (product) => product.price >= min && product.price <= max
    );
    setPriceFiltered(filtered);
  };

  // useEffect(() => {
  //   // remove after the work get done
  //   console.log(
  //     "useEffect Price filtered array: ",
  //     typeof priceFiltered,
  //     priceFiltered
  //   );
  // }, [priceFiltered]);

  // star filter

  const onPointerMove = (number) => setRatingNumber(number);

  const handleRating = (number) => {
    setRating(true);
    const filtered = ALL_PRODUCTS.filter(
      (product) => product.stars === ratingNumber
    );
    setRatingFiltered(filtered);
  };

  // console.log("Rating filtered array: ", ratingFiltered);

  // category filter

  const handleCategory = (category, index) => {
    setCategory(true);
    setActiveItem(index);
    if (category === "All") {
      setCategoryFiltered(ALL_PRODUCTS);
    } else {
      const filtered = ALL_PRODUCTS.filter(
        (product) => product.category === category
      );
      setCategoryFiltered(filtered);
    }
  };
  // console.log("category filtered: ", categoryFiltered);

  const uniqueCategories = [
    ...new Set(ALL_PRODUCTS.map((product) => product.category)),
  ];

  const categoryList = uniqueCategories.map((category, index) => {
    const capitalized_category =
      category.charAt(0).toUpperCase() + category.slice(1);
    // console.log(capitalized_category);
    return (
      <li
        className={activeItem === index ? "li-active" : ""}
        key={category}
        onClick={() => handleCategory(category, index)}
      >
        {capitalized_category}
      </li>
    );
  });

  // clear filter

  const clearFilter = () => {
    setSearch(false);
    setPriceFilter(false);
    setRating(false);
    setCategory(false);
    setActiveItem(null);
    setCurrentPage(1);
  };

  // pages

  const itemsPerPage = 6;

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;

  const currentItems = ALL_PRODUCTS.slice(indexOfFirstItem, indexOfLastItem);
  const currentItemsSearch = searchFiltered.slice(
    indexOfFirstItem,
    indexOfLastItem
  );
  const currentItemsPrice = priceFiltered.slice(
    indexOfFirstItem,
    indexOfLastItem
  );
  const currentItemsRating = ratingFiltered.slice(
    indexOfFirstItem,
    indexOfLastItem
  );
  const currentItemsCategory = categoryFiltered.slice(
    indexOfFirstItem,
    indexOfLastItem
  );

  const totalPages = Math.ceil(ALL_PRODUCTS.length / itemsPerPage);
  const pageNumbers = Array.from({ length: totalPages }, (_, i) => i + 1);
  // console.log(pageNumbers);

  const nextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const prevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const goToPage = (pageNumber) => {
    if (pageNumber >= 1 && pageNumber <= totalPages) {
      setCurrentPage(pageNumber);
    }
  };

  const handlePageClick = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  // filtered products map

  const dynamic_pages_button = pageNumbers.map((pageNumber) => (
    <button key={pageNumber} onClick={() => handlePageClick(pageNumber)}>
      {pageNumber}
    </button>
  ));

  const all_products = currentItems.map((values, index) => {
    return (
      <ProductCard
        key={index}
        id={values._id}
        title={values.name}
        price={values.price}
        imageUrl={values.imageUrls[0].secureUrl}
        stocks={values.stocks}
        headers={headers}
      />
    );
  });

  const search_filtered_products = currentItemsSearch.map((values, index) => (
    <ProductCard
      key={index}
      id={values._id}
      title={values.name}
      price={values.price}
      imageUrl={values.imageUrls[0].secureUrl}
      stocks={values.stocks}
      headers={headers}
    />
  ));

  const price_filtered_products = currentItemsPrice.map((values, index) => (
    <ProductCard
      key={index}
      id={values._id}
      title={values.name}
      price={values.price}
      imageUrl={values.imageUrls[0].secureUrl}
      stocks={values.stocks}
      headers={headers}
    />
  ));

  const rating_filtered_products = currentItemsRating.map((values, index) => (
    <ProductCard
      key={index}
      id={values._id}
      title={values.name}
      price={values.price}
      imageUrl={values.imageUrls[0].secureUrl}
      stocks={values.stocks}
      headers={headers}
    />
  ));

  const category_filtered_products = currentItemsCategory.map(
    (values, index) => (
      <ProductCard
        key={index}
        id={values._id}
        title={values.name}
        price={values.price}
        imageUrl={values.imageUrls[0].secureUrl}
        stocks={values.stocks}
        headers={headers}
      />
    )
  );

  // filtered conditioned products

  const filter_conditioned_products = Search ? (
    searchFiltered == 0 ? (
      <div className="product-not-found">
        <span>Product not found!</span>
      </div>
    ) : (
      search_filtered_products
    )
  ) : priceFilter ? (
    priceFiltered == 0 ? (
      <div className="product-not-found">
        <span>Product not found!</span>
      </div>
    ) : (
      price_filtered_products
    )
  ) : rating ? (
    ratingFiltered == 0 ? (
      <div className="product-not-found">
        <span>Product not found!</span>
      </div>
    ) : (
      rating_filtered_products
    )
  ) : category ? (
    category_filtered_products
  ) : (
    all_products
  );

  // console.table(products);

  const filter_conditioned_header = Search
    ? `(${searchFiltered.length} items) are available`
    : priceFilter
    ? `(${priceFiltered.length} items) are available`
    : rating
    ? `(${ratingFiltered.length} items) are available`
    : category
    ? `(${categoryFiltered.length} items) are available`
    : `(${ALL_PRODUCTS.length} items) are available`;

  return (
    <>
      <div className="allProducts">
        <div className="filters">
          <div className="price-range">
            <label>Price-range</label>
            <div className="price-range-inputs">
              <input type="number" onChange={minValue} placeholder="Min" />
              <input type="number" onChange={maxValue} placeholder="Max" />
              <button onClick={handlePriceFilter}>Go</button>
            </div>
          </div>
          <div className="star-filter">
            <label>Ratings</label>
            <Rating
              size={30}
              SVGclassName={"star-svg"}
              onPointerMove={onPointerMove}
              onClick={handleRating}
              allowFraction={false}
              initialValue={ratingNumber}
              // transition={true}
            />
          </div>
          <div className="filter-category">
            <label>Category</label>
            <ul>
              <li onClick={() => handleCategory("All")}>All</li>
              {categoryList}
            </ul>
          </div>
          <div className="reset-filters">
            <button onClick={clearFilter}>Clear filters</button>
          </div>
        </div>
        <div className="allProducts-products">
          <header>
            <h1>Our products</h1>
            <span>{filter_conditioned_header}</span>
          </header>
          {/* task */}
          {ERROR ? (
            <Spinner />
          ) : (
            <div className="products">{filter_conditioned_products}</div>
          )}

          {/* task */}
          <div className="pages">
            <button
              onClick={prevPage}
              disabled={currentPage === 1}
              title="Prev"
            >
              {"<"}
            </button>
            {dynamic_pages_button}
            <button
              onClick={nextPage}
              disabled={currentPage === totalPages}
              title="Next"
            >
              {">"}
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default AllProducts;
