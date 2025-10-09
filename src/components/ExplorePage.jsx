import { useState, useRef } from "react";
import DailySpacePhoto from "./DailySpacePhoto";
import DateSearch from "./DateSearch";
import FavoriteButton from "./FavoriteButton";
import { getAPODByZodiac } from "../utils/nasa-api";
import "./ExplorePage.css";

function ExplorePage() {
  const [searchedAPOD, setSearchedAPOD] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [showToday, setShowToday] = useState(true);
  const [currentZodiac, setCurrentZodiac] = useState(null);
  const apodDisplayRef = useRef(null);

  const handleAPODFound = (apodData) => {
    setSearchedAPOD(apodData);
    setShowToday(false);

    // Store current zodiac for refresh functionality
    if (apodData && apodData.zodiacSign) {
      setCurrentZodiac(apodData.zodiacSign.key);
    }

    // Auto-scroll to APOD display after a short delay to ensure rendering
    setTimeout(() => {
      if (apodDisplayRef.current) {
        apodDisplayRef.current.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      }
    }, 100);
  };

  const handleError = (errorMessage) => {
    setError(errorMessage);
    setSearchedAPOD(null);
  };

  const handleLoading = (isLoading) => {
    setLoading(isLoading);
  };

  const showTodaysAPOD = () => {
    setShowToday(true);
    setSearchedAPOD(null);
    setError(null);
    setCurrentZodiac(null);
  };

  const handleDiscoverAnother = async () => {
    if (!currentZodiac) return;

    try {
      setLoading(true);
      setError(null);

      const newApodData = await getAPODByZodiac(currentZodiac);
      setSearchedAPOD(newApodData);

      // Auto-scroll to the new APOD
      setTimeout(() => {
        if (apodDisplayRef.current) {
          apodDisplayRef.current.scrollIntoView({
            behavior: "smooth",
            block: "start",
          });
        }
      }, 100);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const renderAPODContent = (apodData) => {
    if (!apodData) return null;

    const isZodiacSearch = apodData.zodiacSign && apodData.cosmicMessage;

    return (
      <article
        ref={apodDisplayRef}
        className={`explore-page__apod-display ${
          isZodiacSearch ? "explore-page__apod-display--zodiac" : ""
        }`}
      >
        {isZodiacSearch && (
          <div className="explore-page__zodiac-header">
            <div className="explore-page__zodiac-info">
              <span className="explore-page__zodiac-symbol">
                {apodData.zodiacSign.symbol}
              </span>
              <span className="explore-page__zodiac-name">
                {apodData.zodiacSign.name}
              </span>
            </div>
            <p className="explore-page__cosmic-message">
              {apodData.cosmicMessage}
            </p>
          </div>
        )}

        <h2 className="explore-page__apod-title">{apodData.title}</h2>
        <time className="explore-page__apod-date">{apodData.date}</time>

        {apodData.media_type === "image" ? (
          <img
            src={apodData.url}
            alt={apodData.title}
            className="explore-page__apod-media"
          />
        ) : (
          <iframe
            src={apodData.url}
            title={apodData.title}
            className="explore-page__apod-video"
          />
        )}

        <p className="explore-page__apod-explanation">{apodData.explanation}</p>

        <div className="explore-page__actions">
          <FavoriteButton apodData={apodData} />
          {isZodiacSearch && (
            <button
              onClick={handleDiscoverAnother}
              className="explore-page__zodiac-button"
            >
              ✨ Discover Another {apodData.zodiacSign.name} Moment
            </button>
          )}
          <button
            onClick={showTodaysAPOD}
            className="explore-page__back-button"
          >
            🏠 Back to Today's APOD
          </button>
        </div>
      </article>
    );
  };

  return (
    <div className="explore-page">
      <DateSearch
        onAPODFound={handleAPODFound}
        onError={handleError}
        onLoading={handleLoading}
      />

      {error && <div className="explore-page__error">❌ {error}</div>}

      {loading && (
        <div className="explore-page__loading">🚀 Searching the cosmos...</div>
      )}

      {!loading && !error && (
        <>
          {showToday && <DailySpacePhoto />}
          {searchedAPOD && renderAPODContent(searchedAPOD)}
        </>
      )}
    </div>
  );
}

export default ExplorePage;
