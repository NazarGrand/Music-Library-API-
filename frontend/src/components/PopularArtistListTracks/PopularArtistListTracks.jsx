import React, { useContext } from "react";
import "./PopularArtistListTracks.scss";
import { Link } from "react-router-dom";
import { ROUTES } from "../../utils/routes";

import AlbumTrack from "../AlbumTrack/AlbumTrack";
import { StateTrackContext } from "../../context/MusicContext";
import { DispatchPlaylistContext } from "../../context/PlayListContext";
import { playlistContextActions } from "../../constants/PlaylistContextActions";

const PopularArtistListTracks = ({ popularTracks }) => {
  const { trackName, trackAuthor, isPlaying } = useContext(StateTrackContext);
  const dispatch = useContext(DispatchPlaylistContext);

  const initializePlaylistContext = () => {
    dispatch({
      type: playlistContextActions.setPlaylist,
      payload: { playlistTracks: popularTracks },
    });
  };

  return (
    <div className="popular-tracks">
      <div className="popular-tracks__title">
        <span>Popular </span>{" "}
        <span className="popular-tracks__title--pink"> Songs</span>
      </div>

      {popularTracks.length !== 0 ? (
        <>
          <div className="popular-tracks__time">
            <span className="popular-tracks__title-time">Time</span>
          </div>

          <ul className="popular-tracks__list">
            {popularTracks.map((item, index) => (
              <li key={index}>
                <AlbumTrack
                  indexTrack={index + 1}
                  image={item.image}
                  titleSong={item.titleSong}
                  artists={item.artists}
                  durationSong={item.duration}
                  isPlayingSong={
                    trackName === item.titleSong &&
                    trackAuthor ===
                      item.artists.map((item) => item.name).join(", ")
                  }
                  isPlaying={isPlaying}
                  initializePlaylistContext={initializePlaylistContext}
                />
              </li>
            ))}
          </ul>
        </>
      ) : (
        <p className="popular-tracks__subtitle">No music found</p>
      )}
    </div>
  );
};

export default PopularArtistListTracks;
