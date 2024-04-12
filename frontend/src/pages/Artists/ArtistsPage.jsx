import React, { useEffect, useState } from "react";
import HeaderArtist from "../../components/HeaderArtist/HeaderArtist";

import * as artistService from "../../services/ArtistService";
import Loader from "../../components/Loader/Loader";
import { useParams } from "react-router-dom";
import Artist from "../../components/Artist/Artist";

const ArtistsPage = () => {
  let { artistId } = useParams();

  const [artist, setArtist] = useState({});
  const [popularTracks, setPopularTracks] = useState([]);
  const [albums, setAlbums] = useState([]);
  const [loading, setLoading] = useState(true);
  const [songs, setSongs] = useState([]);

  const fetchData = async () => {
    try {
      const getArtist = await artistService.getArtist(artistId);

      const artist = {
        nameArtist: getArtist.profile.name,
        imageArtist: getArtist.visuals.headerImage.sources[0].url,
        biographyArtist: getArtist.profile.biography.text,
      };

      const tracks = getArtist.discography.topTracks.items.map((item) => ({
        image: item.track.album.coverArt.sources[0].url,
        titleSong: item.track.name,
        titleAuthor: item.track.artists.items
          .map((artist) => artist.profile.name)
          .join(", "),
        duration: item.track.duration.totalMilliseconds,
      }));

      const albumsArtist = getArtist.discography.popularReleases.items.map(
        (item) => ({
          image: item.releases.items[0].coverArt.sources[0].url,
          titleAlbum: item.releases.items[0].name,
          yearAlbum: item.releases.items[0].date.year,
        })
      );

      const songsArtist = getArtist.discography.singles.items.map((item) => ({
        image: item.releases.items[0].coverArt.sources[0].url,
        titleSong: item.releases.items[0].name,
        titleAuthor: item.releases.items[0].date.year,
      }));

      setArtist(artist);
      setPopularTracks(tracks);
      setAlbums(albumsArtist);
      setSongs(songsArtist);
    } catch (error) {
      console.error("Error getting data:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <>
      {" "}
      {loading ? (
        <Loader />
      ) : (
        <>
          <HeaderArtist artist={artist} htmlContent={artist.biographyArtist} />

          <Artist
            popularTracks={popularTracks ?? []}
            albums={albums ?? []}
            songs={songs.slice(0, 5) ?? []}
          />
        </>
      )}
    </>
  );
};

export default ArtistsPage;
