import { useState, useEffect } from "react";
import { getFavorites, removeFavorite } from "../utils/favorites";
import APODModal from "./APODModal";
import "./FavoritesPage.css";

function FavoritesPage() {
  const [favorites, setFavorites] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedAPOD, setSelectedAPOD] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    loadFavorites();
  }, []);

  const loadFavorites = () => {
    setLoading(true);
    try {
      const savedFavorites = getFavorites();
      setFavorites(savedFavorites);
    } catch (error) {
      console.error("Error loading favorites:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleRemoveFavorite = (apodDate) => {
    const success = removeFavorite(apodDate);
    if (success) {
      setFavorites((prev) => prev.filter((fav) => fav.date !== apodDate));
    }
  };

  const handleOpenModal = (favorite) => {
    setSelectedAPOD(favorite);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedAPOD(null);
  };

  const renderFavoriteCard = (favorite) => {
    const isZodiacFavorite = favorite.zodiacSign && favorite.cosmicMessage;

    return (
      <article
        key={favorite.id}
        className="favorites-page__card favorites-page__card--clickable"
        onClick={() => handleOpenModal(favorite)}
      >
        <button
          onClick={(e) => {
            e.stopPropagation();
            handleRemoveFavorite(favorite.date);
          }}
          className="favorites-page__remove-btn"
          title="Remove from favorites"
        >
          ❌
        </button>

        {isZodiacFavorite && (
          <div className="favorites-page__zodiac-badge">
            <span className="favorites-page__zodiac-symbol">
              {favorite.zodiacSign.symbol}
            </span>
            <span className="favorites-page__zodiac-name">
              {favorite.zodiacSign.name}
            </span>
          </div>
        )}

        <div className="favorites-page__card-header">
          <h3 className="favorites-page__card-title">{favorite.title}</h3>
        </div>

        <time className="favorites-page__card-date">{favorite.date}</time>

        {favorite.media_type === "image" ? (
          <img
            src={favorite.url}
            alt={favorite.title}
            className="favorites-page__card-image"
            loading="lazy"
          />
        ) : (
          <div className="favorites-page__video-placeholder">
            <span className="favorites-page__video-icon">🎥</span>
            <p>Video Content</p>
          </div>
        )}

        <p className="favorites-page__card-explanation">
          {favorite.explanation.length > 150
            ? `${favorite.explanation.substring(0, 150)}...`
            : favorite.explanation}
        </p>

        {isZodiacFavorite && (
          <p className="favorites-page__cosmic-message">
            ✨ {favorite.cosmicMessage}
          </p>
        )}

        <div className="favorites-page__card-meta">
          <span className="favorites-page__favorite-date">
            ⭐ Saved on {new Date(favorite.favoriteDate).toLocaleDateString()}
          </span>
        </div>
      </article>
    );
  };

  if (loading) {
    return (
      <div className="favorites-page">
        <div className="favorites-page__loading">
          <span className="favorites-page__loading-icon">🌟</span>
          <p>Loading your cosmic favorites...</p>
        </div>
      </div>
    );
  }

  if (favorites.length === 0) {
    return (
      <div className="favorites-page">
        <header className="favorites-page__header">
          <h1 className="favorites-page__title">⭐ Your Cosmic Favorites</h1>
          <p className="favorites-page__subtitle">
            Your personal collection of favorite cosmic moments from NASA
          </p>
        </header>

        <div className="favorites-page__empty">
          <div className="favorites-page__empty-icon">🌌</div>
          <h2 className="favorites-page__empty-title">No favorites yet</h2>
          <p className="favorites-page__empty-text">
            Start exploring the cosmos and save your favorite astronomical
            discoveries! Look for the ⭐ button on any APOD image to add it to
            your collection.
          </p>
          <a href="/explore" className="favorites-page__explore-btn">
            🚀 Start Exploring
          </a>
        </div>
      </div>
    );
  }

  return (
    <div className="favorites-page">
      <header className="favorites-page__header">
        <h1 className="favorites-page__title">⭐ Your Cosmic Favorites</h1>
        <p className="favorites-page__subtitle">
          {favorites.length} cosmic moment{favorites.length !== 1 ? "s" : ""}{" "}
          saved in your personal collection
        </p>
      </header>

      <div className="favorites-page__grid">
        {favorites.map(renderFavoriteCard)}
      </div>

      <div className="favorites-page__footer">
        <p className="favorites-page__footer-text">
          Your favorites are saved locally in your browser. Export or share your
          cosmic discoveries with fellow space enthusiasts! 🌟
        </p>
      </div>

      <APODModal
        apod={selectedAPOD}
        isOpen={isModalOpen}
        onClose={handleCloseModal}
      />
    </div>
  );
}

export default FavoritesPage;
