import { useEffect, useRef, useState } from "react";
import "../styles/experience.css";
import SectionEyebrow from "../components/common/SectionEyebrow";
import { useLanguage } from "../context/useLanguage";

const experiences = [
  {
    id: 1,
    company: "MEDUNEX SARL",
    product: "Reglo",
    technologies: [
      "NestJS",
      "n8n",
      "Bull",
      "Redis",
      "PostgreSQL",
      "Webhooks",
    ],
    contributions: [
      { id: "workflow", icon: "↗" },
      { id: "copilot", icon: "✳" },
      { id: "radar", icon: "◎" },
    ],
  },
];

function Experience() {
  const { t } = useLanguage();

  const sectionRef = useRef(null);
  const cardRef = useRef(null);
  const [visible, setVisible] = useState(
    () => typeof window !== "undefined" && !("IntersectionObserver" in window)
  );

  useEffect(() => {
    if (!("IntersectionObserver" in window)) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.15 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const handleMouseMove = (event) => {
    if (window.innerWidth <= 900 || !cardRef.current) return;

    const rect = cardRef.current.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;

    const rotateY = (x / rect.width - 0.5) * 3;
    const rotateX = (y / rect.height - 0.5) * -3;

    cardRef.current.style.setProperty(
      "--experience-rotate-x",
      `${rotateX}deg`
    );
    cardRef.current.style.setProperty(
      "--experience-rotate-y",
      `${rotateY}deg`
    );
    cardRef.current.style.setProperty(
      "--experience-mouse-x",
      `${x}px`
    );
    cardRef.current.style.setProperty(
      "--experience-mouse-y",
      `${y}px`
    );
  };

  const resetCard = () => {
    if (!cardRef.current) return;

    cardRef.current.style.setProperty("--experience-rotate-x", "0deg");
    cardRef.current.style.setProperty("--experience-rotate-y", "0deg");
  };

  return (
    <section
      className={`experience-section ${
        visible ? "experience-visible" : ""
      }`}
      ref={sectionRef}
    >
      <div className="experience-container">

        <header className="experience-heading">
          <SectionEyebrow>{t("experience.eyebrow")}</SectionEyebrow>

          <h2 className="experience-heading-title">
            {t("experience.title")}{" "}
            <span>{t("experience.titleHighlight")}</span>
          </h2>

          <p className="experience-heading-description">
            {t("experience.description")}
          </p>
        </header>

        <div className="experience-layout">

          <div className="experience-timeline">
            <div className="experience-timeline-track"></div>

            <div className="experience-timeline-point">
              <span></span>
            </div>

            <div className="experience-timeline-date">
              <strong>2026</strong>
              <span>{t("experience.summer")}</span>
            </div>
          </div>

          <div className="experience-cards">

            {experiences.map((experience, index) => (
              <article
                className="experience-card"
                key={experience.id}
                ref={cardRef}
                onMouseMove={handleMouseMove}
                onMouseLeave={resetCard}
                style={{ "--experience-card-index": index }}
              >
                <div className="experience-card-glow"></div>

                <div className="experience-card-header">

                  <div className="experience-company-identity">

                    <div className="experience-company-monogram">
                      M
                    </div>

                    <div className="experience-company-divider"></div>

                    <div className="experience-company-information">
                      <h3>{experience.company}</h3>

                      <div className="experience-product-name">
                        <span>{experience.product}</span>
                        <span className="experience-product-description">
                          {t("experience.saasPlatform")}
                        </span>
                      </div>
                    </div>

                  </div>

                  <span className="experience-internship-badge">
                    ✧ {t("experience.internship")}
                  </span>

                  <div className="experience-reglo-logo">
                    <img
                      src="/images/reglo.jpeg"
                      alt="Reglo logo"
                    />
                  </div>

                </div>

                <div className="experience-card-content">

                  <div className="experience-details">

                    <div className="experience-role-heading">

                      <span className="experience-role-icon">⌘</span>

                      <div>
                        <h4>{t("experience.role")}</h4>

                        <div className="experience-role-meta">
                          <span>◷ {t("experience.period")}</span>
                          <span>⌖ {t("experience.location")}</span>
                        </div>
                      </div>

                    </div>

                    <p className="experience-description">
                      {t("experience.descriptionCard")}
                    </p>

                  </div>

                  <div className="experience-contributions">

                    <h4>{t("experience.contributionsTitle")}</h4>

                    <div className="experience-contribution-list">

                      {experience.contributions.map((item, i) => (
                        <div
                          className="experience-contribution-item"
                          key={item.id}
                          style={{ "--experience-item-index": i }}
                        >
                          <span className="experience-contribution-icon">
                            {item.icon}
                          </span>

                          <div>
                            <strong>
                              {t(`experience.contributions.${item.id}.title`)}
                            </strong>

                            <p>
                              {t(`experience.contributions.${item.id}.text`)}
                            </p>
                          </div>
                        </div>
                      ))}

                    </div>
                  </div>

                </div>

                <div className="experience-technology-area">

                  <h4>{t("experience.technologiesTitle")}</h4>

                  <div className="experience-technology-list">

                    {experience.technologies.map((technology, i) => (
                      <span
                        className="experience-technology-badge"
                        key={technology}
                        style={{ "--experience-tech-index": i }}
                      >
                        {technology}
                      </span>
                    ))}

                  </div>

                </div>

              </article>
            ))}

          </div>
        </div>

        <div className="experience-closing">
          <span className="experience-closing-line"></span>

          <p>{t("experience.closing")}</p>

          <div className="experience-closing-dots">
            <i></i>
            <i></i>
            <i></i>
          </div>

          <span className="experience-closing-line"></span>
        </div>

      </div>
    </section>
  );
}

export default Experience;