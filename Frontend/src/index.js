import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import "./index.scss";
import App from "./App";
import { MusicProvider } from "./context/MusicContext";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <BrowserRouter>
    <MusicProvider>
      <App />
    </MusicProvider>
  </BrowserRouter>
);
