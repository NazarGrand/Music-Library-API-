import Header from "./components/Header/Header";
import Sidebar from "./components/Sidebar/Sidebar";
import AppRoutes from "./routes/AppRoutes";
import "./App.scss";
import Footer from "./components/Footer/Footer";

function App() {
  return (
    <div className="app">
      <Sidebar />
      <div className="app__page">
        <Header />
        <div className="app__info">
          <AppRoutes />
        </div>
        <Footer />
      </div>
    </div>
  );
}

export default App;
