import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTableColumns } from "@fortawesome/free-solid-svg-icons";
import Sidebar from "../sidebar/Sidebar";

import "../sass/dashboard.css";

const Welcome = () => {
  const TableColumns = (
    <FontAwesomeIcon className="icon" icon={faTableColumns} />
  );
  return (
    <>
      <div className="admin-panel">
        <Sidebar />
        <main className="main-content">
          <header>
            <h1>{TableColumns} Admin Panel</h1>
          </header>

          <section>
            <h2>Dashboard</h2>
            <p>
              Welcome to the admin panel. Here you can manage your eCommerce
              website.
            </p>
          </section>
        </main>
      </div>
    </>
  );
};

export default Welcome;
