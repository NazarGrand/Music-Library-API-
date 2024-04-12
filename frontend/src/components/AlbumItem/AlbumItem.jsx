import React from "react";
import "./AlbumItem.scss";

import iconAlbum from "../../assets/images/AlbumIcon.svg";
import { Link } from "react-router-dom";

const AlbumItem = ({ image, titleAlbum, yearAlbum }) => {
  return (
    <div className="album-item">
      <Link className="album-item__link">
        <img className="album-item__image" src={image} alt="musicimg" />

        <p className="album-item__title">{titleAlbum}</p>

        <div className="album-item__block">
          <p className="album-item__year">{yearAlbum}</p>

          <img className="album-item__icon" src={iconAlbum} alt="icon" />
        </div>
      </Link>
    </div>
  );
};

export default AlbumItem;
