import { React, useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowRight,
  faRightFromBracket,
} from "@fortawesome/free-solid-svg-icons";

import ProfileSidebar from "../profileSidebar/ProfileSidebar";
import Spinner from "../../spinner/Spinner";

import "../sass/profile.css";

const ManageProfile = ({ headers }) => {
  const [userName, setUserName] = useState();
  const [userEmail, setUserEmail] = useState();
  const [userPhone, setUserPhone] = useState(null);
  const [userFullName, setUserFullName] = useState();
  const [userProvince, setUserProvince] = useState();
  const [userCity, setUserCity] = useState();
  const [userArea, setUserArea] = useState();
  const [userAddress, setUserAddress] = useState();
  const [Loading, setLoading] = useState(true);

  const [isAdmin, setIsAdmin] = useState(false);

  const conditions =
    userFullName &&
    userPhone &&
    userProvince &&
    userCity &&
    userAddress &&
    userAddress;

  document.title = "My account";

  useEffect(() => {
    const fetchData = async () => {
      const url = `${import.meta.env.VITE_BASE_URL}/api/v1/get-user-info`;

      try {
        const res = await axios.get(url, headers);
        setUserName(res.data.name);
        setUserEmail(res.data.username);
        setUserPhone(res.data.phone);
        setUserFullName(res.data.fullName);
        setUserProvince(res.data.province);
        setUserCity(res.data.city);
        setUserArea(res.data.area);
        setUserAddress(res.data.address);

        setIsAdmin(res.data.isAdmin);

        sessionStorage.setItem("user", JSON.stringify(res.data));
        setLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  const navigate = useNavigate();

  const logout = () => {
    sessionStorage.removeItem("token");
    navigate("/login");
  };

  const bar = <span style={{ fontSize: "9px", color: "grey" }}>|</span>;
  const profileEdit = (
    <a
      href="#"
      onClick={() => {
        navigate("/account/profile/edit");
      }}
    >
      Edit
    </a>
  );
  const addressEdit = (
    <a
      href="#"
      onClick={() => {
        navigate("/account/address/edit");
      }}
    >
      Edit
    </a>
  );
  const logoutIcon = (
    <FontAwesomeIcon className="logout-icon icon" icon={faRightFromBracket} />
  );

  const rightArrow = (
    <FontAwesomeIcon className="right-arrow" icon={faArrowRight} />
  );

  return (
    <>
      <div className="profile">
        <ProfileSidebar />
        <main className="manage-profile">
          <header>
            <span>Manage my account</span>
          </header>
          {Loading ? (
            <Spinner />
          ) : (
            <div className="manage-profile">
              <div className="profile-info">
                <header>
                  <span>
                    Profile {bar} {profileEdit}
                  </span>
                </header>
                <ul className="info">
                  <li>{userName}</li>
                  <li>{userEmail}</li>
                  <li>{userPhone ? `(+880) ${userPhone}` : null}</li>
                </ul>
              </div>
              <div className="address-info">
                <header>
                  <span>
                    Address book {bar} {addressEdit}
                  </span>
                </header>
                {conditions == undefined ? (
                  <span className="address-not-found">Address not added</span>
                ) : (
                  <ul className="info">
                    <li style={{ fontWeight: "bold" }}>{userFullName}</li>
                    <li>{userAddress}</li>
                    <li>
                      {userProvince} - {userCity} - {userArea}
                    </li>
                    <li>(+880) {userPhone}</li>
                  </ul>
                )}
              </div>
            </div>
          )}
          <div className="buttons">
            <button className="logout" title="logout" onClick={logout}>
              {logoutIcon} <span>logout</span>
            </button>
            {isAdmin ? (
              <button
                className="admin-panel-button"
                title="admin panel"
                onClick={() => {
                  navigate("/admin/dashboard");
                }}
              >
                {rightArrow} <span>Go to admin panel</span>
              </button>
            ) : (
              ""
            )}
          </div>
        </main>
      </div>
    </>
  );
};

export default ManageProfile;
