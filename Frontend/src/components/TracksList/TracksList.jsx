import React from "react";
import "./TracksList.scss";
import TrackItem from "../TrackItem/TrackItem";

import imgPlus from "../../assets/images/Plus.svg";

const TracksList = ({ title, trackItems, label }) => {
  return (
    <div className="tracks">
      <div className="tracks__title">
        <span>{title} </span>{" "}
        <span className="tracks__title--pink"> Songs</span>
      </div>
      {trackItems.length !== 0 ? (
        <>
          <div className="tracks__headlines">
            <span className="tracks__relase-date">Relase Date</span>

            <span className="tracks__labels">Label</span>
          </div>

          <ul className="tracks__list">
            {trackItems.map((item, index) => (
              <li key={index}>
                <TrackItem
                  indexTrack={index + 1}
                  image={item.image}
                  titleSong={item.titleSong}
                  titleAuthor={item.titleAuthor}
                  releaseDate={item.releaseDate}
                  label={item.label}
                />
              </li>
            ))}
            <li className="tracks__view-all">
              <button className="tracks__button-view">
                {" "}
                <img src={imgPlus} alt="plus" /> View All
              </button>
            </li>
          </ul>
        </>
      ) : (
        <p className="tracks__subtitle">No music found</p>
      )}
    </div>
  );
};

export default TracksList;
