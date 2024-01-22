import axios from "axios";
import { React, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Spinner from "./components/spinner/Spinner";

const IsAdmin = ({ Components, headers }) => {
  const [isAdmin, setIsAdmin] = useState();

  const navigate = useNavigate();
  useEffect(() => {
    const protect = async () => {
      const token = sessionStorage.getItem("token");
      if (!token) {
        navigate("/login");
      } else {
        const url = `${import.meta.env.VITE_BASE_URL}/api/v1/get-user-info`;
        const res = await axios.get(url, headers);

        setIsAdmin(res.data.isAdmin);
      }
    };

    protect();
  }, []);

  return isAdmin ? <Components headers={headers} /> : navigate("/");
};

export default IsAdmin;
