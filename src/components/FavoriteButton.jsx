import { useState, useEffect } from "react";
import { saveFavorite, removeFavorite, isFavorited } from "../utils/favorites";
import "./FavoriteButton.css";

function FavoriteButton({ apodData, className = "" }) {
  const [favorited, setFavorited] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (apodData && apodData.date) {
      setFavorited(isFavorited(apodData.date));
    }
  }, [apodData]);

  const handleToggleFavorite = async () => {
    if (!apodData || loading) return;

    setLoading(true);

    try {
      if (favorited) {
        const success = removeFavorite(apodData.date);
        if (success) {
          setFavorited(false);
        }
      } else {
        const success = saveFavorite(apodData);
        if (success) {
          setFavorited(true);
        }
      }
    } catch (error) {
      console.error("Error toggling favorite:", error);
    } finally {
      setLoading(false);
    }
  };

  if (!apodData) return null;

  return (
    <button
      onClick={handleToggleFavorite}
      disabled={loading}
      className={`favorite-button ${
        favorited ? "favorite-button--favorited" : ""
      } ${loading ? "favorite-button--loading" : ""} ${className}`}
      title={favorited ? "Remove from favorites" : "Add to favorites"}
    >
      <span className="favorite-button__icon">
        {loading ? "⏳" : favorited ? "⭐" : "☆"}
      </span>
      <span className="favorite-button__text">
        {loading ? "Saving..." : favorited ? "Favorited" : "Add to Favorites"}
      </span>
    </button>
  );
}

export default FavoriteButton;
