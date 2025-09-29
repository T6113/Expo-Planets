// Favorites utility functions for local storage
const FAVORITES_KEY = "apod-favorites";

// Get all favorites from local storage
export const getFavorites = () => {
  try {
    const favorites = localStorage.getItem(FAVORITES_KEY);
    return favorites ? JSON.parse(favorites) : [];
  } catch (error) {
    console.error("Error getting favorites:", error);
    return [];
  }
};

// Save a favorite APOD
export const saveFavorite = (apodData) => {
  try {
    const favorites = getFavorites();

    // Check if already favorited (by date to avoid duplicates)
    const isAlreadyFavorited = favorites.some(
      (fav) => fav.date === apodData.date
    );

    if (!isAlreadyFavorited) {
      // Add favorite with timestamp
      const favoriteItem = {
        ...apodData,
        favoriteDate: new Date().toISOString(),
        id: `favorite-${apodData.date}-${Date.now()}`,
      };

      favorites.unshift(favoriteItem); // Add to beginning of array
      localStorage.setItem(FAVORITES_KEY, JSON.stringify(favorites));
      return true;
    }

    return false; // Already favorited
  } catch (error) {
    console.error("Error saving favorite:", error);
    return false;
  }
};

// Remove a favorite
export const removeFavorite = (apodDate) => {
  try {
    const favorites = getFavorites();
    const updatedFavorites = favorites.filter((fav) => fav.date !== apodDate);
    localStorage.setItem(FAVORITES_KEY, JSON.stringify(updatedFavorites));
    return true;
  } catch (error) {
    console.error("Error removing favorite:", error);
    return false;
  }
};

// Check if an APOD is favorited
export const isFavorited = (apodDate) => {
  try {
    const favorites = getFavorites();
    return favorites.some((fav) => fav.date === apodDate);
  } catch (error) {
    console.error("Error checking favorite status:", error);
    return false;
  }
};

// Get favorites count
export const getFavoritesCount = () => {
  try {
    return getFavorites().length;
  } catch (error) {
    console.error("Error getting favorites count:", error);
    return 0;
  }
};

// Clear all favorites (utility function)
export const clearAllFavorites = () => {
  try {
    localStorage.removeItem(FAVORITES_KEY);
    return true;
  } catch (error) {
    console.error("Error clearing favorites:", error);
    return false;
  }
};
