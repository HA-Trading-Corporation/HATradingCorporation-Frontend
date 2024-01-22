import { React, useState } from "react";
import { Rating } from "react-simple-star-rating";
import axios from "axios";

import "../sass/profile.css";

const ReviewBox = ({
  isFormVisible,
  setFormVisible,
  productId,
  setReload,
  headers,
}) => {
  const [ratingNumber, setRatingNumber] = useState(0);
  const [review, setReview] = useState("");

  const onPointerMove = (number) => setRatingNumber(number);

  const submitReview = () => {
    if (!productId) return null;
    if (ratingNumber == 0) return null;
    if (review.length == 0) return null;

    const values = {
      productId: productId,
      rating: ratingNumber,
      review: review,
    };

    const url = `${import.meta.env.VITE_BASE_URL}/api/v1/review`;
    axios
      .post(url, values, headers)
      .then((res) => {
        setRatingNumber(0);
        setReview("");
        setFormVisible(false);
        setReload((prevCount) => prevCount + 1);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  return (
    <>
      <div className={`floating-form ${isFormVisible ? "visible" : ""}`}>
        <form>
          <Rating
            size={30}
            SVGclassName={"star-svg"}
            onPointerMove={onPointerMove}
            allowFraction={false}
            initialValue={ratingNumber}
            // transition={true}
          />

          <textarea
            name="review"
            placeholder="Write your review... "
            value={review}
            onChange={(e) => setReview(e.target.value)}
          ></textarea>

          <button type="button" onClick={submitReview}>
            Submit
          </button>
        </form>
      </div>
    </>
  );
};

export default ReviewBox;
