import React from "react";
import { Link } from "react-router-dom";
import { data } from "../utils/coinslist";
import Searchbar from "./Searchbar";

const Navbar = () => {
  return (
    <div className="navbar">
      <div className="navbar-container">
        <div className="title">
          <Link to="/">
            {" "}
            <h4 className="title">
              {"{"}... Cryiptocurrencies{"}"}
            </h4>{" "}
          </Link>
        </div>

        <div className="navbar-search">
          <Searchbar placeholder="Search over 9,000 coins!" data={data} />
        </div>
      </div>
    </div>
  );
};

export default Navbar;
