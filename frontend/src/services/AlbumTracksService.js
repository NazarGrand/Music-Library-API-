import axios from "axios";

const options = {
  method: "GET",
  url: "https://spotify81.p.rapidapi.com/album_tracks",
  params: {
    offset: "0",
    limit: "300",
  },
  headers: {
    "X-RapidAPI-Key": "ec0785e3ccmsh1ea5cee02fdacc3p1fc185jsna8790c59c7be",
    "X-RapidAPI-Host": "spotify81.p.rapidapi.com",
  },
};

export const getTracks = async (idAlbum) => {
  const response = await axios.request({
    ...options,
    params: {
      ...options.params,
      id: idAlbum,
    },
  });

  const data = response.data.data.album.tracks.items;

  return data;
};
