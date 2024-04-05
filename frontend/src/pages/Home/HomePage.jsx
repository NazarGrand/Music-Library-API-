import React, { useState, useEffect, useContext } from "react";

import MusicCardsList from "../../components/MusicCardsList/MusicCardsList";
import Loader from "../../components/Loader/Loader";
import * as musicService from "../../services/MusicService";
import TracksList from "../../components/TracksList/TracksList";
import ArtistsList from "../../components/ArtistsList/ArtistsList";
import { ArtistItems } from "../../data/InformationArtists";
import Slider from "../../components/Slider/Slider";
import Header from "../../components/Header/Header";
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
        releaseDate: item.trackMetadata.releaseDate,
        label: item.trackMetadata.labels[0].name,
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
      <Header />
      {loading ? (
        <Loader />
      ) : (
        <div>
          <Slider />

          <MusicCardsList
            title="Weekly Top"
            cardItems={topSongs.slice(0, 5) ?? []}
          />

          <TracksList
            title="Trending"
            trackItems={topSongs.slice(5, 12) ?? []}
          />

          <ArtistsList title="Popular" artistItems={ArtistItems ?? []} />
        </div>
      )}
    </>
  );
};

export default HomePage;
