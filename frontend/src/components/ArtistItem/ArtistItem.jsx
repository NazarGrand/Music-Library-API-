import React from "react";
import "./ArtistItem.scss";

const ArtistItem = ({ image, artistName }) => {
  return (
    <div className="artist-item">
      <button className="artist-item__button">
        <img className="artist-item__image" src={image} alt="Artistimg" />

        <p className="artist-item__title-author">{artistName}</p>
      </button>
    </div>
  );
};

export default ArtistItem;
