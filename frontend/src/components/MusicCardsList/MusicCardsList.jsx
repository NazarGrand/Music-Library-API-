import React, { useContext } from "react";
import "./MusicCardsList.scss";
import MusicCard from "../MusicCard/MusicCard";
import { StateTrackContext } from "../../context/MusicContext";
import { Link } from "react-router-dom";
import { ROUTES } from "../../utils/routes";
import { DispatchPlaylistContext } from "../../context/PlayListContext";
import { playlistContextActions } from "../../constants/PlaylistContextActions";

const MusicCardsList = ({ title, cardItems }) => {
  const { trackName, trackAuthor, isPlaying } = useContext(StateTrackContext);

  const dispatch = useContext(DispatchPlaylistContext);

  const album = "weekly-top";

  const initializePlaylistContext = () => {
    dispatch({
      type: playlistContextActions.setPlaylist,
      payload: { playlistTracks: cardItems },
    });
  };

  return (
    <div className="music-catalog">
      <p className="music-catalog__title">
        {title} <span className="music-catalog__title--pink">Songs</span>
      </p>
      {cardItems.length !== 0 ? (
        <div className="music-catalog__block">
          <ul className="music-catalog__list">
            {cardItems.map((item, index) => (
              <li key={index}>
                <MusicCard
                  indexTrack={index}
                  image={item.image}
                  titleSong={item.titleSong}
                  titleAuthor={item.titleAuthor}
                  isPlayingSong={
                    trackName === item.titleSong &&
                    trackAuthor === item.titleAuthor
                  }
                  isPlaying={isPlaying}
                  initializePlaylistContext={initializePlaylistContext}
                />
              </li>
            ))}
          </ul>

          <Link className="music-catalog__view-all" to={`albums/${album}`}>
            <div className="music-catalog__button">+</div>

            <p className="music-catalog__btn-text">View All</p>
          </Link>
        </div>
      ) : (
        <p className="music-catalog__subtitle">No music found</p>
      )}
    </div>
  );
};

export default MusicCardsList;
