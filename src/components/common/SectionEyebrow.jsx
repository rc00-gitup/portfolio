import "../../styles/SectionEyebrow.css";

export default function SectionEyebrow({ children }) {
  return (
    <div className="section-eyebrow">
      <span className="section-eyebrow-icon">✦</span>
      <span className="section-eyebrow-label">{children}</span>
      <span className="section-eyebrow-line"></span>
    </div>
  );
}