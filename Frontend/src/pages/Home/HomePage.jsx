import React, { useState, useEffect } from "react";

import MusicCardsList from "../../components/MusicCardsList/MusicCardsList";
import Loader from "../../components/Loader/Loader";
import * as musicService from "../../services/MusicService";
// import { MusicItems } from "../../data/InformationMusic";

const HomePage = () => {
  const [topSongs, setTopSongs] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchData = async () => {
    try {
      const weeklyTopSongs = await musicService.getWeekTopChart();

      const newTopSongs = weeklyTopSongs.map((item) => ({
        image: item.trackMetadata.displayImageUri,
        titleSong: item.trackMetadata.trackName,
        titleAuthor: item.trackMetadata.artists
          .map((artist) => artist.name)
          .join(", "),
      }));

      setTopSongs(newTopSongs);
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
        <div>
          <h1>Home Page</h1>
          <MusicCardsList
            title="Weekly Top"
            cardItems={topSongs.slice(0, 5) ?? []}
          />
        </div>
      )}
    </>
  );
};

export default HomePage;
