import React from "react";
import "./AlbumItem.scss";

import iconAlbum from "../../assets/images/AlbumIcon.svg";
import iconPlaylist from "../../assets/images/PlaylistIcon.svg";
import { Link } from "react-router-dom";

const AlbumItem = ({ image, title, yearAlbum, albumId, type }) => {
  const icon = type === "album" ? iconAlbum : iconPlaylist;

  return (
    <div className="album-item">
      <Link className="album-item__link" to={`/albums/${albumId}`}>
        <img className="album-item__image" src={image} alt="musicimg" />

        <p className="album-item__title">{title}</p>

        <div className="album-item__block">
          {type === "album" && <p className="album-item__year">{yearAlbum}</p>}

          <img className="album-item__icon" src={icon} alt="icon" />
        </div>
      </Link>
    </div>
  );
};

export default AlbumItem;
