import React, { useState } from "react";
import "./AlbumList.scss";
import TrackItem from "../TrackItem/TrackItem";
import imgPlus from "../../assets/images/Plus.svg";

const AlbumList = ({ tracks }) => {
  const [numberTracks, setNumberTracks] = useState(20);
  const tracksPerPage = 20;

  const handleClick = () => {
    setNumberTracks(numberTracks + tracksPerPage);
  };

  return (
    <>
      <div className="album-list">
        {tracks.length !== 0 ? (
          <>
            <div className="album-list__headlines">
              <span className="album-list__relase-date">Relase Date</span>

              <span className="album-list__labels">Label</span>
            </div>

            <ul className="album-list__list">
              {tracks.slice(0, numberTracks).map((item, index) => (
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
            </ul>

            <div className="album-list__view-all">
              <button className="album-list__button-view" onClick={handleClick}>
                {" "}
                <img src={imgPlus} alt="plus" />{" "}
                <span className="album-list__view-all-text">View All</span>
              </button>
            </div>
          </>
        ) : (
          <p className="album-list__subtitle">No music found</p>
        )}
      </div>
    </>
  );
};

export default AlbumList;
