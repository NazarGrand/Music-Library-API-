import React from "react";
import "./ArtistsList.scss";
import ArtistItem from "../ArtistItem/ArtistItem";

const ArtistsList = ({ title, artistItems }) => {
  return (
    <div className="artists">
      <p className="artists__title">
        {title} <span className="artists__title--pink">Artists</span>
      </p>
      {artistItems.length !== 0 ? (
        <ul className="artists__list">
          {artistItems.map((item, index) => (
            <li key={index}>
              <ArtistItem image={item.image} titleAuthor={item.titleAuthor} />
            </li>
          ))}
          <li className="artists__view-all">
            <div className="artists__button">+</div>

            <p className="artists__btn-text">View All</p>
          </li>
        </ul>
      ) : (
        <p className="artists__subtitle">No artist found</p>
      )}
    </div>
  );
};

export default ArtistsList;
