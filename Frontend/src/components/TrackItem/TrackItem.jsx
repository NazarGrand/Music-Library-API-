import React, { useContext } from "react";
import dayjs from "dayjs";
import "./TrackItem.scss";

import imgHeart from "../../assets/images/Heart.svg";
import { DispatchTrackContext } from "../../context/MusicContext";
import { musicContextActions } from "../../constants/MusicContextActions";
import { Link } from "react-router-dom";

function formatDate(inputDate) {
  const dateObj = dayjs(inputDate);
  const formattedDate = dateObj.format("MMM D, YYYY");
  return formattedDate;
}

const TrackItem = ({
  indexTrack,
  image,
  titleSong,
  titleAuthor,
  releaseDate,
  label,
}) => {
  const dispatch = useContext(DispatchTrackContext);

  const handleClick = (event) => {
    if (event.target.tagName !== "P") {
      dispatch({
        type: musicContextActions.setTrack,
        payload: {
          trackName: titleSong,
          trackAuthor: titleAuthor,
          trackImage: image,
        },
      });
    }
  };
  return (
    <div className="track-item">
      <span className="track-item__index-track">#{indexTrack}</span>

      <div className="track-item__container">
        <button className="track-item__button" onClick={handleClick}>
          <img className="track-item__image" src={image} alt="imgTrack" />

          <div className="track-item__title">
            <p className="track-item__title-song-area">
              <span className="track-item__title-song">{titleSong}</span>
            </p>

            <Link className="track-item__link-author" to="/author">
              <span className="track-item__title-author">{titleAuthor}</span>
            </Link>
          </div>
        </button>

        <p className="track-item__relase-date">{formatDate(releaseDate)}</p>

        <p className="track-item__label">{label}</p>

        <div className="track-item__heart">
          <button className="track-item__button-like">
            <img src={imgHeart} alt="heart" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default TrackItem;
