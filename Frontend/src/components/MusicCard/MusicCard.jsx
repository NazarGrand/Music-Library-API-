import React from "react";
import "./MusicCard.scss";

import imgNotes from "../../assets/images/Notes.svg";

const MusicCard = ({ image, titleSong, titleAuthor }) => {
  return (
    <div className="music-card">
      <img className="music-card__image" src={image} alt="musicimg" />

      <p className="music-card__title-song">{titleSong}</p>

      <div className="music-card__block">
        <p className="music-card__title-author">{titleAuthor}</p>

        <img className="music-card__notes" src={imgNotes} alt="notes" />
      </div>
    </div>
  );
};

export default MusicCard;
