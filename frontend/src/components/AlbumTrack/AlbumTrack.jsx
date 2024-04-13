import React, { useContext } from "react";
import moment from "moment";
import "./AlbumTrack.scss";

import imgHeart from "../../assets/images/Heart.svg";
import gifPlayTrack from "../../assets/images/TrackPlay.gif";
import imgPlayTrack from "../../assets/images/PlayMusic.svg";
import imgLoadingTrack from "../../assets/images/LoadingTrack.svg";

import {
  DispatchTrackContext,
  StateTrackContext,
} from "../../context/MusicContext";
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
  artists,
  durationSong,
  isPlayingSong,
  isPlaying,
  initializePlaylistContext,
}) => {
  const { isLoading } = useContext(StateTrackContext);
  const dispatch = useContext(DispatchTrackContext);

  const { currentIndexTrackPlaying } = useContext(StatePlaylistContext);
  const dispatchPlaylist = useContext(DispatchPlaylistContext);

  const handleClick = () => {
    if (initializePlaylistContext) initializePlaylistContext();

    const playing =
      currentIndexTrackPlaying === indexTrack - 1 ? !isPlaying : true;

    dispatch({
      type: musicContextActions.setTrack,
      payload: {
        trackName: titleSong,
        trackAuthor: artists.map((item) => item.name).join(", "),
        trackImage: image,
      },
    });

    dispatch({
      type: musicContextActions.setIsPlaying,
      payload: { isPlaying: playing },
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

            <span className="album-track__block-artists">
              {artists.map((item, index) => (
                <div key={index}>
                  <Link
                    className="album-track__link-author"
                    to={`/artists/${item.artistId}`}
                  >
                    <span className="album-track__title-author">
                      {item.name}
                    </span>
                  </Link>

                  {index !== artists.length - 1 && ",\u00A0"}
                </div>
              ))}
            </span>
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
              {isLoading ? (
                <>
                  <img
                    className="album-track__gif-play-track"
                    src={imgLoadingTrack}
                    alt="loading"
                  />
                  <div className="album-track__darken-layer" />
                </>
              ) : (
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
            </>
          )}
        </button>
      </div>
    </div>
  );
};

export default AlbumTrack;
