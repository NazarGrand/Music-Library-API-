import React from "react";
import "./MusicCard.scss";
import { Link } from "react-router-dom";
import { useMusicContext } from "../../context/MusicProvider";

import imgNotes from "../../assets/images/Notes.svg";

const MusicCard = ({ image, titleSong, titleAuthor }) => {
  const { setCurrentSong } = useMusicContext();

  const handleClick = () => {
    setCurrentSong({
      titleSong: titleSong,
      titleAuthor: titleAuthor,
      imgSong: image,
    });
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
