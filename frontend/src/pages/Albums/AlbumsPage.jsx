import React, { useEffect, useState } from "react";
import Album from "../../components/Album/Album";
import { useParams } from "react-router-dom";
import * as musicService from "../../services/MusicService.js";
import Loader from "../../components/Loader/Loader.jsx";
import HeaderAlbum from "../../components/HeaderAlbum/HeaderAlbum.jsx";

const AlbumsPage = () => {
  let { album } = useParams();

  const [songs, setSongs] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchData = async () => {
    try {
      setLoading(true);
      console.log(album);
      if (album === "weekly-top" || album === "trending-songs") {
        console.log("yes");
        const weeklyTopSongs = await musicService.getWeekTopChart();

        const newTopSongs = weeklyTopSongs.map((item) => ({
          image: item.trackMetadata.displayImageUri,
          titleSong: item.trackMetadata.trackName,
          titleAuthor: item.trackMetadata.artists
            .map((artist) => artist.name)
            .join(", "),
          releaseDate: item.trackMetadata.releaseDate,
          label: item.trackMetadata.labels[0].name,
        }));

        setSongs(newTopSongs);
      }
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
      {loading ? (
        <Loader />
      ) : (
        <>
          {" "}
          <HeaderAlbum tracks={songs} /> <Album tracks={songs} />{" "}
        </>
      )}
    </>
  );
};

export default AlbumsPage;
