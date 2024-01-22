import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCartShopping,
  faGear,
  faList,
  faTableColumns,
  faUser,
} from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";

import "../sass/dashboard.css";

const Sidebar = () => {
  const TableColumns = (
    <FontAwesomeIcon className="icon" icon={faTableColumns} />
  );
  const CartShopping = (
    <FontAwesomeIcon className="icon" icon={faCartShopping} />
  );
  const user = <FontAwesomeIcon className="icon" icon={faUser} />;
  const orderList = <FontAwesomeIcon className="icon" icon={faList} />;
  const gear = <FontAwesomeIcon className="icon" icon={faGear} />;

  return (
    <>
      <aside className="sidebar">
        <Link to="/admin/dashboard/">{TableColumns} Dashboard</Link>
        <Link to="/admin/dashboard/products">{CartShopping} Products</Link>
        <Link to="/admin/dashboard/orders">{orderList} Orders</Link>
        <a href="#">{user} Customers</a>
        <a href="#">{gear} Settings</a>
      </aside>
    </>
  );
};

export default Sidebar;
