import React, { useContext } from "react";
import "./MusicCard.scss";
import { Link } from "react-router-dom";
import { DispatchTrackContext } from "../../context/MusicContext";

import { musicContextActions } from "../../constants/MusicContextActions";

import imgNotes from "../../assets/images/Notes.svg";

const MusicCard = ({ image, titleSong, titleAuthor }) => {
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
    <div className="music-card">
      <button className="music-card__button" onClick={handleClick}>
        <img className="music-card__image" src={image} alt="musicimg" />

        <p className="music-card__title-song">{titleSong}</p>

        <div className="music-card__block">
          <Link className="music-card__link-author" to="/author">
            <p className="music-card__title-author">{titleAuthor}</p>
          </Link>

          <img className="music-card__notes" src={imgNotes} alt="notes" />
        </div>
      </button>
    </div>
  );
};

export default MusicCard;
