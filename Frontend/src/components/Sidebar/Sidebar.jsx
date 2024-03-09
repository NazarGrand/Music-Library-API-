import React from "react";
import "./Sidebar.scss";
import { Link, NavLink } from "react-router-dom";
import { ROUTES } from "../../utils/routes";
import classnames from "classnames";

import imgHome from "../../assets/images/Home.svg";
import imgDiscover from "../../assets/images/Discover.svg";
import imgArtists from "../../assets/images/Artists.svg";
import imgRecentlyAdded from "../../assets/images/RecentlyAdded.svg";
import imgMostPlayed from "../../assets/images/MostPlayed.svg";
import imgYourFavorites from "../../assets/images/YourFavorites.svg";
import imgYourPlaylist from "../../assets/images/YourPlaylist.svg";
import imgAddPlayList from "../../assets/images/AddPlayList.svg";
import imgSetting from "../../assets/images/Setting.svg";
import imgLogout from "../../assets/images/Logout.svg";

const Sidebar = () => {
  const handleIsActive = ({ isActive }) =>
    classnames("sidebar__item-link", {
      "sidebar__item-link--active-link": isActive,
    });

  return (
    <div className="sidebar">
      <Link className="sidebar__logo" to="/">
        Melodies
      </Link>

      <p className="sidebar_menu">Menu</p>

      <nav className="sidebar__nav">
        <ul className="sidebar__list">
          <li className="sidebar__item">
            <NavLink className={handleIsActive} to={ROUTES.HOME}>
              <img className="sidebar__item-icon" src={imgHome} alt="home" />
              <p className="sidebar__item-title">Home</p>
            </NavLink>
          </li>

          <li className="sidebar__item">
            <NavLink className={handleIsActive} to={ROUTES.DISCOVER}>
              <img
                className="sidebar__item-icon"
                src={imgDiscover}
                alt="discover"
              />
              <p className="sidebar__item-title">Discover</p>
            </NavLink>
          </li>

          <li className="sidebar__item">
            <NavLink className={handleIsActive} to={ROUTES.ARTISTS}>
              <img
                className="sidebar__item-icon"
                src={imgArtists}
                alt="artists"
              />
              <p className="sidebar__item-title">Artists</p>
            </NavLink>
          </li>
        </ul>
      </nav>

      <p className="sidebar_menu">Library</p>

      <nav className="sidebar__nav">
        <ul className="sidebar__list">
          <li className="sidebar__item">
            <NavLink className={handleIsActive} to="Recently added">
              <img
                className="sidebar__item-icon"
                src={imgRecentlyAdded}
                alt="recently added"
              />
              <p className="sidebar__item-title">Recently added</p>
            </NavLink>
          </li>

          <li className="sidebar__item">
            <NavLink className={handleIsActive} to="Most played">
              <img
                className="sidebar__item-icon"
                src={imgMostPlayed}
                alt="most played"
              />
              <p className="sidebar__item-title">Most played</p>
            </NavLink>
          </li>
        </ul>
      </nav>

      <p className="sidebar_menu">Playlist and favorite</p>

      <nav className="sidebar__nav">
        <ul className="sidebar__list">
          <li className="sidebar__item">
            <NavLink className={handleIsActive} to="Your favorites">
              <img
                className="sidebar__item-icon"
                src={imgYourFavorites}
                alt="Fovorites"
              />
              <p className="sidebar__item-title">Your favorites</p>
            </NavLink>
          </li>

          <li className="sidebar__item">
            <NavLink className={handleIsActive} to="Your playlist">
              <img
                className="sidebar__item-icon"
                src={imgYourPlaylist}
                alt="yourPlayList"
              />
              <p className="sidebar__item-title">Your playlist</p>
            </NavLink>
          </li>

          <li className="sidebar__item">
            <NavLink className={handleIsActive} to="Add playlist">
              <img
                className="sidebar__item-icon"
                src={imgAddPlayList}
                alt="addPlayList"
              />
              <p className="sidebar__item-title">Add playlist</p>
            </NavLink>
          </li>
        </ul>
      </nav>

      <p className="sidebar_menu">general</p>

      <nav className="sidebar__nav">
        <ul className="sidebar__list">
          <li className="sidebar__item">
            <NavLink className={handleIsActive} to="Setting">
              <img
                className="sidebar__item-icon"
                src={imgSetting}
                alt="setting"
              />
              <p className="sidebar__item-title">Setting</p>
            </NavLink>
          </li>

          <li className="sidebar__item">
            <NavLink className={handleIsActive} to="Logout">
              <img
                className="sidebar__item-icon"
                src={imgLogout}
                alt="logout"
              />
              <p className="sidebar__item-title" style={{ color: "#EE10B0" }}>
                Logout
              </p>
            </NavLink>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Sidebar;
