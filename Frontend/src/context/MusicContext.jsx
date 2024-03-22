import React, { createContext, useReducer } from "react";

const initialState = {
  trackName: null,
  trackAuthor: null,
  trackImage: null,
  trackUrl: null,
  trackVolume: 70,
  trackPrevVolume: 70,
};

export const StateTrackContext = createContext(initialState);
export const DispatchTrackContext = createContext(() => {});

export const MusicProvider = ({ children }) => {
  const [state, dispatch] = useReducer((state, action) => {
    switch (action.type) {
      case "SET_TRACK":
        return {
          ...state,
          trackName: action.payload.trackName,
          trackAuthor: action.payload.trackAuthor,
          trackImage: action.payload.trackImage,
        };
      case "SET_TRACK_URL":
        return {
          ...state,
          trackUrl: action.payload.trackUrl,
        };
      case "SET_VOLUME":
        return {
          ...state,
          trackVolume: action.payload.trackVolume,
          trackPrevVolume: action.payload.trackPrevVolume,
        };
      case "SET_NEW_VOLUME":
        return {
          ...state,
          trackVolume: action.payload.trackVolume,
        };
      default:
        return state;
    }
  }, initialState);

  return (
    <DispatchTrackContext.Provider value={dispatch}>
      <StateTrackContext.Provider value={state}>
        {children}
      </StateTrackContext.Provider>
    </DispatchTrackContext.Provider>
  );
};
