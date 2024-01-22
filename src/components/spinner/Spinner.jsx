import React from "react";
import { Circles } from "react-loader-spinner";
import "./spinner.css";

const Spinner = () => {
  return (
    <>
      <div className="spinner">
        <Circles
          height="80"
          width="80"
          color="#01034E"
          ariaLabel="circles-loading"
          wrapperStyle={{}}
          wrapperClass=""
          visible={true}
        />
      </div>
    </>
  );
};

export default Spinner;
