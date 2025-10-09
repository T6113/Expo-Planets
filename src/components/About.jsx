import "./About.css";

function About() {
  return (
    <main className="about">
      <h2 className="about__title">About 🚀 ExpoPlanets</h2>
      <section className="about__content">
        <p className="about__description">
          Welcome to ExpoPlanets — your daily window into the cosmos. This site
          connects to NASA’s Astronomy Picture of the Day (APOD), bringing you
          stunning images and videos from across the universe along with expert
          explanations. My goal is to make space exploration accessible, inspire
          curiosity about the planets, stars, and galaxies around us.Check back
          every day for a new cosmic highlight, and let ExpoPlanets guide your
          journey through the stars.
        </p>

        <ul className="about__features">
          <li className="about__feature">
            🌌 Daily space photography from NASA
          </li>
          <li className="about__feature">📅 Browse photos by specific dates</li>
          <li className="about__feature">
            🎂 Discover space photos from your birthday
          </li>
          <li className="about__feature">
            ♒ Future: Zodiac-based photo exploration
          </li>
        </ul>

        <p className="about__description">
          Powered by{" "}
          <a
            href="https://api.nasa.gov/"
            target="_blank"
            rel="noopener noreferrer"
            className="about__link"
          >
            NASA's Open Data API
          </a>
          , bringing the universe closer to you, one photo at a time.
        </p>
      </section>
    </main>
  );
}

export default About;
