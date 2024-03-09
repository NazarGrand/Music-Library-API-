import Header from "./components/Header/Header";
import Sidebar from "./components/Sidebar/Sidebar";
import AppRoutes from "./routes/AppRoutes";
import "./App.scss";

function App() {
  return (
    <div className="app">
      <Sidebar />
      <div className="app__page">
        <Header />
        <AppRoutes />
      </div>
    </div>
  );
}

export default App;
