import { React, useState } from "react";
import { useNavigate } from "react-router-dom";

import "../sass/profile.css";

const ProfileSidebar = () => {
  const [activeLink, setActiveLink] = useState(0);
  const navigate = useNavigate();

  const handleLinkClick = (index) => {
    setActiveLink(index);
  };

  return (
    <>
      <div className="sidebar">
        <span>Welcome, Md Shazed</span>

        <div className="profile-sidebar">
          <aside>
            <a
              href="#"
              className={activeLink === 0 ? "active manage" : "manage"}
              onClick={() => {
                handleLinkClick(0);
                navigate("/account");
              }}
            >
              Manage account
            </a>
            <div className="dropdown">
              <a
                href="#"
                className={activeLink === 1 ? "active" : ""}
                onClick={() => {
                  handleLinkClick(1);
                  navigate("/account/profile");
                }}
              >
                My profile
              </a>
              <a
                href="#"
                className={activeLink === 2 ? "active" : ""}
                onClick={() => {
                  handleLinkClick(2);
                  navigate("/account/address");
                }}
              >
                Address book
              </a>
            </div>
            <a
              href="#"
              className={activeLink === 3 ? "active" : ""}
              onClick={() => {
                handleLinkClick(3);
                navigate("/account/myorders");
              }}
            >
              My orders
            </a>
            <a
              href="#"
              className={activeLink === 4 ? "active" : ""}
              onClick={() => {
                handleLinkClick(4);
                navigate("/account/wishlist");
              }}
            >
              My Wishlists
            </a>
          </aside>
        </div>
      </div>
    </>
  );
};

export default ProfileSidebar;
