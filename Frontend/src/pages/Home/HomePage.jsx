import React from "react";
import MusicCardsList from "../../components/MusicCardsList/MusicCardsList";
import * as music from "../../data/InformationMusic";

const HomePage = () => {
  return (
    <>
      <h1>Home Page</h1>

      <MusicCardsList title="Weekly Top" cardItems={music.MusicItems} />
    </>
  );
};

export default HomePage;
