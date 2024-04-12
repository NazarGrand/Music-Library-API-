import React from "react";
import moment from "moment";
import "./AlbumTrack.scss";

import imgHeart from "../../assets/images/Heart.svg";

import { Link } from "react-router-dom";

function formatMilliseconds(milliseconds) {
  const duration = moment.duration(milliseconds);

  let formattedTime = "";

  if (duration.hours() > 0) {
    formattedTime += `${duration.hours()}:`;

    if (duration.minutes() > 0 && duration.minutes() < 10) {
      formattedTime += `0${duration.minutes()}:`;
    } else {
      formattedTime += `${duration.minutes()}:`;
    }

    if (duration.seconds() > 0 && duration.seconds() < 10) {
      formattedTime += `0${duration.seconds()}`;
    } else {
      formattedTime += `${duration.seconds()}`;
    }
  } else {
    formattedTime += `${duration.minutes()}:`;
    if (duration.seconds() > 0 && duration.seconds() < 10) {
      formattedTime += `0${duration.seconds()}`;
    } else {
      formattedTime += `${duration.seconds()}`;
    }
  }
  return formattedTime;
}

const AlbumTrack = ({
  indexTrack,
  image,
  titleSong,
  titleAuthor,
  durationSong,
  isPlayingSong,
  isPlaying,
}) => {
  let isLoading = true;

  const handleClick = () => {};

  return (
    <div className="album-track">
      <span className="album-track__index-track">#{indexTrack}</span>

      <div className="album-track__container">
        <div className="album-track__block-title">
          <button className="album-track__button" onClick={handleClick}>
            <img className="album-track__image" src={image} alt="imgTrack" />
          </button>

          <div className="album-track__title">
            <button className="album-track__button" onClick={handleClick}>
              <span className="album-track__title-song">{titleSong}</span>
            </button>

            <Link className="album-track__link-author" to="/author">
              <span className="album-track__title-author">{titleAuthor}</span>
            </Link>
          </div>
        </div>

        <div className="album-track__block-time-song">
          <div className="album-track__heart">
            <button className="album-track__button-like">
              <img src={imgHeart} alt="heart" />
            </button>
          </div>

          <p className="album-track__duration-song">
            {formatMilliseconds(durationSong)}
          </p>
        </div>
      </div>
    </div>
  );
};

export default AlbumTrack;
