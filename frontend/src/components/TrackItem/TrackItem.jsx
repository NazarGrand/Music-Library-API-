import React, { useContext } from "react";
import dayjs from "dayjs";
import "./TrackItem.scss";

import imgHeart from "../../assets/images/Heart.svg";
import gifPlayTrack from "../../assets/images/TrackPlay.gif";
import imgPlayTrack from "../../assets/images/PlayMusic.svg";

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
  isPlayingSong,
  isPlaying,
}) => {
  const dispatch = useContext(DispatchTrackContext);

  const handleClick = () => {
    if (isPlayingSong) {
      dispatch({
        type: musicContextActions.setIsPlaying,
        payload: { isPlaying: !isPlaying },
      });
    } else {
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
        <div className="track-item__block-title">
          <button className="track-item__button" onClick={handleClick}>
            <img className="track-item__image" src={image} alt="imgTrack" />
          </button>

          <div className="track-item__title">
            <button className="track-item__button" onClick={handleClick}>
              <span className="track-item__title-song">{titleSong}</span>
            </button>

            <Link className="track-item__link-author" to="/author">
              <span className="track-item__title-author">{titleAuthor}</span>
            </Link>
          </div>
        </div>

        <p className="track-item__relase-date">{formatDate(releaseDate)}</p>

        <p className="track-item__label">{label}</p>

        <div className="track-item__heart">
          <button className="track-item__button-like">
            <img src={imgHeart} alt="heart" />
          </button>
        </div>

        <button className="track-item__button" onClick={handleClick}>
          {isPlayingSong && (
            <>
              {isPlaying ? (
                <img
                  className="track-item__gif-play-track"
                  src={gifPlayTrack}
                  alt="trackplay"
                />
              ) : (
                <img
                  className="track-item__img-play-track"
                  src={imgPlayTrack}
                  alt="trackplay"
                />
              )}
              <div className="track-item__darken-layer" />
            </>
          )}
        </button>
      </div>
    </div>
  );
};

export default TrackItem;
