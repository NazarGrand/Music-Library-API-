import React, { useContext } from "react";
import "./TrackItem.scss";

import imgHeart from "../../assets/images/Heart.svg";
import { DispatchTrackContext } from "../../context/MusicContext";
import { musicContextActions } from "../../constants/MusicContextActions";
import { Link } from "react-router-dom";

function formatDate(inputDate) {
  const dateObj = new Date(inputDate);
  const monthNames = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];
  const monthIndex = dateObj.getMonth();
  const day = dateObj.getDate();
  const year = dateObj.getFullYear();

  const formattedDate = monthNames[monthIndex] + " " + day + ", " + year;
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

  const action = {
    type: musicContextActions.setTrack,
    payload: {
      trackName: titleSong,
      trackAuthor: titleAuthor,
      trackImage: image,
    },
  };

  const handleClick = () => {
    dispatch(action);
  };
  return (
    <div className="track-item">
      <span className="track-item__index-track">#{indexTrack}</span>

      <button className="track-item__container" onClick={handleClick}>
        <img className="track-item__image" src={image} alt="imgTrack" />

        <div className="track-item__title">
          <p className="track-item__title-song">{titleSong}</p>
          <p className="track-item__title-author">{titleAuthor}</p>
        </div>

        <p className="track-item__relase-date">{formatDate(releaseDate)}</p>

        <p className="track-item__label">{label}</p>

        <div className="track-item__heart">
          <Link to="/likes">
            <img src={imgHeart} alt="heart" />
          </Link>
        </div>
      </button>
    </div>
  );
};

export default TrackItem;
