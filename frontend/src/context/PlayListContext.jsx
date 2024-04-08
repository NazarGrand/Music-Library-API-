import React, { createContext, useReducer } from "react";
import { playlistContextActions } from "../constants/PlaylistContextActions";

const initialState = {
  playlistTracks: null,
  currentIndexTrackPlaying: null,
};

export const StatePlaylistContext = createContext(initialState);
export const DispatchPlaylistContext = createContext(() => {});

export const PlaylistProvider = ({ children }) => {
  const [state, dispatch] = useReducer((state, action) => {
    switch (action.type) {
      case playlistContextActions.setPlaylist:
        return {
          ...state,
          playlistTracks: action.payload.playlistTracks,
        };
      case playlistContextActions.setCurrentIndexTrackPlaying:
        return {
          ...state,
          currentIndexTrackPlaying: action.payload.currentIndexTrackPlaying,
        };
      default:
        return state;
    }
  }, initialState);

  return (
    <DispatchPlaylistContext.Provider value={dispatch}>
      <StatePlaylistContext.Provider value={state}>
        {children}
      </StatePlaylistContext.Provider>
    </DispatchPlaylistContext.Provider>
  );
};
