import { React, useState, useEffect } from "react";
import "./sass/productDetails.css";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-hot-toast";
import axios from "axios";
import { Rating } from "react-simple-star-rating";
import ReactImageMagnify from "react-image-magnify";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCartShopping,
  faFilter,
  faChevronCircleRight,
  faChevronCircleLeft,
  faHeart,
} from "@fortawesome/free-solid-svg-icons";

import BreadCrumb from "../breadCrumb/BreadCrumb";
import ReviewBox from "./reviewBox/ReviewBox";
import Spinner from "../spinner/Spinner";

const ProductDetails = ({ headers }) => {
  // loading
  const [loading, setLoading] = useState(true);
  // single product
  const [singleProduct, setSingleProduct] = useState([]);
  // product rating
  const [productRating, setProductRating] = useState();
  // all ratings review length
  const [ratingCounts, setRatingCounts] = useState({
    1: 0,
    2: 0,
    3: 0,
    4: 0,
    5: 0,
  });
  // all rating percentages
  const [ratingPercentages, setRatingPercentages] = useState({
    1: 0,
    2: 0,
    3: 0,
    4: 0,
    5: 0,
  });

  // reviews
  const [review, setReview] = useState(false);
  const [productReviews, setProductReviews] = useState([]);
  const [filteredReview, setFilteredReview] = useState([]);
  // quantity
  const [quantity, setQuantity] = useState(1);
  // images

  let productImagesUrls = sessionStorage.getItem("productImagesUrls");
  productImagesUrls = JSON.parse(productImagesUrls) || [];
  // productImagesUrls = [1, 2, 3, 4, 5];

  const [currentImagesPage, setCurrentImagesPage] = useState(1);
  const [productImageSrc, setProductImageSrc] = useState();
  const [productImageDimensions, setProductImageDimensions] = useState({
    width: null,
    height: null,
  });
  // pages
  const [currentPage, setCurrentPage] = useState(1);

  const navigate = useNavigate();
  const { id } = useParams();
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(
          `${import.meta.env.VITE_BASE_URL}/api/v1/single-product/${id}`
        );
        document.title = res.data.product_info[0].name;

        // getting the product average rating from the reviews
        const reviewsArr = res.data.product_info[0].reviews;
        const ratings = reviewsArr.map((review) => review.rating);
        const sumOfRatings = ratings.reduce((acc, rating) => acc + rating, 0);
        const averageRating = (sumOfRatings / ratings.length).toFixed(1);
        if (isNaN(averageRating)) {
          setProductRating(0);
        } else {
          setProductRating(averageRating);
        }

        // get all the rating count

        const counts = { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 };
        res.data.product_info[0].reviews.forEach((review) => {
          counts[review.rating]++;
        });
        setRatingCounts(counts);

        // Calculate all rating percentages separately
        const totalReviews = res.data.product_info[0].reviews.length;
        const percentages = { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 };
        for (const key in counts) {
          percentages[key] = (counts[key] / totalReviews) * 100;
        }

        const totalPercentage = Object.values(percentages).reduce(
          (total, percentage) => total + percentage,
          0
        );
        if (totalPercentage > 100) {
          const scale = 100 / totalPercentage;
          for (const key in percentages) {
            percentages[key] *= scale;
          }
        }

        const values = Object.values(percentages);
        values.map((value, index) => {
          if (isNaN(value)) {
            null;
          } else {
            setRatingPercentages(percentages);
          }
        });

        sessionStorage.setItem(
          "productImagesUrls",
          JSON.stringify(res.data.product_info[0].imageUrls)
        );

        setProductImageSrc(res.data.product_info[0].imageUrls[0].secureUrl);

        setSingleProduct(res.data.product_info[0]);
        setProductReviews(res.data.product_info[0].reviews);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  // add-to-cart
  const addToCart = () => {
    if (singleProduct.stocks < 1) {
      toast.error("product is out of stock");
    } else {
      const url = `${import.meta.env.VITE_BASE_URL}/api/v1/add-to-cart`;
      const values = {
        product_id: id,
        stocks: singleProduct.stocks,
        quantity: quantity,
      };
      axios
        .put(url, values, headers)
        .then((res) => {
          toast.success("Added to cart");
          navigate("/cart");
        })
        .catch((err) => {
          console.log(err);
          toast.error(err.response.data.message);
        });
    }
  };

  // add to wishlist
  const addToWishlist = () => {
    const url = `${import.meta.env.VITE_BASE_URL}/api/v1/add-to-wishlist`;
    axios
      .post(url, { product_id: id }, headers)
      .then((res) => {
        toast.success("Added to wishlist");
        // navigate("/cart");
      })
      .catch((err) => {
        console.log(err);
        toast.error(err.response.data.message);
      });
  };

  // buy now
  const buyNow = () => {
    if (singleProduct.stocks < 1) {
      toast.error("product is out of stock");
    } else {
      const url = `${import.meta.env.VITE_BASE_URL}/api/v1/add-to-cart`;
      const values = {
        product_id: id,
        stocks: singleProduct.stocks,
        quantity: quantity,
      };
      axios
        .put(url, values, headers)
        .then((res) => {
          navigate("/cart/checkout/address");
        })
        .catch((err) => {
          console.log(err);
          toast.error(err.response.data.message);
        });
    }
  };

  // quantity
  const add = () => {
    if (quantity >= singleProduct.stocks) {
    } else {
      setQuantity(quantity + 1);
    }
  };

  const subtract = () => {
    if (quantity == 1) {
    } else {
      setQuantity(quantity - 1);
    }
  };

  // More product image
  const moreProductImages = (src) => {
    setProductImageSrc(src);
  };

  // Star review filter
  const handleReviewStarChange = (event) => {
    const rating = event.target.value;
    // console.log(rating);
    setReview(true);
    if (rating == "all") {
      setReview(false);
    } else {
      const filtered = productReviews.filter(
        (review) => review.rating === parseInt(rating)
      );
      setFilteredReview(filtered);
    }
  };

  // =======================================
  // images
  const imagePerPage = 4;

  const indexOfLastImage = currentImagesPage * imagePerPage;
  const indexOfFirstImage = indexOfLastImage - imagePerPage;

  const currentImages = productImagesUrls.slice(
    indexOfFirstImage,
    indexOfLastImage
  );

  const totalImages = Math.ceil(productImagesUrls.length / imagePerPage);

  const nextImages = () => {
    if (currentImagesPage < totalImages) {
      setCurrentImagesPage(currentImagesPage + 1);
    }
  };

  const prevImages = () => {
    if (currentImagesPage > 1) {
      setCurrentImagesPage(currentImagesPage - 1);
    }
  };

  // pages
  const itemsPerPage = 5;

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;

  const currentReviews = productReviews.slice(
    indexOfFirstItem,
    indexOfLastItem
  );
  const starFilteredReviews = filteredReview.slice(
    indexOfFirstItem,
    indexOfLastItem
  );

  const totalPages = Math.ceil(productReviews.length / itemsPerPage);
  const pageNumbers = Array.from({ length: totalPages }, (_, i) => i + 1);
  const filteredTotalPages = Math.ceil(filteredReview.length / itemsPerPage);
  const filteredPageNumbers = Array.from(
    { length: filteredTotalPages },
    (_, i) => i + 1
  );

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

  const handlePageClick = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  // =======================================

  // product review filters maps
  const product_images = currentImages.map((value, index) => {
    return (
      <div key={index} className={`${index} img`}>
        <img
          onMouseEnter={() => moreProductImages(value.secureUrl)}
          src={value.secureUrl}
          alt="image"
        />
      </div>
    );
  });

  const dynamic_pages_button = pageNumbers.map((pageNumber) => (
    <button key={pageNumber} onClick={() => handlePageClick(pageNumber)}>
      {pageNumber}
    </button>
  ));

  const filtered_dynamic_pages_button = filteredPageNumbers.map(
    (pageNumber) => (
      <button key={pageNumber} onClick={() => handlePageClick(pageNumber)}>
        {pageNumber}
      </button>
    )
  );

  const all_reviews = currentReviews.map((value, index) => {
    const isoString = value.createdAt;
    const isoDate = new Date(isoString);
    const normalDate = isoDate.toISOString().split("T")[0];

    return (
      <ReviewBox
        key={index}
        rating={value.rating}
        reviewText={value.comment}
        time={normalDate}
      />
    );
  });

  const filtered_reviews = starFilteredReviews.map((value, index) => {
    const isoString = value.createdAt;
    const isoDate = new Date(isoString);
    const normalDate = isoDate.toISOString().split("T")[0];

    return (
      <ReviewBox
        key={index}
        rating={value.rating}
        reviewText={value.comment}
        time={normalDate}
      />
    );
  });

  // review filter condition
  const conditioned_reviews = review ? (
    filteredReview.length == 0 ? (
      <div className="review-not-found">
        <span>Product review not found</span>
      </div>
    ) : (
      filtered_reviews
    )
  ) : productReviews.length == 0 ? (
    <div className="review-not-found">
      <span>Product review not found</span>
    </div>
  ) : (
    all_reviews
  );

  useEffect(() => {
    const img = new Image();
    img.src = productImageSrc;
    img.onload = () => {
      setProductImageDimensions({
        width: img.width,
        height: img.height,
      });
    };
  }, [productImageSrc]);

  return (
    <>
      {loading ? (
        <Spinner />
      ) : (
        <div>
          <BreadCrumb productName={singleProduct.name} />
          <div className="product-details">
            <div className="top">
              {/* task */}
              <div className="product-details-image">
                <div className="image">
                  <ReactImageMagnify
                    className="ReactImageMagnify"
                    style={{ position: "relative", zIndex: "9" }}
                    {...{
                      smallImage: {
                        alt: "image",
                        isFluidWidth: true,
                        src: productImageSrc,
                      },
                      largeImage: {
                        src: productImageSrc,
                        width: productImageDimensions.width,
                        height: productImageDimensions.width,
                      },
                      enlargedImageContainerDimensions: {
                        width: "200%",
                        height: "130%",
                      },
                      isHintEnabled: true,
                    }}
                  />
                </div>
                <div className="more-images">
                  <button
                    onClick={prevImages}
                    disabled={currentImagesPage === 1}
                  >
                    <FontAwesomeIcon
                      title="Cart"
                      className="icon"
                      icon={faChevronCircleLeft}
                    />
                  </button>
                  <div>{product_images}</div>
                  <button
                    onClick={nextImages}
                    disabled={currentImagesPage === totalImages}
                  >
                    <FontAwesomeIcon
                      title="Cart"
                      className="icon"
                      icon={faChevronCircleRight}
                    />
                  </button>
                </div>
              </div>
              {/* task */}
              {/* task */}
              <div className="product-details-info">
                <div className="title">
                  <p>{singleProduct.name}</p>
                  <FontAwesomeIcon
                    onClick={addToWishlist}
                    title="wishlist"
                    className="icon"
                    icon={faHeart}
                  />
                </div>
                <div className="product-details-rating">
                  <Rating
                    id="star"
                    size={25}
                    SVGclassName={"star-svg"}
                    allowFraction={true}
                    initialValue={productRating}
                    readonly={true}
                  />
                  <span>{`(${productRating}) | (${productReviews.length} customer reviewed)`}</span>
                </div>
                <p className="description">{singleProduct.description}</p>
                <span className="price">৳{singleProduct.price}</span>
                <div className="status-category">
                  <p>
                    Status:{" "}
                    {singleProduct.stocks >= 1 ? (
                      <span className="stock-status">In stock</span>
                    ) : (
                      <span className="stock-status" style={{ color: "red" }}>
                        Out of stock
                      </span>
                    )}
                  </p>
                  |
                  <p className="category">
                    category: <span>{singleProduct.category}</span>
                  </p>
                </div>
                <div className="quantity">
                  <span>Quantity: </span>
                  <button onClick={subtract}>-</button>
                  <span>{quantity}</span>
                  <button onClick={add}>+</button>
                </div>
                <div className="buy-buttons">
                  <button onClick={buyNow} className="buy-now">
                    Buy now
                  </button>
                  <button onClick={addToCart} className="add-to-cart">
                    Add to cart &nbsp;
                    <FontAwesomeIcon
                      title="Cart"
                      className="icon"
                      icon={faCartShopping}
                    />
                  </button>
                </div>
              </div>
              {/* task */}
            </div>
            {/* task */}
            <div className="product-details-reviews">
              <span className="rating-title">
                Ratings and reviews of {singleProduct.name}
              </span>
              <div className="rating-stars">
                <div className="left">
                  <div className="review-stars-title">
                    <span>{productRating}</span>
                    <span className="grey-span">/5</span>
                  </div>
                  <Rating
                    size={45}
                    SVGclassName={"star-svg"}
                    allowFraction={true}
                    initialValue={productRating}
                    readonly={true}
                  />
                  <div className="rating-amount">
                    {productReviews.length} Ratings
                  </div>
                </div>
                {/* task */}
                <div className="right">
                  <ul>
                    <li>
                      <Rating
                        size={25}
                        SVGclassName={"star-svg"}
                        allowFraction={true}
                        initialValue={5}
                        readonly={true}
                      />
                      <div className="progress-bar">
                        <div
                          style={{ width: `${ratingPercentages["5"]}%` }}
                          className="progress-percent"
                        ></div>
                      </div>
                      <span>{ratingCounts["5"]}</span>
                    </li>
                    <li>
                      <Rating
                        size={25}
                        SVGclassName={"star-svg"}
                        allowFraction={true}
                        initialValue={4}
                        readonly={true}
                      />
                      <div className="progress-bar">
                        <div
                          style={{ width: `${ratingPercentages["4"]}%` }}
                          className="progress-percent"
                        ></div>
                      </div>
                      <span>{ratingCounts["4"]}</span>
                    </li>
                    <li>
                      <Rating
                        size={25}
                        SVGclassName={"star-svg"}
                        allowFraction={true}
                        initialValue={3}
                        readonly={true}
                      />
                      <div className="progress-bar">
                        <div
                          style={{ width: `${ratingPercentages["3"]}%` }}
                          className="progress-percent"
                        ></div>
                      </div>
                      <span>{ratingCounts["3"]}</span>
                    </li>
                    <li>
                      <Rating
                        size={25}
                        SVGclassName={"star-svg"}
                        allowFraction={true}
                        initialValue={2}
                        readonly={true}
                      />
                      <div className="progress-bar">
                        <div
                          style={{ width: `${ratingPercentages["2"]}%` }}
                          className="progress-percent"
                        ></div>
                      </div>
                      <span>{ratingCounts["2"]}</span>
                    </li>
                    <li>
                      <Rating
                        size={25}
                        SVGclassName={"star-svg"}
                        allowFraction={true}
                        initialValue={1}
                        readonly={true}
                      />
                      <div className="progress-bar">
                        <div
                          style={{ width: `${ratingPercentages["1"]}%` }}
                          className="progress-percent"
                        ></div>
                      </div>
                      <span>{ratingCounts["1"]}</span>
                    </li>
                  </ul>
                </div>
                {/* task */}
              </div>
              <div className="reviews-title">
                <span className="">Product reviews</span>
                <div className="reviews-star-filter">
                  <FontAwesomeIcon
                    title="Cart"
                    className="icon"
                    icon={faFilter}
                  />
                  <select id="dropdown" onChange={handleReviewStarChange}>
                    <option value="all" defaultValue>
                      All stars
                    </option>
                    <option value="5">5 star</option>
                    <option value="4">4 star</option>
                    <option value="3">3 star</option>
                    <option value="2">2 star</option>
                    <option value="1">1 star</option>
                  </select>
                </div>
              </div>
              <div className="product-reviews">{conditioned_reviews}</div>
              <div className="review-pages">
                <button
                  onClick={prevPage}
                  disabled={currentPage === 1}
                  title="Prev"
                >
                  {"<"}
                </button>
                {review ? filtered_dynamic_pages_button : dynamic_pages_button}
                <button
                  onClick={nextPage}
                  disabled={currentPage === totalPages}
                  title="Next"
                >
                  {">"}
                </button>
              </div>
            </div>
            {/* task */}
          </div>
        </div>
      )}
    </>
  );
};

export default ProductDetails;
