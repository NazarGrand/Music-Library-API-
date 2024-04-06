import React, { useContext } from "react";
import "./HeaderAlbum.scss";
import NavAlbums from "../NavAlbums/NavAlbums";

import imgTrendingMusic from "../../assets/images/TrendingMusic.png";
import imgPlayAll from "../../assets/images/PlayAll.svg";
import { DispatchTrackContext } from "../../context/MusicContext";
import { musicContextActions } from "../../constants/MusicContextActions";

const HeaderAlbum = ({ tracks }) => {
  const dispatch = useContext(DispatchTrackContext);

  const handlePlayAllClick = () => {
    if (tracks.length !== 0) {
      dispatch({
        type: musicContextActions.setTrack,
        payload: {
          trackName: tracks[0].titleSong,
          trackAuthor: tracks[0].titleAuthor,
          trackImage: tracks[0].image,
        },
      });
    }
  };

  return (
    <div className="header-album">
      <NavAlbums />

      <div className="header-album__block">
        <img
          className="header-album__image"
          src={imgTrendingMusic}
          alt="trendMusic"
        />

        <div className="header-album__block-title">
          <p className="header-album__title">Trending songs</p>

          <p className="header-album__title-author">
            {tracks.length !== 0 && (
              <>
                {tracks
                  .slice(0, 4)
                  .map((item, index) => item.titleAuthor)
                  .join(", ")}{" "}
                {"and ..."}
              </>
            )}
          </p>

          {tracks.length !== 0 && (
            <p className="header-album__title-count">{tracks.length} songs</p>
          )}
        </div>

        <button
          className="header-album__button-play"
          onClick={handlePlayAllClick}
        >
          <p className="header-album__title-play">Play All</p>

          <img src={imgPlayAll} alt="playall" />
        </button>
      </div>
    </div>
  );
};

export default HeaderAlbum;
