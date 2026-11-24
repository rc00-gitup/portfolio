import "../styles/about.css";
import SectionEyebrow from "../components/common/SectionEyebrow";
import { useLanguage } from "../context/useLanguage";

function About() {
  const { t } = useLanguage();

  const milestones = t("about.milestones");
  const facets = t("about.facets");
  const engagement = t("about.engagement");
  const vision = t("about.vision");
  const meta = t("about.meta");

  return (
    <div className="about-page">

      {/* About Hero */}

      <section className="about-hero">
        <div className="about-intro">

          <SectionEyebrow>{t("about.eyebrow")}</SectionEyebrow>

          <h1>
            {t("about.titleFirst")}
            <br />
            {t("about.titleSecond")}{" "}
            <span>{t("about.titleHighlight")}</span>
          </h1>

          <p className="about-lead">
            {t("about.lead")}
            <br />
            <br />
            {t("about.leadSecond")}
          </p>

          <div className="about-meta">
            {meta.map((item, index) => (
              <span key={item}>
                {index > 0 && <i />}
                {item}
              </span>
            ))}
          </div>

        </div>

        <div className="about-photo">
          <img
            src="/images/profile.jpeg"
            alt="Portrait"
            onLoad={(e) => {
              e.currentTarget.nextElementSibling.style.display = "none";
            }}
            onError={(e) => {
              e.currentTarget.style.display = "none";
            }}
          />

          <div className="photo-placeholder">
            <span>{t("about.photoPlaceholder")}</span>
            <small>{t("about.photoDescription")}</small>
          </div>

          <span className="photo-caption">
            ENSIAS · Rabat, Morocco
          </span>
        </div>
      </section>

      {/* Journey */}

      <section className="about-section">
        <div className="section-heading">
          <div>
            <SectionEyebrow>{t("about.journeyEyebrow")}</SectionEyebrow>
            <h2>{t("about.journeyTitle")}</h2>
          </div>

          <span className="section-note">
            {t("about.journeyNote")}
          </span>
        </div>

        <div className="journey-grid">
          {milestones.map((item, index) => (
            <article className="journey-item" key={item.period}>
              <div className="journey-marker">
                <span>{String(index + 1).padStart(2, "0")}</span>
              </div>

              <span className="journey-period">{item.period}</span>

              <h3>{item.title}</h3>

              <p>{item.description}</p>
            </article>
          ))}
        </div>
      </section>

      {/* Personal interests */}

      <section className="about-section">
        <div className="section-heading">
          <div>
            <SectionEyebrow>{t("about.universesEyebrow")}</SectionEyebrow>
            <h2>{t("about.universesTitle")}</h2>
          </div>

          <span className="section-note">
            {t("about.universesNote")}
          </span>
        </div>

        <div className="facets-grid">
          {facets.map((facet, index) => (
            <article
              className={`facet-card facet-card-${index + 1}`}
              key={facet.number}
            >
              <div className="facet-top">
                <span className="facet-number">{facet.number}</span>
                <span className="facet-label">{facet.label}</span>
              </div>

              <div className={`facet-visual facet-visual-${index + 1}`}>

                {index === 0 && (
                  <div className="circuit">
                    <span className="trace t1"></span>
                    <span className="trace t2"></span>
                    <span className="trace t3"></span>
                    <span className="core"></span>
                    <i className="node n1"></i>
                    <i className="node n2"></i>
                    <i className="node n3"></i>
                  </div>
                )}

                {index === 1 && (
                  <>
                    <span className="quote-mark">“</span>
                    <div className="sound-wave">
                      {Array.from({ length: 9 }).map((_, i) => (
                        <i key={i}></i>
                      ))}
                    </div>
                  </>
                )}

                {index === 2 && (
                  <div className="orbit">
                    <span className="orbit-core"></span>
                    <i className="spark s1"></i>
                    <i className="spark s2"></i>
                    <i className="spark s3"></i>
                  </div>
                )}

              </div>

              <h3>{facet.title}</h3>
              <p>{facet.description}</p>

              <div className="facet-bottom">
                <span>{facet.footer}</span>
                <span className="facet-arrow">↗</span>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* Engagement */}

      <section className="about-section engagement-section">

        <div className="engagement-heading">
          <SectionEyebrow>{t("about.engagementEyebrow")}</SectionEyebrow>

          <h2>
            {t("about.engagementTitleFirst")}
            <br />
            {t("about.engagementTitleSecond")}
          </h2>

          <p>{t("about.engagementIntro")}</p>
        </div>

        <div className="engagement-entries">

          {/* ASEGUIM */}

          <article className="engagement-card">
            <div className="engagement-card-top">
              <span>2024 — 2026</span>
              <span>{engagement.aseguim.category}</span>
            </div>

            <h3>ASEGUIM</h3>

            <p className="engagement-fullname">
              {engagement.aseguim.fullname}
            </p>

            <span className="engagement-role">
              {engagement.aseguim.role}
            </span>

            <p className="engagement-description">
              {engagement.aseguim.description}
            </p>

            <div className="engagement-bottom">
              <div className="engagement-tags">
                {engagement.aseguim.tags.map((tag) => (
                  <span key={tag}>{tag}</span>
                ))}
              </div>

              <span className="engagement-arrow">↗</span>
            </div>
          </article>

          {/* NEURODYNAMICS */}

          <article className="engagement-card neuro-card">
            <div className="engagement-card-top">
              <span>ENSIAS</span>
              <span>{engagement.neurodynamics.category}</span>
            </div>

            <h3>Neurodynamics</h3>

            <p className="engagement-fullname">
              {engagement.neurodynamics.fullname}
            </p>

            <span className="engagement-role">
              {engagement.neurodynamics.role}
            </span>

            <p className="engagement-description">
              {engagement.neurodynamics.description}
            </p>

            <div className="engagement-bottom">
              <div className="engagement-tags">
                {engagement.neurodynamics.tags.map((tag) => (
                  <span key={tag}>{tag}</span>
                ))}
              </div>

              <span className="engagement-arrow">↗</span>
            </div>
          </article>

        </div>

        <p className="engagement-footer">
          {t("about.engagementFooter")}
        </p>

      </section>

      {/* Vision */}

      <section className="about-vision">
        <div>
          <span className="about-eyebrow">
            {t("about.visionTitle")}
          </span>

          <h2>
            {t("about.visionTitleFirst")}
            <br />
            {t("about.visionTitleSecond")}
            <br />
            {t("about.visionTitleThird")}
          </h2>
        </div>

        <div className="vision-text">
          <p>
            {vision[0]}
          </p>

          <p>
            {vision[1]}
          </p>

          <p>
            {vision[2]}
          </p>

          <a href="#projects" className="about-vision-link">
            {t("about.visionLink")} <span>↗</span>
          </a>
        </div>
      </section>

    </div>
  );
}

export default About;