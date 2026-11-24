import { useEffect, useState } from "react";
import { useLanguage } from "../../context/useLanguage";
import "./RobotAssistant.css";

const messages = {
  fr: {
    home: "Hey ! Bienvenue dans mon portfolio. 👋",
    about: "Laisse-moi te raconter qui je suis.",
    education: "Voici le parcours qui m'a construit.",
    projects: "Place aux idées devenues réalité !",
    experience: "Découvrons mes expériences professionnelles.",
    skills: "Voici les outils avec lesquels je construis.",
    contact: "Un projet en tête ? Discutons-en !",
  },
  en: {
    home: "Hey! Welcome to my portfolio. 👋",
    about: "Let me tell you a little about myself.",
    education: "Here's the journey that shaped me.",
    projects: "Let's explore ideas turned into reality!",
    experience: "Let's discover my professional experiences.",
    skills: "Here are the tools I use to build.",
    contact: "Have a project in mind? Let's talk!",
  },
};

function RobotAssistant() {
  const { language } = useLanguage();

  const [activeSection, setActiveSection] = useState("home");

  // Détection de la section traversée par le visiteur
  useEffect(() => {
    const sections = Array.from(
      document.querySelectorAll("main > section[id]")
    );

    let ticking = false;
    let animationFrameId = null;

    const detectSection = () => {
      const referencePoint = window.innerHeight * 0.4;

      let currentSection = sections.find((section) => {
        const rect = section.getBoundingClientRect();

        return (
          rect.top <= referencePoint &&
          rect.bottom > referencePoint
        );
      });

      if (!currentSection) {
        currentSection = sections.reduce((closest, section) => {
          const distance = Math.abs(
            section.getBoundingClientRect().top - referencePoint
          );

          const closestDistance = Math.abs(
            closest.getBoundingClientRect().top - referencePoint
          );

          return distance < closestDistance ? section : closest;
        }, sections[0]);
      }

      if (currentSection) {
        setActiveSection(currentSection.id);
      }

      ticking = false;
    };

    const handleScroll = () => {
      if (!ticking) {
        animationFrameId = window.requestAnimationFrame(detectSection);
        ticking = true;
      }
    };

    window.addEventListener("scroll", handleScroll, {
      passive: true,
    });

    window.addEventListener("resize", handleScroll);

    detectSection();

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleScroll);
      if (animationFrameId !== null) {
        window.cancelAnimationFrame(animationFrameId);
      }
    };
  }, []);


  const currentLanguage = language?.toLowerCase().startsWith("fr")
    ? "fr"
    : "en";

  const message =
    messages[currentLanguage][activeSection] ||
    messages[currentLanguage].home;

  return (
    <div className="robot-assistant">
      <div className="robot-message" key={`${currentLanguage}-${activeSection}`}>
        {message}
      </div>

      <div className="robot-avatar" aria-label="Robot assistant">
        <span className="robot-antenna"></span>
        <span className="robot-eye left"></span>
        <span className="robot-eye right"></span>
        <span className="robot-mouth"></span>
      </div>
    </div>
  );
}

export default RobotAssistant;