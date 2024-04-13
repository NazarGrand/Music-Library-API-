import React from "react";
import "./ArtistItem.scss";
import { Link } from "react-router-dom";

const ArtistItem = ({ image, artistName, artistId }) => {
  return (
    <div className="artist-item">
      <Link className="artist-item__link" to={`/artists/${artistId}`}>
        <img className="artist-item__image" src={image} alt="Artistimg" />

        <p className="artist-item__title-author">{artistName}</p>
      </Link>
    </div>
  );
};

export default ArtistItem;
