import React, { useEffect, useState } from "react";
import HeaderArtist from "../../components/HeaderArtist/HeaderArtist";

import * as artistService from "../../services/ArtistService";
import Loader from "../../components/Loader/Loader";

const ArtistsPage = () => {
  const [artist, setArtist] = useState({});
  const [loading, setLoading] = useState(true);

  const fetchData = async () => {
    try {
      const getArtist = await artistService.getArtist("7dGJo4pcD2V6oG8kP0tJRR");

      const artist = {
        nameArtist: getArtist.profile.name,
        imageArtist: getArtist.visuals.gallery.items[1].sources[0].url,
        biographyArtist: getArtist.profile.biography.text,
      };

      setArtist(artist);
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
        <HeaderArtist artist={artist} htmlContent={artist.biographyArtist} />
      )}{" "}
    </>
  );
};

export default ArtistsPage;
