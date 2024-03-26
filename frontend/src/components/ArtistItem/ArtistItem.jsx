import React from "react";
import "./ArtistItem.scss";

const ArtistItem = ({ image, artistName }) => {
  return (
    <div className="artist">
      <button className="artist__button">
        <img className="artist__image" src={image} alt="Artistimg" />

        <p className="artist__title-author">{artistName}</p>
      </button>
    </div>
  );
};

export default ArtistItem;
