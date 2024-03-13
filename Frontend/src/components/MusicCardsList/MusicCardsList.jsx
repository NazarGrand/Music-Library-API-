import React from "react";
import "./MusicCardsList.scss";
import MusicCard from "../MusicCard/MusicCard";

const MusicCardsList = ({ title, cardItems }) => {
  return (
    <div className="music-catalog">
      <p className="music-catalog__title">
        {title} <span className="music-catalog__title--pink">Songs</span>
      </p>
      {cardItems.length !== 0 ? (
        <ul className="music-catalog__list">
          {cardItems.map((item, index) => (
            <li key={index}>
              <MusicCard
                image={item.image}
                titleSong={item.titleSong}
                titleAuthor={item.titleAuthor}
              />
            </li>
          ))}
          <li className="music-catalog__view-all">
            <div className="music-catalog__button">+</div>

            <p className="music-catalog__btn-text">View All</p>
          </li>
        </ul>
      ) : (
        <p className="music-catalog__subtitle">No music found</p>
      )}
    </div>
  );
};

export default MusicCardsList;
