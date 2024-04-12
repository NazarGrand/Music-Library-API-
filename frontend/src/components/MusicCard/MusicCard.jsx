import React, { useContext } from "react";
import "./MusicCard.scss";
import { Link } from "react-router-dom";
import {
  DispatchTrackContext,
  StateTrackContext,
} from "../../context/MusicContext";

import { musicContextActions } from "../../constants/MusicContextActions";

import imgNotes from "../../assets/images/Notes.svg";
import gifPlayTrack from "../../assets/images/TrackPlay.gif";
import imgPlayTrack from "../../assets/images/PlayMusic.svg";
import imgLoadingTrack from "../../assets/images/LoadingTrack.svg";

import {
  DispatchPlaylistContext,
  StatePlaylistContext,
} from "../../context/PlayListContext";
import { playlistContextActions } from "../../constants/PlaylistContextActions";

const MusicCard = ({
  indexTrack,
  image,
  titleSong,
  titleAuthor,
  isPlayingSong,
  isPlaying,
  initializePlaylistContext,
}) => {
  const { isLoading } = useContext(StateTrackContext);
  const dispatch = useContext(DispatchTrackContext);

  const { currentIndexTrackPlaying } = useContext(StatePlaylistContext);
  const dispatchPlaylist = useContext(DispatchPlaylistContext);

  const handleClick = () => {
    initializePlaylistContext();

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
        currentIndexTrackPlaying: indexTrack,
      },
    });
  };

  return (
    <button className="music-card__button" onClick={handleClick}>
      <div className="music-card">
        <img className="music-card__image" src={image} alt="musicimg" />

        <p className="music-card__title-song">{titleSong}</p>

        <div className="music-card__block">
          <Link className="music-card__link-author" to="/author">
            <span>{titleAuthor}</span>
          </Link>

          <img className="music-card__notes" src={imgNotes} alt="notes" />
        </div>

        {isPlayingSong && (
          <>
            {isLoading ? (
              <>
                <img
                  className="music-card__gif-play-track"
                  src={imgLoadingTrack}
                  alt="loading"
                />
                <div className="music-card__darken-layer" />
              </>
            ) : (
              <>
                {isPlaying ? (
                  <img
                    className="music-card__gif-play-track"
                    src={gifPlayTrack}
                    alt="trackplay"
                  />
                ) : (
                  <img
                    className="music-card__img-play-track"
                    src={imgPlayTrack}
                    alt="trackplay"
                  />
                )}
                <div className="music-card__darken-layer" />
              </>
            )}
          </>
        )}
      </div>
    </button>
  );
};

export default MusicCard;
