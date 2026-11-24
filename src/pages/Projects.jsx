import { useState } from "react";
import "../styles/projects.css";
import SectionEyebrow from "../components/common/SectionEyebrow";
import { useLanguage } from "../context/useLanguage";

const projects = [
  {
    id: "stadiumguard",
    name: "StadiumGuard",
    image: "/images/stadiumguard.png",
    technologies: [
      "Python", "YOLOv8", "OpenCV", "Flask", "Pose Estimation", "Chart.js",
    ],
    github: "https://github.com/Wydadiya/stadiumguard-",
    deep: "#244638",
    accent: "#d47a45",
    background: "#edf0e9",
  },
  {
    id: "oeil",
    name: "Œil des Parents",
    image: "/images/oeildesparents.png",
    technologies: [
      "Raspberry Pi", "Python", "Flask", "React", "OpenCV", "Librosa",
    ],
    github: "https://github.com/rc00-gitup/projet-oeilDesParents",
    deep: "#203b52",
    accent: "#35a9a6",
    background: "#eaf0ef",
  },
  {
    id: "aeroscan",
    name: "AeroScan",
    image: "/images/aeromapper.png",
    technologies: [
      "Drone", "Python", "Route Planning", "Telemetry", "Mapping",
    ],
    github: "https://github.com/rc00-gitup/AeroScan",
    deep: "#244e61",
    accent: "#39a78a",
    background: "#eaf0ed",
  },
  {
    id: "connerbnb",
    name: "ConneRbnb",
    image: "/images/connrbnb.png",
    technologies: [
      "PHP", "MVC", "REST API", "MySQL", "JavaScript",
    ],
    github: "https://github.com/rc00-gitup/app-gestion-logement",
    deep: "#0b2145",
    accent: "#2ec2c6",
    background: "#edf0f5",
  },
];

function Projects() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const { t } = useLanguage();

  const project = projects[currentIndex];
  const translated = t(`projects.items.${project.id}`);

  const changeProject = (index) => {
    setCurrentIndex((index + projects.length) % projects.length);
  };

  return (
    <section className="projects-section">
      <div className="projects-container">

        <header className="projects-header">
          <div>
            <SectionEyebrow>{t("projects.eyebrow")}</SectionEyebrow>

            <h2 className="projects-heading">
              {t("projects.title")}<span>.</span>
            </h2>

            <p className="projects-intro">
              {t("projects.description")}
            </p>
          </div>

          <div className="projects-header-index">
            <span>{t("projects.portfolio")}</span>
            <strong>04</strong>
            <span>{t("projects.selectedProjects")}</span>
          </div>
        </header>

        <div
          className="projects-content"
          style={{
            "--project-deep": project.deep,
            "--project-accent": project.accent,
            "--project-background": project.background,
          }}
        >

          <div className="projects-visual">
            <img
              key={project.image}
              src={project.image}
              alt={project.name}
              className="projects-image"
            />

            <div className="projects-scan-line" />

            <div className="projects-image-caption">
              <span>
                {t("projects.projectLabel")} / {String(currentIndex + 1).padStart(2, "0")}
              </span>
              <span>{translated.caption}</span>
            </div>
          </div>

          <div className="projects-details">

            <div className="projects-number">
              <span>{String(currentIndex + 1).padStart(2, "0")}</span>
              <i />
              {translated.category}
            </div>

            <h3 className="projects-name">
              {project.name}
              <span>.</span>
            </h3>

            <p className="projects-description">
              {translated.description}
            </p>

            <div className="projects-tech-title">
              {t("projects.technologiesTitle")}
            </div>

            <div className="projects-technologies">
              {project.technologies.map((technology) => (
                <span className="projects-chip" key={technology}>
                  {technology}
                </span>
              ))}
            </div>

            <div className="projects-actions">
              <a
                href={project.github}
                target="_blank"
                rel="noopener noreferrer"
                className="projects-button projects-button-primary"
              >
                {t("projects.exploreGithub")} ↗
              </a>

              <button
                className="projects-next"
                onClick={() => changeProject(currentIndex + 1)}
                type="button"
              >
                {t("projects.nextProject")} <span>→</span>
              </button>
            </div>
          </div>
        </div>

        <nav
          className="projects-tabs"
          aria-label={t("projects.navigation")}
          style={{ "--project-deep": project.deep }}
        >
          {projects.map((item, index) => (
            <button
              key={item.name}
              type="button"
              className={`projects-tab ${
                currentIndex === index ? "active" : ""
              }`}
              onClick={() => changeProject(index)}
              aria-pressed={currentIndex === index}
            >
              <span className="projects-tab-number">
                0{index + 1}
              </span>

              <strong>{item.name}</strong>

              <span className="projects-tab-arrow">↗</span>
            </button>
          ))}
        </nav>

        <footer className="projects-footer">
          <span>{t("projects.footer")}</span>

          <span>
            {String(currentIndex + 1).padStart(2, "0")} / 04
          </span>
        </footer>

      </div>
    </section>
  );
}

export default Projects;