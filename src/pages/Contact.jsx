import { useRef, useState } from "react";
import emailjs from "@emailjs/browser";
import "../styles/contact.css";
import { useLanguage } from "../context/useLanguage";

function Icon({ name, size = 20 }) {
  const common = {
    width: size,
    height: size,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 1.7,
    strokeLinecap: "round",
    strokeLinejoin: "round",
    "aria-hidden": true,
  };

  const icons = {
    mail: (
      <>
        <rect x="3" y="5" width="18" height="14" rx="2" />
        <path d="m3 7 9 6 9-6" />
      </>
    ),
    linkedin: (
      <>
        <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-4 0v7h-4v-7a6 6 0 0 1 6-6Z" />
        <rect x="2" y="9" width="4" height="12" />
        <circle cx="4" cy="4" r="2" />
      </>
    ),
    github: (
      <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" />
    ),
    user: (
      <>
        <circle cx="12" cy="8" r="4" />
        <path d="M5 21a7 7 0 0 1 14 0" />
      </>
    ),
    send: (
      <>
        <path d="m22 2-7 20-4-9-9-4Z" />
        <path d="M22 2 11 13" />
      </>
    ),
    message: (
      <>
        <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8Z" />
      </>
    ),
    arrow: <path d="M7 17 17 7M7 7h10v10" />,
  };

  return <svg {...common}>{icons[name]}</svg>;
}

function Contact() {
  const form = useRef();
  const [status, setStatus] = useState("idle");
  const { t } = useLanguage();

  const sendEmail = async (event) => {
    event.preventDefault();
    const {
      VITE_EMAILJS_SERVICE_ID,
      VITE_EMAILJS_TEMPLATE_ID,
      VITE_EMAILJS_PUBLIC_KEY,
    } = import.meta.env;

    if (!VITE_EMAILJS_SERVICE_ID || !VITE_EMAILJS_TEMPLATE_ID || !VITE_EMAILJS_PUBLIC_KEY) {
      setStatus("error");
      console.error("EmailJS is not configured. Check the VITE_EMAILJS_* variables in .env.");
      return;
    }

    setStatus("sending");

    try {
      await emailjs.sendForm(
        VITE_EMAILJS_SERVICE_ID,
        VITE_EMAILJS_TEMPLATE_ID,
        form.current,
        {
          publicKey: VITE_EMAILJS_PUBLIC_KEY,
        }
      );

      setStatus("success");
      form.current.reset();
    } catch (error) {
      console.error("EmailJS error:", error);
      setStatus("error");
    }
  };

  return (
    <section className="contact-section">
      <div className="contact-container">

        <div className="contact-main">

          <div className="contact-information">

            <div className="contact-kicker">
              <span className="contact-kicker-icon">
                <Icon name="send" size={15} />
              </span>
              {t("contact.kicker")}
            </div>

            <h2 className="contact-heading">
              {t("contact.title")} <span>{t("contact.titleHighlight")}</span>
            </h2>

            <p className="contact-intro">
              {t("contact.intro")}
            </p>

            <div className="contact-details">

              <div className="contact-info-block">
                <span className="contact-label">
                  {t("contact.emailMe")}
                </span>

                <a
                  href="mailto:camararoger004@gmail.com"
                  className="contact-email"
                >
                  <span className="contact-link-icon">
                    <Icon name="mail" size={19} />
                  </span>

                  <span>camararoger004@gmail.com</span>

                  <Icon name="arrow" size={16} />
                </a>
              </div>

              <div className="contact-info-block">
                <span className="contact-label">
                  {t("contact.findOnline")}
                </span>

                <div className="contact-socials">

                  <a
                    href="https://www.linkedin.com/in/roger-camara-a8243a355/"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Icon name="linkedin" size={19} />
                    <span>LinkedIn</span>
                    <Icon name="arrow" size={14} />
                  </a>

                  <a
                    href="https://github.com/rc00-gitup"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Icon name="github" size={19} />
                    <span>GitHub</span>
                    <Icon name="arrow" size={14} />
                  </a>

                </div>
              </div>

            </div>

            <div className="contact-availability">
              <span className="contact-availability-dot"></span>
              <p>{t("contact.availability")}</p>
            </div>

          </div>

          <div className="contact-form-wrapper">

            <div className="contact-form-heading">
              <div className="contact-form-icon">
                <Icon name="message" size={23} />
              </div>

              <div>
                <span>{t("contact.formNumber")}</span>
                <h3>{t("contact.formTitle")}</h3>
                <p>{t("contact.formDescription")}</p>
              </div>
            </div>

            <form
              ref={form}
              onSubmit={sendEmail}
              className="contact-form"
            >

              <div className="contact-form-row">

                <div className="contact-field">
                  <label htmlFor="contact-name">
                    {t("contact.name")}
                  </label>

                  <div className="contact-input-wrapper">
                    <span className="contact-input-icon">
                      <Icon name="user" size={17} />
                    </span>

                    <input
                      type="text"
                      id="contact-name"
                      name="from_name"
                      placeholder={t("contact.namePlaceholder")}
                      minLength="2"
                      required
                    />
                  </div>
                </div>

                <div className="contact-field">
                  <label htmlFor="contact-email">
                    {t("contact.email")}
                  </label>

                  <div className="contact-input-wrapper">
                    <span className="contact-input-icon">
                      <Icon name="mail" size={17} />
                    </span>

                    <input
                      type="email"
                      id="contact-email"
                      name="from_email"
                      placeholder={t("contact.emailPlaceholder")}
                      required
                    />
                  </div>
                </div>

              </div>

              <div className="contact-field">
                <label htmlFor="contact-subject">
                  {t("contact.subject")}
                </label>

                <input
                  type="text"
                  id="contact-subject"
                  name="subject"
                  placeholder={t("contact.subjectPlaceholder")}
                  required
                />
              </div>

              <div className="contact-field">
                <label htmlFor="contact-message">
                  {t("contact.message")}
                </label>

                <textarea
                  id="contact-message"
                  name="message"
                  rows="4"
                  placeholder={t("contact.messagePlaceholder")}
                  minLength="10"
                  required
                />
              </div>

              <button
                type="submit"
                className="contact-submit"
                disabled={status === "sending"}
              >
                {status === "sending" ? (
                  t("contact.sending")
                ) : (
                  <>
                    {t("contact.send")}
                    <Icon name="send" size={17} />
                  </>
                )}
              </button>

              {status === "success" && (
                <p className="contact-status success" role="status">
                  {t("contact.success")}
                </p>
              )}

              {status === "error" && (
                <p className="contact-status error" role="alert">
                  {t("contact.error")}
                </p>
              )}

            </form>
          </div>

        </div>

        <footer className="contact-footer">

          <div className="contact-footer-line"></div>

          <div className="contact-footer-content">
            <span>
              © 2026 <strong>Roger Camara.</strong>{" "}
              {t("contact.copyright")}
            </span>

            <span className="contact-footer-tagline">
              {t("contact.footerTagline")}
            </span>

            <a href="#home">
              {t("contact.backToTop")} ↑
            </a>
          </div>

        </footer>

      </div>
    </section>
  );
}

export default Contact;