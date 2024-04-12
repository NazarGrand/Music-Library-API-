import React, { useContext } from "react";
import "./PopularArtistListTracks.scss";
import { Link } from "react-router-dom";
import { ROUTES } from "../../utils/routes";

import AlbumTrack from "../AlbumTrack/AlbumTrack";
import { StateTrackContext } from "../../context/MusicContext";

const PopularArtistListTracks = ({ popularTracks }) => {
  const { trackName, trackAuthor, isPlaying } = useContext(StateTrackContext);

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
            {popularTracks.slice(0, 5).map((item, index) => (
              <li key={index}>
                <AlbumTrack
                  indexTrack={index + 1}
                  image={item.image}
                  titleSong={item.titleSong}
                  titleAuthor={item.titleAuthor}
                  durationSong={item.duration}
                  isPlayingSong={
                    trackName === item.titleSong &&
                    trackAuthor === item.titleAuthor
                  }
                  isPlaying={isPlaying}
                />
              </li>
            ))}
          </ul>

          {popularTracks.length > 5 && (
            <div className="popular-tracks__view-all">
              <Link className="popular-tracks__link-view" to={ROUTES.ALBUMS}>
                <span className="popular-tracks__view-all-text">Show All</span>
              </Link>
            </div>
          )}
        </>
      ) : (
        <p className="popular-tracks__subtitle">No music found</p>
      )}
    </div>
  );
};

export default PopularArtistListTracks;
