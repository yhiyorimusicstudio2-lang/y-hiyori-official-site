import { useEffect, useMemo, useRef, useState } from "react";
import type { ChangeEvent, FormEvent, ReactNode } from "react";
import {
  AnimatePresence,
  motion,
  useMotionValueEvent,
  useScroll,
  useSpring,
  useTransform,
} from "framer-motion";
import emailjs from "@emailjs/browser";
import { FaInstagram, FaTiktok, FaYoutube } from "react-icons/fa";
import { works, type WorkItem } from "./data/works";
import { youtubeVideos } from "./data/youtube";
import type { Language } from "./data/translations";
import { translations } from "./data/translations";

type PageView = "home" | "contact";
type InquiryType = "" | "individual" | "company";
type ContactStep = "form" | "confirm";

type ContactFormState = {
  inquiryType: InquiryType;
  name: string;
  companyName: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
};

type ValidationErrors = Partial<Record<keyof ContactFormState | "inquiryType", string>>;

const EASE = [0.22, 1, 0.36, 1] as const;

// 生年月日 — 実際の誕生日に合わせて変更してください。
// {age} トークンがこの日付を基準に「満年齢」へ自動で置き換わります。
const BIRTH = { year: 2008, month: 9, day: 9 };

function calculateAge(birth: { year: number; month: number; day: number }) {
  const now = new Date();
  let age = now.getFullYear() - birth.year;
  const month = now.getMonth() + 1;
  const day = now.getDate();
  const beforeBirthday =
    month < birth.month || (month === birth.month && day < birth.day);
  if (beforeBirthday) age -= 1;
  return age;
}

function usePrefersReducedMotion() {
  const [reduce, setReduce] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setReduce(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);

  return reduce;
}

function Reveal({
  children,
  delay = 0,
  y = 34,
  className,
  reduce = false,
}: {
  children: ReactNode;
  delay?: number;
  y?: number;
  className?: string;
  reduce?: boolean;
}) {
  return (
    <motion.div
      className={className}
      initial={reduce ? { y: 0 } : { y }}
      whileInView={{ y: 0 }}
      viewport={{ once: true, amount: 0.1 }}
      transition={{ duration: reduce ? 0 : 0.9, delay: reduce ? 0 : delay, ease: EASE }}
    >
      {children}
    </motion.div>
  );
}

function App() {
  const [language, setLanguage] = useState<Language>("ja");
  const [selectedWork, setSelectedWork] = useState<WorkItem | null>(null);
  const [pageView, setPageView] = useState<PageView>("home");
  const [contactStep, setContactStep] = useState<ContactStep>("form");
  const [currentVideoIndex, setCurrentVideoIndex] = useState(0);
  const [scrolled, setScrolled] = useState(false);
  const [intro, setIntro] = useState(true);

  const [form, setForm] = useState<ContactFormState>({
    inquiryType: "",
    name: "",
    companyName: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });

  const [errors, setErrors] = useState<ValidationErrors>({});
  const [isSending, setIsSending] = useState(false);
  const [submitMessage, setSubmitMessage] = useState("");
  const [submitError, setSubmitError] = useState(false);

  const t = useMemo(() => translations[language], [language]);
  const reduce = usePrefersReducedMotion();

  const instagramUrl = "https://www.instagram.com/yhiyori_music";
  const youtubeChannelUrl = "https://www.youtube.com/@y-Hiyori";
  const tiktokUrl = "https://www.tiktok.com/@yhiyorimusic?is_from_webapp=1&sender_device=pc";

  /* ---------- scroll choreography ---------- */
  const heroRef = useRef<HTMLDivElement>(null);
  const timeRef = useRef<HTMLSpanElement>(null);

  const { scrollYProgress } = useScroll();
  const progressScale = useSpring(scrollYProgress, {
    stiffness: 140,
    damping: 30,
    mass: 0.3,
  });

  const { scrollYProgress: heroProg } = useScroll({
    target: heroRef,
    offset: ["start start", "end end"],
  });

  const heroScale = useTransform(heroProg, [0, 1], [1, 0.82]);
  const heroY = useTransform(heroProg, [0, 1], [0, -50]);
  const heroOpacity = useTransform(heroProg, [0, 0.55, 1], [1, 0.85, 0]);
  const heroFilter = useTransform(heroProg, [0, 1], ["blur(0px)", "blur(9px)"]);
  const portraitScale = useTransform(heroProg, [0, 1], [1, 1.16]);
  const portraitOpacity = useTransform(heroProg, [0, 0.7, 1], [1, 0.9, 0.1]);
  const hintOpacity = useTransform(heroProg, [0, 0.18], [1, 0]);
  const stageGlow = useTransform(heroProg, [0, 1], [1, 0.15]);

  const age = useMemo(() => calculateAge(BIRTH), []);
  const withAge = (text: string) => text.replace(/\{age\}/g, String(age));

  useMotionValueEvent(scrollYProgress, "change", (v) => {
    if (!timeRef.current) return;
    const total = 210;
    const s = Math.max(0, Math.round(v * total));
    timeRef.current.textContent = `${String(Math.floor(s / 60)).padStart(2, "0")}:${String(
      s % 60,
    ).padStart(2, "0")}`;
  });

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const timer = window.setTimeout(() => setIntro(false), 1100);
    return () => window.clearTimeout(timer);
  }, []);

  useEffect(() => {
    const hash = window.location.hash;
    if (hash === "#contact-page") {
      setPageView("contact");
    } else {
      setPageView("home");
    }
  }, []);

  useEffect(() => {
    document.documentElement.lang = language;
    document.documentElement.setAttribute("translate", "no");
    document.body.setAttribute("translate", "no");
    document.title = "y-Hiyori — Composer / Track Maker / Producer";
  }, [language]);

  useEffect(() => {
    if (youtubeVideos.length <= 1) return;

    const interval = window.setInterval(() => {
      setCurrentVideoIndex((prev) => (prev + 1) % youtubeVideos.length);
    }, 6000);

    return () => window.clearInterval(interval);
  }, []);

  /* ---------- navigation ---------- */
  const openContactPage = () => {
    setPageView("contact");
    setContactStep("form");
    setErrors({});
    setSubmitMessage("");
    setSubmitError(false);
    window.history.pushState(null, "", "#contact-page");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const goHomePage = () => {
    setPageView("home");
    setContactStep("form");
    setErrors({});
    setSubmitMessage("");
    setSubmitError(false);
    window.history.pushState(null, "", "#");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  /* ---------- form logic (unchanged behaviour) ---------- */
  const handleInputChange = (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>,
  ) => {
    const { name, value } = event.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const validateEmail = (email: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  const validateForm = (): boolean => {
    const nextErrors: ValidationErrors = {};

    if (!form.inquiryType) {
      nextErrors.inquiryType = t.validation.selectInquiryType;
    }

    if (form.inquiryType === "individual" && !form.name.trim()) {
      nextErrors.name = t.validation.requiredName;
    }

    if (form.inquiryType === "company" && !form.companyName.trim()) {
      nextErrors.companyName = t.validation.requiredCompanyName;
    }

    if (!form.email.trim()) {
      nextErrors.email = t.validation.requiredEmail;
    } else if (!validateEmail(form.email.trim())) {
      nextErrors.email = t.validation.invalidEmail;
    }

    if (!form.subject.trim()) {
      nextErrors.subject = t.validation.requiredSubject;
    }

    if (!form.message.trim()) {
      nextErrors.message = t.validation.requiredMessage;
    }

    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  };

  const handleGoConfirm = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSubmitMessage("");
    setSubmitError(false);

    if (!validateForm()) return;

    setContactStep("confirm");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleFinalSubmit = async () => {
    setIsSending(true);
    setSubmitMessage("");
    setSubmitError(false);

    const serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID;
    const templateId = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
    const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;

    if (!serviceId || !templateId || !publicKey) {
      setSubmitError(true);
      setSubmitMessage(t.contactPage.configError);
      setIsSending(false);
      return;
    }

    const senderName = form.inquiryType === "individual" ? form.name : form.companyName;

    try {
      await emailjs.send(
        serviceId,
        templateId,
        {
          inquiry_type:
            form.inquiryType === "individual"
              ? t.contactPage.typeIndividual
              : t.contactPage.typeCompany,
          name: senderName,
          company_name: form.companyName,
          email: form.email,
          phone: form.phone || "-",
          title: form.subject,
          subject: form.subject,
          message: form.message,
        },
        publicKey,
      );

      setSubmitMessage(t.contactPage.success);
      setSubmitError(false);
      setForm({
        inquiryType: "",
        name: "",
        companyName: "",
        email: "",
        phone: "",
        subject: "",
        message: "",
      });
      setErrors({});
      setContactStep("form");
      window.scrollTo({ top: 0, behavior: "smooth" });
    } catch {
      setSubmitError(true);
      setSubmitMessage(t.contactPage.error);
    } finally {
      setIsSending(false);
    }
  };

  const renderFieldError = (key: keyof ValidationErrors) =>
    errors[key] ? <p className="field-error">{errors[key]}</p> : null;

  /* ---------- HOME ---------- */
  const renderHomePage = () => (
    <>
      <section className="hero" id="top" ref={heroRef}>
        <div className="hero-stage">
          <motion.div
            className="hero-glow"
            style={reduce ? undefined : { opacity: stageGlow }}
            aria-hidden="true"
          />

          <div className="hero-kana" aria-hidden="true">
            <span>{t.hero.kana}</span>
          </div>

          <motion.div
            className="hero-inner"
            style={
              reduce
                ? undefined
                : { scale: heroScale, y: heroY, opacity: heroOpacity, filter: heroFilter }
            }
          >
            <div className="hero-grid">
              <div className="hero-left">
                <p className="eyebrow">{t.hero.eyebrow}</p>

                <h1 className="hero-title">
                  y-Hiyori<span className="accent-dot">.</span>
                </h1>

                <p className="hero-realname">{t.hero.kana}</p>

                <p className="hero-profile-text">{withAge(t.hero.profileText)}</p>
                <p className="hero-subtitle">{t.hero.subtitle}</p>

                <div className="hero-actions">
                  <a href="#sound" className="ghost-btn">
                    {t.hero.worksCta}
                  </a>
                  <button type="button" className="primary-btn" onClick={openContactPage}>
                    {t.hero.contactCta}
                  </button>
                </div>

              </div>

              <div className="hero-right">
                <div className="portrait-block">
                  <div className="portrait-accent" aria-hidden="true" />
                  <motion.div
                    className="portrait-frame"
                    style={reduce ? undefined : { scale: portraitScale, opacity: portraitOpacity }}
                  >
                    <img
                      src="/profile.jpeg"
                      alt="y-Hiyori — Yamaguchi Hiyori"
                      className="portrait-image"
                      onError={(event) => {
                        const target = event.currentTarget;
                        target.style.display = "none";
                        const fallback = target.nextElementSibling as HTMLDivElement | null;
                        if (fallback) fallback.style.display = "flex";
                      }}
                    />
                    <div className="portrait-fallback" aria-hidden="true">
                      <span>y-Hiyori</span>
                    </div>
                  </motion.div>
                </div>

                <div className="social-rail">
                  <span className="rail-line" aria-hidden="true" />
                  <a href={instagramUrl} target="_blank" rel="noreferrer" aria-label="Instagram">
                    <FaInstagram />
                  </a>
                  <a href={youtubeChannelUrl} target="_blank" rel="noreferrer" aria-label="YouTube">
                    <FaYoutube />
                  </a>
                  <a href={tiktokUrl} target="_blank" rel="noreferrer" aria-label="TikTok">
                    <FaTiktok />
                  </a>
                  <span className="rail-line" aria-hidden="true" />
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div
            className="scroll-hint"
            style={reduce ? undefined : { opacity: hintOpacity }}
          >
            <span className="scroll-hint-text">{t.hero.scroll}</span>
            <span className="scroll-hint-line" aria-hidden="true" />
          </motion.div>
        </div>
      </section>

      <main>
        <section id="profile" className="section profile-section">
          <div className="section-inner">
            <div className="profile-grid">
              <Reveal className="profile-head" reduce={reduce}>
                <p className="section-label">{t.about.label}</p>
                <h2 className="display-title">{t.about.title}</h2>
              </Reveal>

              <Reveal className="profile-body" delay={0.12} reduce={reduce}>
                <p className="section-text">{withAge(t.about.body)}</p>

                <dl className="fact-list">
                  {t.about.facts.map((fact) => (
                    <div className="fact-row" key={fact.k}>
                      <dt>{fact.k}</dt>
                      <dd>{withAge(fact.v)}</dd>
                    </div>
                  ))}
                </dl>
              </Reveal>
            </div>
          </div>
        </section>

        <section id="sound" className="section sound-section">
          <div className="section-inner">
            <Reveal className="section-head" reduce={reduce}>
              <p className="section-label">{t.sound.label}</p>
              <h2 className="display-title">{t.sound.title}</h2>
            </Reveal>

            <Reveal delay={0.1} reduce={reduce}>
              <div className="sound-frame">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={youtubeVideos[currentVideoIndex].id}
                    className="sound-slide"
                    initial={{ opacity: 0, scale: 1.02 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 1.02 }}
                    transition={{ duration: 0.55, ease: EASE }}
                  >
                    <iframe
                      className="sound-embed"
                      src={youtubeVideos[currentVideoIndex].embedUrl}
                      title={`youtube-video-${youtubeVideos[currentVideoIndex].id}`}
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                      referrerPolicy="strict-origin-when-cross-origin"
                      allowFullScreen
                    />
                  </motion.div>
                </AnimatePresence>
              </div>
            </Reveal>

            <div className="sound-meta">
              <span className="sound-caption">{t.sound.caption}</span>
              {youtubeVideos.length > 1 ? (
                <div className="sound-dots" aria-label="video navigation">
                  {youtubeVideos.map((video, index) => (
                    <button
                      key={video.id}
                      type="button"
                      className={index === currentVideoIndex ? "sound-dot active" : "sound-dot"}
                      onClick={() => setCurrentVideoIndex(index)}
                      aria-label={`video ${index + 1}`}
                    />
                  ))}
                </div>
              ) : null}
            </div>
          </div>
        </section>

        <section id="discography" className="section works-section">
          <div className="section-inner">
            <Reveal className="section-head" reduce={reduce}>
              <p className="section-label">{t.discography.label}</p>
              <h2 className="display-title">{t.discography.title}</h2>
            </Reveal>

            <div className="works-grid">
              {works.map((work, index) => (
                <Reveal key={`${work.title}-${index}`} delay={index * 0.08} reduce={reduce}>
                  <button
                    type="button"
                    className="work-card"
                    onClick={() => setSelectedWork(work)}
                  >
                    <div className="work-image">
                      <img
                        src={work.image}
                        alt={`${work.artist} - ${work.title}`}
                        onError={(event) => {
                          const target = event.currentTarget;
                          target.style.display = "none";
                          const fallback = target.nextElementSibling as HTMLDivElement | null;
                          if (fallback) fallback.style.display = "flex";
                        }}
                      />
                      <div className="work-image-fallback" aria-hidden="true" />
                      <span className="work-index">
                        {String(index + 1).padStart(2, "0")}
                      </span>
                    </div>
                    <div className="work-body">
                      <h3>{work.title}</h3>
                      <p>{work.artist}</p>
                      {work.release ? <span>{work.release}</span> : null}
                    </div>
                  </button>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        <section id="contact" className="section contact-cta-section">
          <div className="section-inner">
            <Reveal reduce={reduce}>
              <div className="contact-cta">
                <p className="section-label">{t.contactSection.label}</p>
                <h2 className="display-title cta-title">{t.contactSection.title}</h2>
                <p className="section-text cta-text">{t.contactSection.text}</p>
                <button type="button" className="primary-btn large" onClick={openContactPage}>
                  {t.contactSection.button}
                </button>
              </div>
            </Reveal>
          </div>
        </section>
      </main>
    </>
  );

  /* ---------- CONTACT ---------- */
  const renderConfirmValue = (label: string, value: string) => (
    <div className="confirm-row" key={label}>
      <p className="confirm-label">{label}</p>
      <p className="confirm-value">{value || "-"}</p>
    </div>
  );

  const renderContactPage = () => (
    <main className="contact-page">
      <motion.section
        className="contact-page-section"
        initial={{ opacity: 0, y: 22 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: EASE }}
      >
        <div className="section-inner contact-page-inner">
          <button type="button" className="back-link-btn" onClick={goHomePage}>
            <span aria-hidden="true">←</span> {t.nav.backHome}
          </button>

          <p className="section-label">{t.contactPage.eyebrow}</p>
          <h1 className="display-title contact-page-title">{t.contactPage.title}</h1>
          <p className="section-text">{t.contactPage.description}</p>

          {contactStep === "form" ? (
            <form className="contact-form contact-form-page" onSubmit={handleGoConfirm}>
              <label className="contact-field">
                <span>{t.contactPage.typeLabel}</span>
                <select
                  name="inquiryType"
                  value={form.inquiryType}
                  onChange={handleInputChange}
                  className="contact-select"
                >
                  <option value="">{t.contactPage.typePlaceholder}</option>
                  <option value="individual">{t.contactPage.typeIndividual}</option>
                  <option value="company">{t.contactPage.typeCompany}</option>
                </select>
                {renderFieldError("inquiryType")}
              </label>

              {form.inquiryType ? (
                <>
                  <div className="contact-form-grid">
                    {form.inquiryType === "individual" ? (
                      <label className="contact-field">
                        <span>
                          {t.contactPage.name} ({t.contactPage.fieldRequired})
                        </span>
                        <input
                          type="text"
                          name="name"
                          value={form.name}
                          onChange={handleInputChange}
                        />
                        {renderFieldError("name")}
                      </label>
                    ) : (
                      <label className="contact-field">
                        <span>
                          {t.contactPage.companyName} ({t.contactPage.fieldRequired})
                        </span>
                        <input
                          type="text"
                          name="companyName"
                          value={form.companyName}
                          onChange={handleInputChange}
                        />
                        {renderFieldError("companyName")}
                      </label>
                    )}

                    <label className="contact-field">
                      <span>
                        {t.contactPage.email} ({t.contactPage.fieldRequired})
                      </span>
                      <input
                        type="email"
                        name="email"
                        value={form.email}
                        onChange={handleInputChange}
                      />
                      {renderFieldError("email")}
                    </label>
                  </div>

                  <div className="contact-form-grid">
                    <label className="contact-field">
                      <span>{t.contactPage.phoneOptional}</span>
                      <input
                        type="tel"
                        name="phone"
                        value={form.phone}
                        onChange={handleInputChange}
                      />
                    </label>

                    <label className="contact-field">
                      <span>
                        {t.contactPage.subject} ({t.contactPage.fieldRequired})
                      </span>
                      <input
                        type="text"
                        name="subject"
                        value={form.subject}
                        onChange={handleInputChange}
                        placeholder={
                          form.inquiryType === "individual"
                            ? t.contactPage.placeholderSubjectIndividual
                            : t.contactPage.placeholderSubjectCompany
                        }
                      />
                      {renderFieldError("subject")}
                    </label>
                  </div>

                  <label className="contact-field">
                    <span>
                      {t.contactPage.message} ({t.contactPage.fieldRequired})
                    </span>
                    <textarea
                      name="message"
                      value={form.message}
                      onChange={handleInputChange}
                      placeholder={
                        form.inquiryType === "individual"
                          ? t.contactPage.placeholderMessageIndividual
                          : t.contactPage.placeholderMessageCompany
                      }
                    />
                    {renderFieldError("message")}
                  </label>

                  <div className="contact-submit-row">
                    <button type="submit" className="primary-btn contact-submit-btn">
                      {t.contactPage.nextToConfirm}
                    </button>
                  </div>
                </>
              ) : null}

              {submitMessage ? (
                <p className={submitError ? "contact-status error" : "contact-status success"}>
                  {submitMessage}
                </p>
              ) : null}
            </form>
          ) : (
            <div className="confirm-card">
              <h2 className="confirm-title">{t.contactPage.confirmTitle}</h2>
              <p className="section-text confirm-description">
                {t.contactPage.confirmDescription}
              </p>

              {renderConfirmValue(
                t.contactPage.typeLabel,
                form.inquiryType === "individual"
                  ? t.contactPage.typeIndividual
                  : t.contactPage.typeCompany,
              )}
              {form.inquiryType === "individual"
                ? renderConfirmValue(t.contactPage.name, form.name)
                : renderConfirmValue(t.contactPage.companyName, form.companyName)}
              {renderConfirmValue(t.contactPage.email, form.email)}
              {renderConfirmValue(t.contactPage.phone, form.phone)}
              {renderConfirmValue(t.contactPage.subject, form.subject)}
              {renderConfirmValue(t.contactPage.message, form.message)}

              <div className="contact-submit-row">
                <button
                  type="button"
                  className="ghost-btn contact-submit-btn"
                  onClick={() => setContactStep("form")}
                  disabled={isSending}
                >
                  {t.contactPage.backToEdit}
                </button>

                <button
                  type="button"
                  className="primary-btn contact-submit-btn"
                  onClick={handleFinalSubmit}
                  disabled={isSending}
                >
                  {isSending ? t.contactPage.sending : t.contactPage.finalSubmit}
                </button>
              </div>

              {submitMessage ? (
                <p className={submitError ? "contact-status error" : "contact-status success"}>
                  {submitMessage}
                </p>
              ) : null}
            </div>
          )}
        </div>
      </motion.section>
    </main>
  );

  return (
    <div className="site">
      <div className="grain" aria-hidden="true" />
      <motion.div className="progress-bar" style={{ scaleX: progressScale }} aria-hidden="true" />
      <span className="timecode" aria-hidden="true">
        <span ref={timeRef}>00:00</span>
      </span>

      <AnimatePresence>
        {intro && pageView === "home" ? (
          <motion.div
            className="intro"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.6, ease: EASE }}
          >
            <motion.span
              className="intro-name"
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: EASE }}
            >
              y-Hiyori
            </motion.span>
            <motion.span
              className="intro-line"
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 1.1, ease: EASE }}
            />
          </motion.div>
        ) : null}
      </AnimatePresence>

      <header className={scrolled ? "topbar scrolled" : "topbar"}>
        <div className="topbar-inner">
          <button type="button" className="brand" onClick={goHomePage}>
            y-Hiyori<span className="brand-dot">.</span>
          </button>

          <nav className="nav">
            {pageView === "home" ? (
              <>
                <a href="#profile">{t.nav.profile}</a>
                <a href="#sound">{t.nav.sound}</a>
                <a href="#discography">{t.nav.discography}</a>
                <button type="button" className="nav-button" onClick={openContactPage}>
                  {t.nav.contact}
                </button>
              </>
            ) : (
              <button type="button" className="nav-button" onClick={goHomePage}>
                {t.nav.backHome}
              </button>
            )}
          </nav>

          <div className="language-switcher" role="group" aria-label="Language switcher">
            {(["ja", "ko", "en"] as const).map((lang) => (
              <button
                key={lang}
                type="button"
                className={language === lang ? "lang-btn active" : "lang-btn"}
                onClick={() => setLanguage(lang)}
              >
                {lang === "ja" ? "JP" : lang === "ko" ? "KR" : "EN"}
              </button>
            ))}
          </div>
        </div>
      </header>

      {pageView === "home" ? renderHomePage() : renderContactPage()}

      <footer className="footer">
        <div className="footer-inner">
          <div className="footer-brand">y-Hiyori</div>
          <div className="footer-center">
            <div className="footer-socials">
              <a href={instagramUrl} target="_blank" rel="noreferrer" aria-label="Instagram">
                <FaInstagram />
              </a>
              <a href={youtubeChannelUrl} target="_blank" rel="noreferrer" aria-label="YouTube">
                <FaYoutube />
              </a>
              <a href={tiktokUrl} target="_blank" rel="noreferrer" aria-label="TikTok">
                <FaTiktok />
              </a>
            </div>
            <p className="footer-tagline">{t.footer.tagline}</p>
          </div>
          <div className="footer-rights">
            © 2026 y-Hiyori. {t.footer.rights}
          </div>
        </div>
      </footer>

      <AnimatePresence>
        {selectedWork ? (
          <motion.div
            className="modal-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedWork(null)}
          >
            <motion.div
              className="modal-content"
              initial={{ opacity: 0, y: 24, scale: 0.97 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 24, scale: 0.97 }}
              transition={{ duration: 0.28, ease: EASE }}
              onClick={(event) => event.stopPropagation()}
            >
              <div className="modal-image-wrap">
                <img
                  src={selectedWork.image}
                  alt={`${selectedWork.artist} - ${selectedWork.title}`}
                  className="modal-image"
                  onError={(event) => {
                    const target = event.currentTarget;
                    target.style.display = "none";
                    const fallback = target.nextElementSibling as HTMLDivElement | null;
                    if (fallback) fallback.style.display = "flex";
                  }}
                />
                <div className="modal-image-fallback" aria-hidden="true" />
              </div>

              <div className="modal-body">
                <p className="modal-eyebrow">{t.modal.detail}</p>
                <h3 className="modal-title">{selectedWork.title}</h3>
                <p className="modal-artist">{selectedWork.artist}</p>
                {selectedWork.release ? (
                  <p className="modal-release">{selectedWork.release}</p>
                ) : null}

                <div className="track-list">
                  {selectedWork.tracks.map((track, index) => (
                    <div className="track-item" key={`${track.title}-${index}`}>
                      <p className="track-title">{track.title}</p>
                      <p className="track-credit">{track.credit}</p>
                    </div>
                  ))}
                </div>

                <button
                  type="button"
                  className="ghost-btn modal-close-btn"
                  onClick={() => setSelectedWork(null)}
                >
                  {t.modal.close}
                </button>
              </div>
            </motion.div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </div>
  );
}

export default App;
