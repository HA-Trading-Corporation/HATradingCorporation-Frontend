import React from "react";
import "./sass/reviewBox.css";
import { Rating } from "react-simple-star-rating";

const ReviewBox = ({ rating, reviewText, time }) => {
  return (
    <>
      <div className="product-review-box">
        <div>
          <Rating
            size={20}
            SVGclassName={"star-svg"}
            allowFraction={true}
            initialValue={rating}
            readonly={true}
            className="rating-star"
            // transition={true}
          />
          <span>{time}</span>
        </div>
        <div className="review-text">{reviewText}</div>
      </div>
    </>
  );
};

export default ReviewBox;
