import React from "react";
import { NavLink } from "react-router-dom";
import classnames from "classnames";
import "./SidebarNav.scss";

const SidebarNav = ({ menuTitle, menuItems }) => {
  const handleIsActive = ({ isActive }) =>
    classnames("sidebar__item-link", {
      "sidebar__item-link--active-link": isActive,
    });

  return (
    <div className="sidebar">
      <p className="sidebar__menu">{menuTitle}</p>

      <nav className="sidebar__nav">
        <ul className="sidebar__list">
          {menuItems.map((item, index) => (
            <li key={index} className="sidebar__item">
              <NavLink className={handleIsActive} to={item.link}>
                <img
                  className="sidebar__item-icon"
                  src={item.icon}
                  alt="home"
                />

                <p
                  className={`sidebar__item-title ${
                    item.title === "Logout" ? "sidebar__item-title--pink" : ""
                  }`}
                >
                  {item.title}
                </p>
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
};

export default SidebarNav;
