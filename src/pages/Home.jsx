import { useEffect, useState } from "react";
import { useLanguage } from "../context/useLanguage";
import "../styles/home.css";

function Home() {
  const { language, t } = useLanguage();

  const lines = [
    t("home.firstLine"),
    t("home.secondLine"),
    t("home.thirdLine"),
  ];

  return <HomeContent key={language} language={language} t={t} lines={lines} />;
}

function HomeContent({ language, t, lines }) {
  const [displayedLines, setDisplayedLines] = useState(["", "", ""]);
  const [activeLine, setActiveLine] = useState(0);

  useEffect(() => {
    let lineIndex = 0;
    let characterIndex = 0;

    let timerId;

    const typeNextCharacter = () => {
      if (lineIndex >= lines.length) return;

      const currentLine = lines[lineIndex];

      if (characterIndex < currentLine.length) {
        setDisplayedLines((previous) => {
          const updated = [...previous];
          updated[lineIndex] = currentLine.slice(0, characterIndex + 1);
          return updated;
        });

        characterIndex++;

        timerId = setTimeout(typeNextCharacter, 65);
        return;
      }

      lineIndex++;
      characterIndex = 0;

      if (lineIndex < lines.length) {
        setActiveLine(lineIndex);
        timerId = setTimeout(typeNextCharacter, 350);
        return;
      }

      setActiveLine(-1);
    };

    timerId = setTimeout(typeNextCharacter, 500);

    return () => clearTimeout(timerId);
  }, [lines]);

  return (
    <section className="hero">
      <div className="hero-background">
        <div className="hero-orb hero-orb-one"></div>
        <div className="hero-orb hero-orb-two"></div>
        <div className="hero-grid"></div>
      </div>

      <div className="hero-content">
        <div className="hero-eyebrow">
          <span className="hero-eyebrow-line"></span>
          <span>
            {language === "fr"
              ? "ÉTUDIANT INGÉNIEUR"
              : "ENGINEERING STUDENT"}
          </span>
          <span className="hero-eyebrow-separator">✦</span>
          <span>
            {language === "fr"
              ? "SYSTÈMES INTELLIGENTS"
              : "INTELLIGENT SYSTEMS"}
          </span>
        </div>

        <h1 className="hero-title" aria-label={lines.join(" ")}>
          <span className="hero-title-line">
  {displayedLines[0].startsWith("Welcome to my portfolio") ? (
    <>
      Welcome to my{" "}
      <span className="portfolio-highlight">portfolio</span>.
    </>
  ) : displayedLines[0]}
  {activeLine === 0 && <span className="typing-cursor"></span>}
</span>

          <span className="hero-title-line hero-title-accent">
            {displayedLines[1]}
            {activeLine === 1 && <span className="typing-cursor"></span>}
          </span>

          <span className="hero-title-line">
            {displayedLines[2]}
            {activeLine === 2 && <span className="typing-cursor"></span>}
          </span>
        </h1>

        <p className="hero-description">{t("home.description")}</p>

        <div className="hero-availability">
  <span className="availability-dot"></span>

  <span className="availability-label">
    {language === "fr"
      ? "RECHERCHE DE STAGE"
      : "INTERNSHIP OPPORTUNITY"}
  </span>

  <span className="availability-divider"></span>

  <span className="availability-text">
    {language === "fr"
      ? "Disponible dès"
      : "Available from"}
  </span>

  <span className="availability-date">
    {language === "fr" ? "Février 2027" : "February 2027"}
  </span>
</div>

        <div className="hero-buttons">
          <a href="#projects" className="hero-button hero-button-primary">
            {t("home.exploreWork")}
            <span className="button-arrow">↗</span>
          </a>

          <a href="#contact" className="hero-button hero-button-secondary">
            {t("home.getInTouch")}
          </a>
        </div>

        <div className="hero-fields">
          <span>{t("home.fieldAI")}</span>
          <span className="field-separator">✦</span>
          <span>{t("home.fieldIoT")}</span>
          <span className="field-separator">✦</span>
          <span>{t("home.fieldRobotics")}</span>
        </div>
      </div>
    </section>
  );
}

export default Home;