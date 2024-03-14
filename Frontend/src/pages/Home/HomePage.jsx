import React, { useState, useEffect } from "react";
import axios from "axios";

import MusicCardsList from "../../components/MusicCardsList/MusicCardsList";
import Loader from "../../components/Loader/Loader";

const options = {
  method: "GET",
  url: "https://spotify81.p.rapidapi.com/top_200_tracks",
  headers: {
    "X-RapidAPI-Key": "ec0785e3ccmsh1ea5cee02fdacc3p1fc185jsna8790c59c7be",
    "X-RapidAPI-Host": "spotify81.p.rapidapi.com",
  },
};

const HomePage = () => {
  const [topSongs, setTopSongs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.request(options);
        const newTopSongs = response.data.map((item) => ({
          image: item.trackMetadata.displayImageUri,
          titleSong: item.trackMetadata.trackName,
          titleAuthor: item.trackMetadata.artists
            .map((artist) => artist.name)
            .join(", "),
        }));
        console.log(newTopSongs);
        // const response = await axios.get(options);
        setTopSongs(newTopSongs);
        setLoading(false);
      } catch (error) {
        console.error("Помилка отримання даних:", error);
        setLoading(false);
      }
    };

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
