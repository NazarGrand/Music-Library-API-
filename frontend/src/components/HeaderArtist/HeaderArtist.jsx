import React from "react";
import "./HeaderArtist.scss";

const HeaderArtist = ({ artist, htmlContent }) => {
  return (
    <div className="header-artist">
      <img
        className="header-artist__image"
        src={artist.imageArtist}
        alt="imgArtist"
      />

      <p className="header-artist__name">{artist.nameArtist}</p>

      <div dangerouslySetInnerHTML={{ __html: htmlContent }} />
    </div>
  );
};

export default HeaderArtist;
