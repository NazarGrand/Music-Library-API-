import React, { createContext, useContext, useState } from "react";

const MusicContext = createContext();

export const useMusicContext = () => useContext(MusicContext);

export const MusicProvider = ({ children }) => {
  const [currentSong, setCurrentSong] = useState(null);
  const [volume, setVolume] = useState({ currentVolume: 70, prevVolume: 70 });

  return (
    <MusicContext.Provider
      value={{
        currentSong,
        setCurrentSong,
        volume,
        setVolume,
      }}
    >
      {children}
    </MusicContext.Provider>
  );
};
