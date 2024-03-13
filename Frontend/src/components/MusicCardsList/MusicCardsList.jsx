import React from "react";
import "./MusicCardsList.scss";
import MusicCard from "../MusicCard/MusicCard";

const MusicCardsList = ({ title, cardItems }) => {
  return (
    <div className="music-catalog">
      <p className="music-catalog__title">
        {title} <span className="music-catalog__title--pink">Songs</span>
      </p>

      <ul className="music-catalog__list">
        {cardItems &&
          cardItems.map((item, index) => (
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

      {/* <div className="music-catalog__view-all"></div> */}
    </div>
  );
};

export default MusicCardsList;
