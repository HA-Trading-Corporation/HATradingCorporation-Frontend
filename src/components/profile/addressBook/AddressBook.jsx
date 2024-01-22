import { React, useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import ProfileSidebar from "../profileSidebar/ProfileSidebar";

import "../sass/profile.css";
import Spinner from "../../spinner/Spinner";

const AddressBook = ({ headers }) => {
  const [userPhone, setUserPhone] = useState(null);
  const [userFullName, setUserFullName] = useState();
  const [userProvince, setUserProvince] = useState();
  const [userCity, setUserCity] = useState();
  const [userArea, setUserArea] = useState();
  const [userAddress, setUserAddress] = useState();
  const [Loading, setLoading] = useState(true);

  document.title = "My address book";

  useEffect(() => {
    const fetchData = async () => {
      const url = `${import.meta.env.VITE_BASE_URL}/api/v1/get-user-info`;

      try {
        const res = await axios.get(url, headers);
        setUserPhone(res.data.phone);
        setUserFullName(res.data.fullName);
        setUserProvince(res.data.province);
        setUserCity(res.data.city);
        setUserArea(res.data.area);
        setUserAddress(res.data.address);

        sessionStorage.setItem("user", JSON.stringify(res.data));
        setLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  const navigate = useNavigate();

  return (
    <>
      <div className="profile">
        <ProfileSidebar />
        <main className="address-book">
          <header>
            <span>Address book </span>
          </header>
          {Loading ? (
            <Spinner />
          ) : (
            <div>
              {/* inputs */}
              <div className="inputs address-inputs">
                <div className="name">
                  <label>Full name</label>
                  {userFullName ? (
                    <span>{userFullName}</span>
                  ) : (
                    <span style={{ color: "red" }}>no full name added</span>
                  )}
                </div>
                <div className="phone">
                  <label>Phone</label>
                  {userPhone ? (
                    <span>{userPhone}</span>
                  ) : (
                    <span style={{ color: "red" }}>no phone added</span>
                  )}
                </div>
                <div className="province">
                  <label>Province</label>
                  {userProvince ? (
                    <span>{userProvince}</span>
                  ) : (
                    <span style={{ color: "red" }}>no province added</span>
                  )}
                </div>
                <div className="city">
                  <label>City</label>
                  {userCity ? (
                    <span>{userCity}</span>
                  ) : (
                    <span style={{ color: "red" }}>no city added</span>
                  )}
                </div>
                <div className="area">
                  <label>Area</label>
                  {userArea ? (
                    <span>{userArea}</span>
                  ) : (
                    <span style={{ color: "red" }}>no area added</span>
                  )}
                </div>
                <div className="address">
                  <label>Address</label>
                  {userAddress ? (
                    <span>{userAddress}</span>
                  ) : (
                    <span style={{ color: "red" }}>no address added</span>
                  )}
                </div>
              </div>
              {/* inputs */}
              {/* buttons */}
              <div className="buttons">
                <button
                  onClick={() => navigate("/account/address/edit")}
                  className="btn"
                >
                  Edit address
                </button>
              </div>
              {/* buttons */}
            </div>
          )}
        </main>
      </div>
    </>
  );
};

export default AddressBook;
