import React from "react";
import "./Artist.scss";
import PopularArtistListTracks from "../PopularArtistListTracks/PopularArtistListTracks";
import AlbumCatalog from "../AlbumCatalog/AlbumCatalog";
import MusicCardsList from "../MusicCardsList/MusicCardsList";

const Artist = ({ popularTracks, albums, songs }) => {
  return (
    <div className="artist">
      <PopularArtistListTracks popularTracks={popularTracks} />

      <AlbumCatalog albumItems={albums} />

      <MusicCardsList title="Single" cardItems={songs} />
    </div>
  );
};

export default Artist;
