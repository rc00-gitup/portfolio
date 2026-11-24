import { useEffect, useRef } from "react";
import "../styles/skills.css";
import SectionEyebrow from "../components/common/SectionEyebrow";
import { useLanguage } from "../context/useLanguage";

const groups = [
  {
    id: "development",
    number: "01",
    translationKey: "development",
    accent: "sage",
    skills: [
      ["C", "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/c/c-original.svg", "language"],
      ["C++", "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/cplusplus/cplusplus-original.svg", "language"],
      ["Python", "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg", "language"],
      ["Java", "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/java/java-original.svg", "language"],
      ["JavaScript", "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg", "language"],
      ["React.js", "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg", "frontend"],
      ["HTML5", "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg", "web"],
      ["CSS3", "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg", "web"],
      ["Symfony", "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/symfony/symfony-original.svg", "backend"],
      ["REST API", null, "integration"],
    ],
  },
  {
    id: "ai-data",
    number: "02",
    translationKey: "aiData",
    accent: "sand",
    skills: [
      ["Scikit-learn", "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/scikitlearn/scikitlearn-original.svg", "machineLearning"],
      ["NumPy", "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/numpy/numpy-original.svg", "computing"],
      ["OpenCV", "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/opencv/opencv-original.svg", "computerVision"],
      ["Librosa", null, "audioAnalysis"],
      ["SQL", null, "queryLanguage"],
      ["MySQL", "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mysql/mysql-original.svg", "database"],
      ["PostgreSQL", "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original.svg", "database"],
      ["Oracle", "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/oracle/oracle-original.svg", "database"],
    ],
  },
  {
    id: "embedded-iot",
    number: "03",
    translationKey: "embedded",
    accent: "blue",
    skills: [
      ["Arduino", "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/arduino/arduino-original.svg", "microcontroller"],
      ["STM32", null, "arm"],
      ["ATmega", null, "avr"],
      ["ESP32", null, "iot"],
      ["Raspberry Pi", "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/raspberrypi/raspberrypi-original.svg", "singleBoard"],
    ],
  },
  {
    id: "tools",
    number: "04",
    translationKey: "tools",
    accent: "lavender",
    skills: [
      ["Git", "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg", "versionControl"],
      ["GitHub", "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/github/github-original.svg", "codeHosting"],
      ["Docker", "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg", "containers"],
      ["VS Code", "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vscode/vscode-original.svg", "editor"],
    ],
  },
];

function SkillLogo({ name, url }) {
  const initials =
    name === "REST API" ? "API" :
    name === "Librosa" ? "L" :
    name === "ESP32" ? "ESP" :
    name;

  return (
    <span className="skill-logo" aria-hidden="true">
      {url && (
        <img
          src={url}
          alt=""
          loading="lazy"
          onError={(e) => {
            e.currentTarget.style.display = "none";
            e.currentTarget.nextElementSibling?.classList.add("is-visible");
          }}
        />
      )}
      <span className={`skill-logo-fallback ${url ? "" : "is-visible"}`}>
        {initials}
      </span>
    </span>
  );
}

export default function Skills() {
  const sectionRef = useRef(null);
  const { t } = useLanguage();

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    if (
      window.matchMedia("(prefers-reduced-motion: reduce)").matches ||
      !("IntersectionObserver" in window)
    ) {
      section.classList.add("is-visible");
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          section.classList.add("is-visible");
          observer.disconnect();
        }
      },
      { threshold: 0.12 }
    );

    observer.observe(section);

    return () => observer.disconnect();
  }, []);

  return (
    <section className="skills-section" ref={sectionRef}>
      <div className="skills-container">

        <header className="skills-header">
          <div>
            <SectionEyebrow>{t("skills.eyebrow")}</SectionEyebrow>

            <h2 className="skills-title">
              {t("skills.title")}
            </h2>

            <p className="skills-intro">
              {t("skills.description")}
            </p>
          </div>

          <div className="skills-header-note">
            <span>{t("skills.engineering")}</span>
            <span>{t("skills.fields")}</span>
          </div>
        </header>

        <div className="skills-groups">
          {groups.map((group) => (
            <article
              className={`skills-group skills-group--${group.accent}`}
              key={group.id}
            >
              <div className="skills-group-heading">
                <span className="skills-group-marker" />

                <div>
                  <h3>
                    {t(`skills.groups.${group.translationKey}.title`)}
                  </h3>
                  <p>
                    {t(`skills.groups.${group.translationKey}.description`)}
                  </p>
                </div>

                <span className="skills-group-number">
                  {group.number}
                </span>
              </div>

              <div className="skills-grid">
                {group.skills.map(([name, url, kind], index) => (
                  <div
                    className="skill-item"
                    key={name}
                    style={{ "--item-index": index % 3 }}
                    title={name}
                  >
                    <SkillLogo name={name} url={url} />

                    <span className="skill-copy">
                      <span className="skill-name">{name}</span>
                      <span className="skill-kind">
                        {t(`skills.kinds.${kind}`)}
                      </span>
                    </span>
                  </div>
                ))}
              </div>
            </article>
          ))}
        </div>

        <div className="skills-footer">
          <p>{t("skills.footer")}</p>
        </div>

      </div>
    </section>
  );
}