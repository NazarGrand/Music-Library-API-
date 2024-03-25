import React from "react";
import "./ArtistItem.scss";

const ArtistItem = ({ image, titleAuthor }) => {
  return (
    <div className="artist">
      <button className="artist__button">
        <img className="artist__image" src={image} alt="musicimg" />

        <p className="artist__title-author">{titleAuthor}</p>
      </button>
    </div>
  );
};

export default ArtistItem;
