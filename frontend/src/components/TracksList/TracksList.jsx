import React, { useContext } from "react";
import "./TracksList.scss";
import TrackItem from "../TrackItem/TrackItem";

import imgPlus from "../../assets/images/Plus.svg";
import { Link, useLocation } from "react-router-dom";
import { StateTrackContext } from "../../context/MusicContext";
import { DispatchPlaylistContext } from "../../context/PlayListContext";
import { playlistContextActions } from "../../constants/PlaylistContextActions";
import { StateFavouriteTracksContext } from "../../context/FavouriteTracksContext";

const TracksList = ({ title, trackItems }) => {
  const { trackName, trackAuthor, isPlaying } = useContext(StateTrackContext);
  const album = "trending-songs";

  const dispatch = useContext(DispatchPlaylistContext);

  const location = useLocation();

  const { favouriteTracks } = useContext(StateFavouriteTracksContext);

  const initializePlaylistContext = () => {
    dispatch({
      type: playlistContextActions.setPlaylist,
      payload: { playlistTracks: trackItems },
    });
  };

  return (
    <div className="tracks">
      <div className="tracks__title">
        <span>{title} </span>{" "}
        <span className="tracks__title--pink"> Songs</span>
      </div>
      {trackItems.length !== 0 ? (
        <>
          <div className="tracks__headlines">
            <span className="tracks__relase-date">Relase Date</span>

            <span className="tracks__labels">Label</span>
          </div>

          <ul className="tracks__list">
            {trackItems.map((item, index) => (
              <li key={index}>
                <TrackItem
                  indexTrack={index + 1}
                  idTrack={item.idTrack}
                  image={item.image}
                  titleSong={item.titleSong}
                  artists={item.artists}
                  releaseDate={item.releaseDate}
                  label={item.label}
                  isPlayingSong={
                    trackName === item.titleSong &&
                    trackAuthor ===
                      item.artists.map((item) => item.name).join(", ")
                  }
                  isPlaying={isPlaying}
                  initializePlaylistContext={initializePlaylistContext}
                  isFavouriteTrack={favouriteTracks.find(
                    (elem) => elem.idTrack === item.idTrack
                  )}
                />
              </li>
            ))}
          </ul>

          <div className="tracks__view-all">
            <Link
              className="tracks__link-view"
              to={`/albums/${album}`}
              onClick={() =>
                sessionStorage.setItem(
                  `scrollPosition_${location.pathname}`,
                  window.pageYOffset
                )
              }
            >
              {" "}
              <img src={imgPlus} alt="plus" />{" "}
              <span className="tracks__view-all-text">View All</span>
            </Link>
          </div>
        </>
      ) : (
        <p className="tracks__subtitle">No music found</p>
      )}
    </div>
  );
};

export default TracksList;
