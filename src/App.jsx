import { Routes, Route, Link } from "react-router-dom";
import DailySpacePhoto from "./components/DailySpacePhoto";
import ExplorePage from "./components/ExplorePage";
import About from "./components/About";
import FavoritesPage from "./components/FavoritesPage";
import "./App.css";

function App() {
  return (
    <div className="app">
      <header className="app__header">
        <h1 className="app__title">🚀 ExpoPlanets</h1>
        <nav className="app__nav">
          <Link to="/" className="app__nav-link">
            Today
          </Link>
          <Link to="/explore" className="app__nav-link">
            Explore
          </Link>
          <Link to="/favorites" className="app__nav-link">
            ⭐ Favorites
          </Link>
          <Link to="/about" className="app__nav-link">
            About
          </Link>
          <a
            href="https://api.nasa.gov/"
            target="_blank"
            rel="noopener noreferrer"
            className="app__nav-link app__nav-link--external"
          >
            NASA API
          </a>
        </nav>
      </header>

      <main className="app__main">
        <Routes>
          <Route path="/" element={<DailySpacePhoto />} />
          <Route path="/explore" element={<ExplorePage />} />
          <Route path="/favorites" element={<FavoritesPage />} />
          <Route path="/about" element={<About />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;
