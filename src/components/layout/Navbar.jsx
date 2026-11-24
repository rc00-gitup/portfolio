import { useEffect, useState } from "react";
import "../../styles/navbar.css";
import { useLanguage } from "../../context/useLanguage";

const links = [
  { key: "home", id: "home" },
  { key: "about", id: "about" },
  { key: "education", id: "education" },
  { key: "projects", id: "projects" },
  { key: "experience", id: "experience" },
  { key: "skills", id: "skills" },
  { key: "contact", id: "contact" },
];

function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("home");

  const { language, changeLanguage, t } = useLanguage();

  useEffect(() => {
    const handleScroll = () => {
      const sections = links
        .map(({ id }) => document.getElementById(id))
        .filter(Boolean);

      const scrollPosition = window.scrollY + 150;

      let currentSection = "home";

      sections.forEach((section) => {
        if (section.offsetTop <= scrollPosition) {
          currentSection = section.id;
        }
      });

      if (
        window.innerHeight + window.scrollY >=
        document.documentElement.scrollHeight - 10
      ) {
        currentSection = sections[sections.length - 1]?.id || currentSection;
      }

      setActiveSection(currentSection);
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleNavigation = (id) => {
    setActiveSection(id);
    setMenuOpen(false);
  };

  return (
    <header className="navbar">
      <a
        href="#home"
        className="navbar-logo"
        onClick={() => handleNavigation("home")}
        aria-label="RC — Home"
      >
        RC<span>.</span>
      </a>

      <button
        className={`menu-toggle ${menuOpen ? "is-open" : ""}`}
        onClick={() => setMenuOpen((open) => !open)}
        aria-label={menuOpen ? t("navbar.closeMenu") : t("navbar.openMenu")}
        aria-expanded={menuOpen}
        aria-controls="primary-navigation"
        type="button"
      >
        <span />
        <span />
        <span />
      </button>

      <nav
        id="primary-navigation"
        className={`navbar-content ${menuOpen ? "open" : ""}`}
        aria-label={t("navbar.navigation")}
      >
        <div className="navbar-links">
          {links.map((link) => (
            <a
              key={link.id}
              href={`#${link.id}`}
              className={`nav-link ${
                activeSection === link.id ? "active" : ""
              }`}
              aria-current={
                activeSection === link.id ? "page" : undefined
              }
              onClick={() => handleNavigation(link.id)}
            >
              {t(`navbar.${link.key}`)}
            </a>
          ))}
        </div>

        <div className="navbar-actions">
          <div className="language-switch" aria-label="Language selection">
            <button
              className={language === "en" ? "selected" : ""}
              type="button"
              aria-pressed={language === "en"}
              onClick={() => changeLanguage("en")}
            >
              EN
            </button>

            <span aria-hidden="true">/</span>

            <button
              className={language === "fr" ? "selected" : ""}
              type="button"
              aria-pressed={language === "fr"}
              onClick={() => changeLanguage("fr")}
            >
              FR
            </button>
          </div>

          <a href="/cv.pdf" className="cv-button" download>
            {t("navbar.downloadCV")} <span aria-hidden="true">↗</span>
          </a>
        </div>
      </nav>
    </header>
  );
}

export default Navbar;