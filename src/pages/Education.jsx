import SectionEyebrow from "../components/common/SectionEyebrow";
import { useEffect, useRef, useState } from "react";
import {
  ComposableMap,
  Geographies,
  Geography,
  Marker,
} from "react-simple-maps";
import { useLanguage } from "../context/useLanguage";

import world from "world-atlas/countries-110m.json";
import "../styles/education.css";

const AFRICA = new Set([
  "Algeria", "Angola", "Benin", "Botswana", "Burkina Faso",
  "Burundi", "Cameroon", "Cape Verde", "Central African Republic",
  "Chad", "Comoros", "Democratic Republic of the Congo",
  "Republic of the Congo", "Djibouti", "Egypt", "Equatorial Guinea",
  "Eritrea", "Eswatini", "Ethiopia", "Gabon", "Gambia", "Ghana",
  "Guinea", "Guinea-Bissau", "Ivory Coast", "Kenya", "Lesotho",
  "Liberia", "Libya", "Madagascar", "Malawi", "Mali", "Mauritania",
  "Mauritius", "Morocco", "Mozambique", "Namibia", "Niger", "Nigeria",
  "Rwanda", "Senegal", "Sierra Leone", "Somalia", "South Africa",
  "South Sudan", "Sudan", "Tanzania", "Togo", "Tunisia", "Uganda",
  "Zambia", "Zimbabwe", "Western Sahara"
]);

const stages = [
  {
    id: "rabat",
    n: "03",
    city: "Rabat",
    country: "Morocco",
    year: "2025 — Present",
    school: "ENSIAS",
    full: "École Nationale Supérieure d’Informatique et d’Analyse des Systèmes",
    degree: "Engineering Cycle",
    field: "Smart Systems Engineering (SSE)",
    logo: "/images/ensias.png",
    status: "Current studies",
    coordinates: [-6.8416, 34.0209],
  },
  {
    id: "meknes",
    n: "02",
    city: "Meknès",
    country: "Morocco",
    year: "2022 — 2025",
    school: "Faculté des Sciences Moulay Ismaïl",
    full: "Université Moulay Ismaïl",
    degree: "Licence",
    field: "Sciences Mathématiques et Informatique",
    logo: "/images/faculte-sciences.jpg",
    coordinates: [-5.5473, 33.8935],
  },
  {
    id: "nzerekore",
    n: "01",
    city: "N’Zérékoré",
    country: "Guinea",
    year: "2021",
    school: "École Saint Jean",
    full: "Groupe Scolaire Saint Jean",
    degree: "Baccalauréat",
    field: "Lauréat du baccalauréat guinéen",
    logo: "/images/saint-jean.jpeg",
    coordinates: [-8.817, 7.756],
  },
];

export default function Education() {
  const { t, language } = useLanguage();
  const section = useRef(null);

  const [visible, setVisible] = useState(
    () => typeof window !== "undefined" && !("IntersectionObserver" in window)
  );
  const [active, setActive] = useState("rabat");

  const countryName = (country) =>
    country === "Morocco"
      ? language === "fr" ? "Maroc" : "Morocco"
      : language === "fr" ? "Guinée" : "Guinea";

  const translatedStages = stages.map((stage) => ({
    ...stage,
    degree: t(`education.stages.${stage.id}.degree`),
    field: t(`education.stages.${stage.id}.field`),
    status: stage.id === "rabat"
      ? t("education.stages.rabat.status")
      : undefined,
  }));

  const translatedSelected =
    translatedStages.find((s) => s.id === active) || translatedStages[0];

  useEffect(() => {
    if (!section.current) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.12 }
    );

    observer.observe(section.current);

    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={section}
      id="education-content"
      className={`education-section ${visible ? "is-visible" : ""}`}
      aria-labelledby="education-title"
    >
      <div className="education-inner">

        <header className="education-heading">
          <SectionEyebrow>{t("education.eyebrow")}</SectionEyebrow>

          <h2 id="education-title">
            {t("education.title")}
            <em>{t("education.titleHighlight")}</em>
          </h2>

          <p>{t("education.description")}</p>
        </header>

        <div className="education-grid">

          <div className="education-map-column">

            <div className="education-map-frame">

              <div className="map-caption">
                <span className="caption-dot" />
                {t("education.mapCaption")}
              </div>

              <ComposableMap
                className="education-map"
                projection="geoMercator"
                projectionConfig={{
                  scale: 470,
                  center: [-1, 20],
                }}
                width={800}
                height={510}
              >
                <Geographies geography={world}>
                  {({ geographies }) =>
                    geographies
                      .filter((geo) =>
                        AFRICA.has(geo.properties.name)
                      )
                      .map((geo) => {
                        const name = geo.properties.name;
                        const isGuinea = name === "Guinea";
                        const isMorocco = name === "Morocco";

                        return (
                          <Geography
                            key={geo.rsmKey}
                            geography={geo}
                            fill={
                              isGuinea
                                ? "#b17b55"
                                : isMorocco
                                ? "#557d68"
                                : "#e5e9df"
                            }
                            stroke="#fbfaf6"
                            strokeWidth={0.85}
                            className={
                              isGuinea || isMorocco
                                ? "highlighted-country"
                                : "africa-country"
                            }
                            style={{
                              default: { outline: "none" },
                              hover: {
                                outline: "none",
                                fill: isGuinea
                                  ? "#c48c65"
                                  : isMorocco
                                  ? "#6b9078"
                                  : "#dce3da",
                              },
                              pressed: { outline: "none" },
                            }}
                          />
                        );
                      })
                  }
                </Geographies>

                <Marker coordinates={stages[2].coordinates}>
                  <path
                    className={`journey-curve ${visible ? "draw" : ""}`}
                    d="
                      M 0 0
                      C 42 -65, 48 -170, 32 -268
                      C 29 -276, 23 -280, 20 -270
                    "
                    fill="none"
                    stroke="#b17b55"
                    strokeWidth="4"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeDasharray="8 9"
                  />
                </Marker>

                <Marker coordinates={stages[2].coordinates}>
                  <circle className="journey-point origin-point" r="6" />
                </Marker>

                <Marker coordinates={stages[1].coordinates}>
                  <circle className="journey-point middle-point" r="6" />
                </Marker>

                <Marker coordinates={stages[0].coordinates}>
                  <g className="current-location">
                    <circle className="location-pulse" r="22" />
                    <circle className="location-ring" r="11" />
                    <circle className="location-dot" r="5" />
                    <path
                      className="location-pin-shape"
                      d="M0 8 C-4 2 -10 -4 -10 -10 A10 10 0 1 1 10 -10 C10 -4 4 2 0 8Z"
                      transform="translate(0 -20)"
                    />
                    <circle cx="0" cy="-30" r="3" fill="#fff" />
                  </g>
                </Marker>
              </ComposableMap>

              <div className="map-label label-guinea">
                <b>N’ZÉRÉKORÉ</b>
                <small>GUINEA · {t("education.origin")}</small>
              </div>

              <div className="map-label label-meknes">
                <b>MEKNÈS</b>
                <small>{t("education.academicMilestone")}</small>
              </div>

              <div className="map-label label-morocco">
                <b>RABAT</b>
                <small>MOROCCO · {t("education.currentLocation")}</small>
              </div>

              <div className="map-orbit orbit-a" />
              <div className="map-orbit orbit-b" />

            </div>

            <div className="education-stats">
              <div>
                <b>03</b>
                <span>{t("education.stats.stages")}</span>
              </div>

              <i />

              <div>
                <b>02</b>
                <span>{t("education.stats.countries")}</span>
              </div>

              <i />

              <div>
                <b>03</b>
                <span>{t("education.stats.institutions")}</span>
              </div>
            </div>

          </div>

          <div className="education-right">

            <div className="education-cards">

              {translatedStages.map((stage) => (
                <button
                  key={stage.id}
                  type="button"
                  onClick={() => setActive(stage.id)}
                  className={`education-card ${
                    active === stage.id ? "selected" : ""
                  }`}
                  aria-pressed={active === stage.id}
                >
                  <span className="card-number">{stage.n}</span>

                  <span className="card-logo">
                    <img
                      src={stage.logo}
                      alt={`${stage.school} logo`}
                    />
                  </span>

                  <span className="card-info">

                    <span className="card-top">
                      <b>{stage.year}</b>
                      {stage.status && <small>{stage.status}</small>}
                    </span>

                    <span className="card-location">
                      {stage.city}, {countryName(stage.country)}
                    </span>

                    <strong>{stage.school}</strong>

                    {stage.id === "meknes" && (
                      <span className="card-subname">
                        {stage.full}
                      </span>
                    )}

                    <span className="card-degree">{stage.degree}</span>
                    <span className="card-field">{stage.field}</span>

                  </span>

                  <span className="card-arrow">↗</span>

                </button>
              ))}

            </div>

            <div className="education-active-note" aria-live="polite">
              <small>
                {t("education.selectedLocation")} / {translatedSelected.n}
              </small>
              <b>
                {translatedSelected.city}, {countryName(translatedSelected.country)}
              </b>
              <span>{translatedSelected.school}</span>
            </div>

          </div>

        </div>

        <footer className="education-ending">
          <span className="ending-arrow">↗</span>

          <div>
            <strong>{t("education.endingTitle")}</strong>
            <p>{t("education.endingDescription")}</p>
          </div>

          <span className="ending-dots">
            <i />
            <i />
            <i />
          </span>
        </footer>

      </div>
    </section>
  );
}