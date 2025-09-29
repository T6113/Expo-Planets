import { useState } from "react";
import { getAPODByZodiac, ZODIAC_SIGNS } from "../utils/nasa-api";
import "./ZodiacSearch.css";

function ZodiacSearch({ onAPODFound, onError, onLoading }) {
  const [selectedZodiac, setSelectedZodiac] = useState(null);
  const [isChanneling, setIsChanneling] = useState(false);
  const [hasChanneled, setHasChanneled] = useState(false);

  const handleZodiacSearch = async (zodiacKey) => {
    try {
      onLoading(true);
      onError(null);
      setSelectedZodiac(zodiacKey);
      setIsChanneling(true);
      setHasChanneled(false);

      const apodData = await getAPODByZodiac(zodiacKey);
      onAPODFound(apodData);

      // Update the channeling state
      setIsChanneling(false);
      setHasChanneled(true);
    } catch (error) {
      onError(error.message);
      setIsChanneling(false);
      setHasChanneled(false);
    } finally {
      onLoading(false);
    }
  };

  const zodiacKeys = Object.keys(ZODIAC_SIGNS);

  return (
    <section className="zodiac-search">
      <h3 className="zodiac-search__title">✨ Discover Your Cosmic Sign</h3>
      <p className="zodiac-search__subtitle">
        Let the stars guide you to a cosmic discovery from your zodiac's
        celestial window
      </p>

      <div className="zodiac-search__grid">
        {zodiacKeys.map((key) => {
          const zodiac = ZODIAC_SIGNS[key];
          return (
            <button
              key={key}
              className={`zodiac-search__card ${
                selectedZodiac === key ? "zodiac-search__card--selected" : ""
              }`}
              onClick={() => handleZodiacSearch(key)}
              style={{
                "--zodiac-gradient": `linear-gradient(135deg, ${zodiac.colors[0]}, ${zodiac.colors[1]})`,
              }}
            >
              <div className="zodiac-search__card-symbol">{zodiac.symbol}</div>
              <div className="zodiac-search__card-emoji">{zodiac.emoji}</div>
              <div className="zodiac-search__card-name">{zodiac.name}</div>
              <div className="zodiac-search__card-element">
                {zodiac.element}
              </div>
            </button>
          );
        })}
      </div>

      {selectedZodiac && (
        <div className="zodiac-search__selected-info">
          <p
            className={`zodiac-search__cosmic-message ${
              isChanneling
                ? "zodiac-search__cosmic-message--channeling"
                : hasChanneled
                ? "zodiac-search__cosmic-message--channeled"
                : ""
            }`}
          >
            {isChanneling ? (
              <>
                🌌 Channeling cosmic energy for{" "}
                {ZODIAC_SIGNS[selectedZodiac].name}{" "}
                {ZODIAC_SIGNS[selectedZodiac].symbol}...
              </>
            ) : hasChanneled ? (
              <>
                ✨ Cosmic energy channeled for{" "}
                {ZODIAC_SIGNS[selectedZodiac].name}{" "}
                {ZODIAC_SIGNS[selectedZodiac].symbol}! Your celestial moment
                awaits below.
              </>
            ) : (
              <>
                🌠 Ready to channel {ZODIAC_SIGNS[selectedZodiac].name}{" "}
                {ZODIAC_SIGNS[selectedZodiac].symbol} energy...
              </>
            )}
          </p>
        </div>
      )}
    </section>
  );
}

export default ZodiacSearch;
