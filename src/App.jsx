import { LanguageProvider } from "./context/LanguageProvider";

import Navbar from "./components/layout/Navbar";
import ScrollProgress from "./components/layout/ScrollProgress";
import RobotAssistant from "./components/mascot/RobotAssistant";

import Home from "./pages/Home";
import About from "./pages/About";
import Education from "./pages/Education";
import Projects from "./pages/Projects";
import Experience from "./pages/Experience";
import Skills from "./pages/Skills";
import Contact from "./pages/Contact";

function App() {
  return (
    <LanguageProvider>
      <ScrollProgress />
      <Navbar />
      <RobotAssistant />

      <main>
        <section id="home"><Home /></section>
        <section id="about"><About /></section>
        <section id="education"><Education /></section>
        <section id="projects"><Projects /></section>
        <section id="experience"><Experience /></section>
        <section id="skills"><Skills /></section>
        <section id="contact"><Contact /></section>
      </main>
    </LanguageProvider>
  );
}

export default App;
