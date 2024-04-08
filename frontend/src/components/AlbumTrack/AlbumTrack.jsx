import React, { useContext } from "react";
import moment from "moment";
import "./AlbumTrack.scss";

import imgHeart from "../../assets/images/Heart.svg";
import gifPlayTrack from "../../assets/images/TrackPlay.gif";
import imgPlayTrack from "../../assets/images/PlayMusic.svg";

import { DispatchTrackContext } from "../../context/MusicContext";
import { musicContextActions } from "../../constants/MusicContextActions";
import { Link } from "react-router-dom";
import {
  DispatchPlaylistContext,
  StatePlaylistContext,
} from "../../context/PlayListContext";
import { playlistContextActions } from "../../constants/PlaylistContextActions";

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
  const dispatch = useContext(DispatchTrackContext);

  const { currentIndexTrackPlaying } = useContext(StatePlaylistContext);
  const dispatchPlaylist = useContext(DispatchPlaylistContext);

  const handleClick = () => {
    const playing =
      currentIndexTrackPlaying === indexTrack - 1 ? !isPlaying : true;

    dispatch({
      type: musicContextActions.setIsPlaying,
      payload: { isPlaying: playing },
    });

    dispatch({
      type: musicContextActions.setTrack,
      payload: {
        trackName: titleSong,
        trackAuthor: titleAuthor,
        trackImage: image,
      },
    });

    dispatchPlaylist({
      type: playlistContextActions.setCurrentIndexTrackPlaying,
      payload: {
        currentIndexTrackPlaying: indexTrack - 1,
      },
    });
  };

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

        <button className="album-track__button" onClick={handleClick}>
          {isPlayingSong && (
            <>
              {isPlaying ? (
                <img
                  className="album-track__gif-play-track"
                  src={gifPlayTrack}
                  alt="trackplay"
                />
              ) : (
                <img
                  className="album-track__img-play-track"
                  src={imgPlayTrack}
                  alt="trackplay"
                />
              )}
              <div className="album-track__darken-layer" />
            </>
          )}
        </button>
      </div>
    </div>
  );
};

export default AlbumTrack;
