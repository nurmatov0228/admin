// Sidebar.js
import React from "react";
import { NavLink } from "react-router-dom";
import "./sidebar.scss";
import { MdHome } from "react-icons/md";
import { IoSettingsOutline } from "react-icons/io5";
import { BiStore } from "react-icons/bi";
import { PiCardholder } from "react-icons/pi";
import { GrMapLocation } from "react-icons/gr";
import { BiSolidCity } from "react-icons/bi";
import { IoCarSport } from "react-icons/io5";

const Sidebar = () => {
  return (
    <div className="sidebar">
      <div className="container">
        <div className="sidebar__container">
          <ul className="sidebar__menu">
            <li>
              <span className="sidebar__title">
                <div className="logo">
                  <NavLink to="/home">AvtozoomAdmin</NavLink>
                </div>
              </span>
            </li>
            <li>
              <NavLink exact to="/home" activeClassName="active">
                <MdHome />
                Dashboard
              </NavLink>
            </li>
            <li>
              <NavLink to="/categories" activeClassName="active">
                <IoSettingsOutline />
                Settings
              </NavLink>
            </li>
            <li>
              <NavLink to="/brands" activeClassName="active">
                <BiStore /> Brands
              </NavLink>
            </li>
            <li>
              <NavLink to="/models" activeClassName="active">
                <PiCardholder />
                Models
              </NavLink>
            </li>
            <li>
              <NavLink to="/locations" activeClassName="active">
                <GrMapLocation />
                Locations
              </NavLink>
            </li>
            <li>
              <NavLink to="/cities" activeClassName="active">
                <BiSolidCity /> Cities
              </NavLink>
            </li>
            <li>
              <NavLink to="/cars" activeClassName="active">
                <IoCarSport /> Cars
              </NavLink>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
