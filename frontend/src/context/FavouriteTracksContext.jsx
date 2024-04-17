import React, { createContext, useContext } from "react";
import { useLocalStorage } from "../hooks/useLocalStorage";

const FavouriteTracksContext = createContext();

export const FavouriteTracksProvider = ({ children }) => {
  const [data, setData] = useLocalStorage([], "varouriteTracks");

  return (
    <FavouriteTracksContext.Provider value={{ data, setData }}>
      {children}
    </FavouriteTracksContext.Provider>
  );
};

export const useMyContext = () => useContext(FavouriteTracksContext);
