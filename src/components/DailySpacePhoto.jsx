import { useEffect, useState } from "react";
import { getTodaysAPOD } from "../utils/nasa-api";
import FavoriteButton from "./FavoriteButton";
import "./DailySpacePhoto.css";

function DailySpacePhoto() {
  const [apod, setApod] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTodaysAPOD = async () => {
      try {
        setLoading(true);
        setError(null);
        const data = await getTodaysAPOD();
        setApod(data);
      } catch (err) {
        setError("Failed to load today's space photo. Please try again later.");
        console.error("Error fetching APOD:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchTodaysAPOD();
  }, []);

  if (loading) {
    return (
      <div className="daily-space-photo__loading">
        🚀 Loading NASA's picture of the day...
      </div>
    );
  }

  if (error) {
    return <div className="daily-space-photo__error">❌ {error}</div>;
  }

  if (!apod) {
    return <div className="daily-space-photo__error">No data available</div>;
  }

  return (
    <article className="daily-space-photo">
      <h2 className="daily-space-photo__title">{apod.title}</h2>
      <time className="daily-space-photo__date">{apod.date}</time>

      {apod.media_type === "image" ? (
        <img
          src={apod.url}
          alt={apod.title}
          className="daily-space-photo__media"
        />
      ) : (
        <iframe
          src={apod.url}
          title={apod.title}
          className="daily-space-photo__video"
        />
      )}

      <p className="daily-space-photo__explanation">{apod.explanation}</p>

      <div className="daily-space-photo__actions">
        <FavoriteButton apodData={apod} />
      </div>
    </article>
  );
}

export default DailySpacePhoto;
