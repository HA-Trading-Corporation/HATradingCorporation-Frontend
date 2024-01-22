import { React, useState } from "react";
import "./sass/navbarV2.css";
import { Link, useNavigate } from "react-router-dom";
import logo from "../../assets/logo.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBars,
  faCartShopping,
  faHeart,
  faMagnifyingGlass,
  faUser,
} from "@fortawesome/free-solid-svg-icons";

const NavbarV2 = ({ setSearchValue, handleSearch }) => {
  const [toggleResponsiveNavbar, setToggleResponsiveNavbar] = useState(false);
  const [toggleResponsiveSearch, setToggleResponsiveSearch] = useState(false);

  const navigate = useNavigate();

  const logout = () => {
    sessionStorage.removeItem("token");
    navigate("/login");
  };

  const handleSearchChange = (event) => {
    setSearchValue(event.target.value);
  };

  const user = (
    <Link to="/account">
      <FontAwesomeIcon
        style={{ color: "white" }}
        title="Profile"
        className="icon"
        icon={faUser}
      />
    </Link>
  );

  const heart = (
    <Link to="/account/wishlist">
      <FontAwesomeIcon
        style={{ color: "white" }}
        title="wishlists"
        className="icon"
        icon={faHeart}
      />
    </Link>
  );

  const cart = (
    <Link to="/cart">
      <FontAwesomeIcon
        style={{ color: "white" }}
        title="Cart"
        className="icon"
        icon={faCartShopping}
      />
    </Link>
  );

  return (
    <>
      <nav className="navbar">
        <nav className="top">
          <span>Welcome to H&A trading corporation</span>
          <div className="items">
            <span>Call: 01150-33804</span>|
            <span>
              <a
                target="_blank"
                href="https://www.facebook.com/profile.php?id=100063634398339&mibextid=ZbWKwL"
              >
                Fb page
              </a>
            </span>
          </div>
        </nav>
        <nav className="bottom">
          <div className="logoAndsearch">
            <div className="logo" title="Home">
              <Link to="/">
                <img src={logo} alt="logo" />
              </Link>
            </div>
            {/* task */}
            <div className="search" id="search">
              <input
                type="text"
                placeholder="Search your product..."
                onChange={handleSearchChange}
              />
              <button title="Search" onClick={handleSearch}>
                <FontAwesomeIcon icon={faMagnifyingGlass} />
              </button>
            </div>
            {/* task */}
          </div>
          <ul className="items">
            <li className="dropdown-wrapper">{user}</li>
            <li>{heart}</li>
            <li>{cart}</li>
          </ul>
          <ul id="bars">
            <li
              onClick={() => setToggleResponsiveNavbar(!toggleResponsiveNavbar)}
            >
              <FontAwesomeIcon icon={faBars} id="bars" />
            </li>
          </ul>
        </nav>
        {/* mobile responsive navbar */}
        <div
          style={
            toggleResponsiveNavbar ? { display: "block" } : { display: "none" }
          }
          className="mobile-navbar"
        >
          <ul
            style={
              toggleResponsiveNavbar
                ? { display: "block" }
                : { display: "none" }
            }
          >
            <li>
              <a onClick={() => navigate("/")}>Home</a>
            </li>
            <li>
              <a onClick={() => navigate("/products")}>Products</a>
            </li>
            <li>
              <a onClick={() => navigate("/account")}>Account</a>
            </li>
            <li>
              <a onClick={() => navigate("/account/myorders")}>My orders</a>
            </li>
            <li>
              <a onClick={logout}>Log out</a>
            </li>
          </ul>
          <div className="icons">
            <FontAwesomeIcon
              icon={faCartShopping}
              onClick={() => navigate("/cart")}
              className="icon"
            />
            <FontAwesomeIcon
              icon={faHeart}
              onClick={() => navigate("/account/wishlist")}
              className="icon"
            />
            <FontAwesomeIcon
              icon={faMagnifyingGlass}
              onClick={() => setToggleResponsiveSearch(!toggleResponsiveSearch)}
              className="icon"
            />
          </div>
        </div>
        {/* mobile responsive navbar */}
        <div
          className="mobile-search"
          style={
            toggleResponsiveSearch ? { display: "block" } : { display: "none" }
          }
        >
          <div className="search" id="search">
            <input
              type="text"
              placeholder="Search your product..."
              onChange={handleSearchChange}
            />
            <button title="Search" onClick={handleSearch}>
              <FontAwesomeIcon icon={faMagnifyingGlass} />
            </button>
          </div>
        </div>
      </nav>
    </>
  );
};

export default NavbarV2;
