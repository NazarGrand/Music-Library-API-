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
  const [playlists, setPlaylists] = useState([]);

  const fetchData = async () => {
    setLoading(true);
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
        artists: item.track.artists.items.map((artist) => ({
          name: artist.profile.name,
          artistId: artist.uri.split(":")[2],
        })),
        duration: item.track.duration.totalMilliseconds,
      }));

      const albumsArtist = getArtist.discography.popularReleases.items.map(
        (item) => ({
          image: item.releases.items[0].coverArt.sources[0].url,
          title: item.releases.items[0].name,
          yearAlbum: item.releases.items[0].date.year,
          albumId: item.releases.items[0].uri.split(":")[2],
        })
      );

      const songsArtist = getArtist.discography.singles.items.map((item) => ({
        image: item.releases.items[0].coverArt.sources[0].url,
        titleSong: item.releases.items[0].name,
        artists: [{ name: artist.nameArtist }],
        yearSong: item.releases.items[0].date.year,
      }));

      const playlistsArtist = getArtist.relatedContent.discoveredOn.items.map(
        (item) => ({
          image: item.images.items[0].sources[0].url,
          title: item.name,
        })
      );

      setArtist(artist);
      setPopularTracks(tracks);
      setAlbums(albumsArtist);
      setSongs(songsArtist);
      setPlaylists(playlistsArtist);
    } catch (error) {
      console.error("Error getting data:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [artistId]);

  useEffect(() => {
    window.scrollTo({
      top: 0,
    });
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
            songs={songs ?? []}
            playlists={playlists ?? []}
          />
        </>
      )}
    </>
  );
};

export default ArtistsPage;
