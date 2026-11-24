import { useEffect, useState } from "react";
import "../../styles/scrollProgress.css";

function ScrollProgress() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    let animationFrame;

    const updateProgress = () => {
      cancelAnimationFrame(animationFrame);

      animationFrame = requestAnimationFrame(() => {
        const scrollTop = window.scrollY;
        const scrollHeight =
          document.documentElement.scrollHeight - window.innerHeight;

        const percentage =
          scrollHeight > 0 ? (scrollTop / scrollHeight) * 100 : 0;

        setProgress(Math.min(100, Math.max(0, percentage)));
      });
    };

    window.addEventListener("scroll", updateProgress, { passive: true });
    window.addEventListener("resize", updateProgress);

    updateProgress();

    return () => {
      window.removeEventListener("scroll", updateProgress);
      window.removeEventListener("resize", updateProgress);
      cancelAnimationFrame(animationFrame);
    };
  }, []);

  return (
    <div
      className="scroll-progress-track"
      role="progressbar"
      aria-label="Progression de lecture"
      aria-valuemin="0"
      aria-valuemax="100"
      aria-valuenow={Math.round(progress)}
    >
      <div
        className="scroll-progress-bar"
        style={{ width: `${progress}%` }}
      />
    </div>
  );
}

export default ScrollProgress;