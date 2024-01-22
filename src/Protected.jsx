import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Protected = ({ Components, headers, orderInfo, setOrderInfo }) => {
  const [haveToken, setHaveToken] = useState(false);

  const navigate = useNavigate();
  useEffect(() => {
    const token = sessionStorage.getItem("token");
    if (token) {
      setHaveToken(true);
    }
  }, []);

  return haveToken ? (
    <Components
      headers={headers}
      orderInfo={orderInfo}
      setOrderInfo={setOrderInfo}
    />
  ) : (
    navigate("/")
  );
};

export default Protected;
