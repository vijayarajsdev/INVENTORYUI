import { Link } from "react-router-dom";
import HomeIcon from "@mui/icons-material/Home";
import ShoppingBagIcon from "@mui/icons-material/ShoppingBag";
import SellIcon from "@mui/icons-material/Sell";
import SettingsIcon from "@mui/icons-material/Settings";
import { useState } from "react";
import "./Sidebar.scss";
const Sidebar = () => {
  const [salesToggle, setSalesToggle] = useState(false);
  return (
    <nav className="main-nav">
      <h3>Menu</h3>
      <ul>
        <li>
          <Link
            to="/dashboard"
            className="menu-link">
            <HomeIcon fontSize="small" /> Home
          </Link>
        </li>
        <li >
          <Link
            to="/dashboard"
           className="menu-link">
            <ShoppingBagIcon fontSize="small" /> Items
          </Link>
        </li>
        <li >
          <Link to=''
           className="menu-link"
            onClick={() => setSalesToggle(!salesToggle)}>
            <SellIcon fontSize="small" /> Sales
          </Link>
        </li>
        {salesToggle ? (
          <>
            <li className="inner-li">
              <Link
                to="/dashboard"
               className="menu-link">
                Customers
              </Link>
            </li>{" "}
            <li className="inner-li">
              <Link
                to="/dashboard"
               className="menu-link">
                Invoice
              </Link>
            </li>{" "}
            <li className="inner-li">
              <Link
                to="/dashboard"
               className="menu-link">
                Quotes
              </Link>
            </li>
          </>
        ) : (
          ""
        )}
        <li>
          <Link
            to="/settings"
           className="menu-link">
            <SettingsIcon fontSize="small" /> Settings
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default Sidebar;
