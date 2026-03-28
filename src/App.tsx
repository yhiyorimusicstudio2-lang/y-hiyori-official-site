import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { FaInstagram } from "react-icons/fa";
import type { Language } from "./data/translations";
import { translations } from "./data/translations";
import { works } from "./data/works";

function App() {
  const [language, setLanguage] = useState<Language>("ja");
  const t = useMemo(() => translations[language], [language]);

  const instagramUrl = "https://www.instagram.com/yhiyori_music";
  const contactEmail = "yhiyori.musicstudio1@gmail.com";

  return (
    <div className="site">
      <header className="topbar">
        <div className="topbar-inner">
          <a href="#" className="brand">
            y-Hiyori
          </a>

          <nav className="nav">
            <a href="#discography">{t.nav.discography}</a>
            <a href="#contact">{t.nav.contact}</a>
          </nav>

          <div
            className="language-switcher"
            role="group"
            aria-label="Language switcher"
          >
            <button
              type="button"
              className={language === "ja" ? "lang-btn active" : "lang-btn"}
              onClick={() => setLanguage("ja")}
            >
              JP
            </button>
            <button
              type="button"
              className={language === "ko" ? "lang-btn active" : "lang-btn"}
              onClick={() => setLanguage("ko")}
            >
              KR
            </button>
            <button
              type="button"
              className={language === "en" ? "lang-btn active" : "lang-btn"}
              onClick={() => setLanguage("en")}
            >
              EN
            </button>
          </div>
        </div>
      </header>

      <section className="hero">
        <div className="hero-bg" />

        <motion.div
          className="hero-content"
          initial={{ opacity: 0, y: 28 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9 }}
        >
          <div className="hero-grid">
            <div className="hero-left">
              <p className="eyebrow">{t.hero.eyebrow}</p>

              <div className="hero-name-block">
                <h1 className="hero-title">y-Hiyori</h1>
                <p className="hero-realname">Yamaguchi Hiyori</p>
              </div>

              <p className="hero-profile-text">{t.hero.profileText}</p>
              <p className="hero-subtitle">{t.hero.subtitle}</p>

              <div className="hero-actions">
                <a href="#discography" className="ghost-btn">
                  {t.hero.worksCta}
                </a>
                <a href="#contact" className="primary-btn">
                  {t.hero.contactCta}
                </a>
              </div>

              <div className="hero-socials">
                <a
                  href={instagramUrl}
                  target="_blank"
                  rel="noreferrer"
                  aria-label="Instagram"
                >
                  <FaInstagram />
                </a>
              </div>
            </div>

            <div className="hero-right">
              <div className="profile-image-wrapper">
                <img
                  src="/profile.jpeg"
                  alt="profile"
                  className="profile-image"
                  onError={(e) => {
                    const target = e.currentTarget;
                    target.style.display = "none";
                    const fallback =
                      target.nextElementSibling as HTMLDivElement | null;
                    if (fallback) fallback.style.display = "flex";
                  }}
                />
                <div className="profile-image-fallback">No Image</div>
              </div>
            </div>
          </div>
        </motion.div>
      </section>

      <main>
        <motion.section
          id="discography"
          className="section"
          initial={{ opacity: 0, y: 36 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.8 }}
        >
          <div className="section-inner">
            <p className="section-label">{t.discography.label}</p>
            <h2>{t.discography.title}</h2>
           

            <div className="discography-grid">
              {works.map((work, index) => (
                <article className="work-card" key={`${work.title}-${index}`}>
                  <div className="work-image">
                    <img
                      src={work.image}
                      alt={`${work.artist} - ${work.title}`}
                      onError={(event) => {
                        const target = event.currentTarget;
                        target.style.display = "none";
                        const fallback =
                          target.nextElementSibling as HTMLDivElement | null;
                        if (fallback) {
                          fallback.style.display = "flex";
                        }
                      }}
                    />
                    <div className="work-image-fallback">Coming Soon</div>
                  </div>

                  <div className="work-body">
                    <h3>{work.title}</h3>
                    <p>{work.artist}</p>
                    <span>{work.role}</span>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </motion.section>

        <motion.section
          id="contact"
          className="section contact-section"
          initial={{ opacity: 0, y: 36 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.8 }}
        >
          <div className="section-inner contact-card">
            <p className="section-label">{t.contact.label}</p>
            <h2>{t.contact.title}</h2>
            <p className="section-text">{t.contact.text}</p>

            <a href={`mailto:${contactEmail}`} className="primary-btn">
              {t.contact.button}
            </a>
          </div>
        </motion.section>
      </main>

      <footer className="footer">
        <div className="footer-inner">
          <span>© 2026 y-Hiyori. {t.footer.rights}</span>
        </div>
      </footer>
    </div>
  );
}

export default App;