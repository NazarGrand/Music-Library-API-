import Sidebar from "./components/Sidebar/Sidebar";
import AppRoutes from "./routes/AppRoutes";
import "./App.scss";
import Footer from "./components/Footer/Footer";
import MusicPlayer from "./components/MusicPlayer/MusicPlayer";
import { useContext } from "react";
import { StateTrackContext } from "./context/MusicContext";
import { PlaylistProvider } from "./context/PlayListContext";

function App() {
  const { trackName } = useContext(StateTrackContext);

  return (
    <PlaylistProvider>
      <div className="app">
        <Sidebar />
        <div className="app__page">
          <div className="app__info">
            <AppRoutes />
          </div>
          <Footer />
        </div>
      </div>
      {trackName && <MusicPlayer />}
    </PlaylistProvider>
  );
}

export default App;
