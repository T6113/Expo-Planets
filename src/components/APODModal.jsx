import { useEffect } from "react";
import FavoriteButton from "./FavoriteButton";
import "./APODModal.css";

function APODModal({ apod, isOpen, onClose }) {
  // Handle ESC key to close modal
  useEffect(() => {
    const handleEscape = (event) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener("keydown", handleEscape);
      // Prevent body scroll when modal is open
      document.body.style.overflow = "hidden";
    }

    return () => {
      document.removeEventListener("keydown", handleEscape);
      document.body.style.overflow = "unset";
    };
  }, [isOpen, onClose]);

  // Handle click outside modal to close
  const handleBackdropClick = (event) => {
    if (event.target === event.currentTarget) {
      onClose();
    }
  };

  if (!isOpen || !apod) return null;

  const isZodiacAPOD = apod.zodiacSign && apod.cosmicMessage;

  return (
    <div className="apod-modal" onClick={handleBackdropClick}>
      <div className="apod-modal__content">
        <button
          className="apod-modal__close"
          onClick={onClose}
          aria-label="Close modal"
        >
          ✕
        </button>

        {isZodiacAPOD && (
          <div className="apod-modal__zodiac-header">
            <div className="apod-modal__zodiac-badge">
              <span className="apod-modal__zodiac-symbol">
                {apod.zodiacSign.symbol}
              </span>
              <span className="apod-modal__zodiac-name">
                {apod.zodiacSign.name}
              </span>
            </div>
            <p className="apod-modal__cosmic-message">{apod.cosmicMessage}</p>
          </div>
        )}

        <div className="apod-modal__header">
          <h2 className="apod-modal__title">{apod.title}</h2>
          <time className="apod-modal__date">{apod.date}</time>
        </div>

        <div className="apod-modal__media-container">
          {apod.media_type === "image" ? (
            <img
              src={apod.url}
              alt={apod.title}
              className="apod-modal__image"
            />
          ) : (
            <iframe
              src={apod.url}
              title={apod.title}
              className="apod-modal__video"
              allowFullScreen
            />
          )}
        </div>

        <div className="apod-modal__content-wrapper">
          <p className="apod-modal__explanation">{apod.explanation}</p>

          <div className="apod-modal__actions">
            <FavoriteButton
              apodData={apod}
              className="apod-modal__favorite-btn"
            />

            {apod.hdurl && apod.media_type === "image" && (
              <a
                href={apod.hdurl}
                target="_blank"
                rel="noopener noreferrer"
                className="apod-modal__hd-link"
              >
                🖼️ View HD Image
              </a>
            )}
          </div>

          {apod.favoriteDate && (
            <div className="apod-modal__meta">
              <span className="apod-modal__favorite-date">
                ⭐ Favorited on{" "}
                {new Date(apod.favoriteDate).toLocaleDateString()}
              </span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default APODModal;
