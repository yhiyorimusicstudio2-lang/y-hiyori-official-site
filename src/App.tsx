import { useEffect, useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import emailjs from "@emailjs/browser";
import { FaInstagram, FaYoutube } from "react-icons/fa";
import { works, type WorkItem } from "./data/works";
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

function App() {
  const [language, setLanguage] = useState<Language>("ja");
  const [selectedWork, setSelectedWork] = useState<WorkItem | null>(null);
  const [pageView, setPageView] = useState<PageView>("home");
  const [contactStep, setContactStep] = useState<ContactStep>("form");

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
  const instagramUrl = "https://www.instagram.com/yhiyori_music";
  const youtubeUrl = "https://www.youtube.com/@y-Hiyori";

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
    document.title = "y-Hiyori Official Site";
  }, [language]);

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

  const handleInputChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>,
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

  const handleGoConfirm = (event: React.FormEvent<HTMLFormElement>) => {
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

    const senderName =
      form.inquiryType === "individual" ? form.name : form.companyName;

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

  const renderHomePage = () => (
    <>
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

                <div className="hero-socials">
                  <a
                    href={instagramUrl}
                    target="_blank"
                    rel="noreferrer"
                    aria-label="Instagram"
                  >
                    <FaInstagram />
                  </a>

                  <a
                    href={youtubeUrl}
                    target="_blank"
                    rel="noreferrer"
                    aria-label="YouTube"
                  >
                    <FaYoutube />
                  </a>
                </div>
              </div>

              <p className="hero-profile-text">{t.hero.profileText}</p>
              <p className="hero-subtitle">{t.hero.subtitle}</p>

              <div className="hero-actions">
                <a href="#discography" className="ghost-btn">
                  {t.hero.worksCta}
                </a>
                <button
                  type="button"
                  className="primary-btn"
                  onClick={openContactPage}
                >
                  {t.hero.contactCta}
                </button>
              </div>
            </div>

            <div className="hero-right">
              <div className="profile-image-wrapper">
                <img
                  src="/profile.jpeg"
                  alt="profile"
                  className="profile-image"
                  onError={(event) => {
                    const target = event.currentTarget;
                    target.style.display = "none";
                    const fallback =
                      target.nextElementSibling as HTMLDivElement | null;
                    if (fallback) fallback.style.display = "flex";
                  }}
                />
                <div className="profile-image-fallback" aria-hidden="true" />
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
                <button
                  type="button"
                  className="work-card work-card-button"
                  key={`${work.title}-${index}`}
                  onClick={() => setSelectedWork(work)}
                >
                  <div className="work-image">
                    <img
                      src={work.image}
                      alt={`${work.artist} - ${work.title}`}
                      onError={(event) => {
                        const target = event.currentTarget;
                        target.style.display = "none";
                        const fallback =
                          target.nextElementSibling as HTMLDivElement | null;
                        if (fallback) fallback.style.display = "flex";
                      }}
                    />
                    <div className="work-image-fallback" aria-hidden="true" />
                  </div>

                  <div className="work-body">
                    <h3>{work.title}</h3>
                    <p>{work.artist}</p>
                  </div>
                </button>
              ))}
            </div>
          </div>
        </motion.section>

        <motion.section
          id="contact"
          className="section contact-preview-section"
          initial={{ opacity: 0, y: 36 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.8 }}
        >
          <div className="section-inner contact-preview-card">
            <p className="section-label">{t.contactSection.label}</p>
            <h2>{t.contactSection.title}</h2>
            <p className="section-text">{t.contactSection.text}</p>
            <button
              type="button"
              className="primary-btn"
              onClick={openContactPage}
            >
              {t.contactSection.button}
            </button>
          </div>
        </motion.section>
      </main>
    </>
  );

  const renderConfirmValue = (label: string, value: string) => (
    <div className="confirm-row">
      <p className="confirm-label">{label}</p>
      <p className="confirm-value">{value || "-"}</p>
    </div>
  );

  const renderContactPage = () => (
    <main className="contact-page">
      <motion.section
        className="contact-page-section"
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.45 }}
      >
        <div className="section-inner contact-page-inner">
          <button type="button" className="back-link-btn" onClick={goHomePage}>
            {t.nav.backHome}
          </button>

          <p className="section-label">{t.contactPage.eyebrow}</p>
          <h1 className="contact-page-title">{t.contactPage.title}</h1>
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
                <p
                  className={
                    submitError ? "contact-status error" : "contact-status success"
                  }
                >
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
                <p
                  className={
                    submitError ? "contact-status error" : "contact-status success"
                  }
                >
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
      <header className="topbar">
        <div className="topbar-inner">
          <button type="button" className="brand" onClick={goHomePage}>
            y-Hiyori
          </button>

          <nav className="nav">
            {pageView === "home" ? (
              <>
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

      {pageView === "home" ? renderHomePage() : renderContactPage()}

      <footer className="footer">
        <div className="footer-inner">
          <span>© 2026 y-Hiyori. {t.footer.rights}</span>
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
              initial={{ opacity: 0, y: 24, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 24, scale: 0.96 }}
              transition={{ duration: 0.22 }}
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
                    const fallback =
                      target.nextElementSibling as HTMLDivElement | null;
                    if (fallback) fallback.style.display = "flex";
                  }}
                />
                <div className="modal-image-fallback" aria-hidden="true" />
              </div>

              <div className="modal-body">
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