import React from "react";
import { NavLink } from "react-router-dom";
import classnames from "classnames";
import "./SidebarNav.scss";

const SidebarNav = ({ menuTitle, menuItems }) => {
  const handleIsActive = ({ isActive }) =>
    classnames("sidebar-nav__item-link", {
      "sidebar-nav__item-link--active-link": isActive,
    });

  return (
    <div className="sidebar-nav">
      <p className="sidebar-nav__menu">{menuTitle}</p>

      <nav className="sidebar-nav__nav">
        <ul className="sidebar-nav__list">
          {menuItems.map((item, index) => (
            <li key={index} className="sidebar-nav__item">
              <NavLink className={handleIsActive} to={item.link}>
                <div className="sidebar-nav__item-block">
                  <img
                    className="sidebar-nav__item-icon"
                    src={item.icon}
                    alt="home"
                  />

                  <p className="sidebar-nav__item-title">{item.title}</p>
                </div>
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
};

export default SidebarNav;
