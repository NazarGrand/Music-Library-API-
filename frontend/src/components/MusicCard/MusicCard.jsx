import React, { useContext } from "react";
import "./MusicCard.scss";
import { Link } from "react-router-dom";
import { DispatchTrackContext } from "../../context/MusicContext";

import { musicContextActions } from "../../constants/MusicContextActions";

import imgNotes from "../../assets/images/Notes.svg";
import gifPlayTrack from "../../assets/images/TrackPlayNew.gif";
import imgPlayTrack from "../../assets/images/PlayMusicCard.svg";

const MusicCard = ({
  image,
  titleSong,
  titleAuthor,
  isPlayingSong,
  isPlaying,
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
    if (isPlayingSong) {
      dispatch({
        type: musicContextActions.setIsPlaying,
        payload: { isPlaying: !isPlaying },
      });
    } else {
      dispatch(action);
    }
  };

  return (
    <button className="music-card__button" onClick={handleClick}>
      <div className="music-card">
        <div className="music-card__block-image">
          <img className="music-card__image" src={image} alt="musicimg" />

          {isPlayingSong && (
            <>
              {isPlaying ? (
                <div className="music-card__gif-play">
                  <img
                    className="music-card__gif-play-track"
                    src={gifPlayTrack}
                    alt="trackplay"
                  />
                </div>
              ) : (
                <div className="music-card__img-play">
                  <img
                    className="music-card__img-play-track"
                    src={imgPlayTrack}
                    alt="trackplay"
                  />
                </div>
              )}

              <div className="music-card__darken-layer" />
            </>
          )}
        </div>

        <p className="music-card__title-song">{titleSong}</p>

        <div className="music-card__block">
          <Link className="music-card__link-author" to="/author">
            <p className="music-card__title-author">{titleAuthor}</p>
          </Link>

          <img className="music-card__notes" src={imgNotes} alt="notes" />
        </div>
      </div>
    </button>
  );
};

export default MusicCard;
