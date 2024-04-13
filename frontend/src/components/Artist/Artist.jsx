import React from "react";
import "./Artist.scss";
import PopularArtistListTracks from "../PopularArtistListTracks/PopularArtistListTracks";
import AlbumCatalog from "../AlbumCatalog/AlbumCatalog";
import MusicCardsList from "../MusicCardsList/MusicCardsList";

const Artist = ({ popularTracks, albums, songs, playlists }) => {
  return (
    <div className="artist">
      <PopularArtistListTracks popularTracks={popularTracks} />

      <AlbumCatalog albumItems={albums} type="album" />

      <MusicCardsList title="Single" cardItems={songs} type="artist-songs" />

      <AlbumCatalog albumItems={playlists} type="playlist" />
    </div>
  );
};

export default Artist;
