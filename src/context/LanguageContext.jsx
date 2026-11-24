import { useState } from "react";
import LanguageContext from "./LanguageContextValue";
import en from "../translations/en";
import fr from "../translations/fr";

const translations = { en, fr };

function getInitialLanguage() {
  try {
    const savedLanguage = localStorage.getItem("portfolio-language");
    return translations[savedLanguage] ? savedLanguage : "en";
  } catch {
    return "en";
  }
}

export function LanguageProvider({ children }) {
  const [language, setLanguage] = useState(getInitialLanguage);

  const changeLanguage = (newLanguage) => {
    if (!translations[newLanguage]) return;

    setLanguage(newLanguage);

    try {
      localStorage.setItem("portfolio-language", newLanguage);
    } catch {
      // The selected language remains active for the current session.
    }
  };

  const t = (key) =>
    key.split(".").reduce(
      (value, part) => value?.[part],
      translations[language]
    ) || key;

  return (
    <LanguageContext.Provider value={{ language, changeLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}