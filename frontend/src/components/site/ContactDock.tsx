import styles from "./ContactDock.module.css";

const PHONE_DISPLAY = "+250 792 778 698";
const PHONE_DIAL = "+250792778698";
const WHATSAPP_URL = `https://wa.me/250792778698?text=${encodeURIComponent(
  "Hello OrLabs, I'd like to know more about your services.",
)}`;
const INSTAGRAM_URL = "https://www.instagram.com/orlabs_tech_industries/";

function WhatsAppIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      width="20"
      height="20"
      fill="currentColor"
      aria-hidden="true"
    >
      <path d="M12 2a10 10 0 0 0-8.6 15.02L2 22l5.1-1.34A10 10 0 1 0 12 2Zm0 18.15a8.1 8.1 0 0 1-4.13-1.13l-.3-.18-3.02.79.8-2.95-.19-.31A8.15 8.15 0 1 1 12 20.15Z" />
      <path d="M17.2 14.4c-.29-.14-1.7-.84-1.96-.94-.26-.1-.45-.15-.64.15-.19.29-.74.94-.9 1.13-.17.2-.33.22-.62.07-.29-.14-1.22-.45-2.32-1.42-.86-.77-1.44-1.73-1.61-2.02-.17-.29-.02-.45.13-.6.13-.13.29-.34.44-.5.14-.17.19-.29.29-.48.1-.19.05-.36-.02-.51-.07-.14-.64-1.53-.87-2.11-.23-.55-.46-.48-.64-.49h-.54c-.19 0-.5.07-.76.36-.26.29-1 .98-1 2.38s1.02 2.76 1.16 2.95c.15.2 2 3.05 4.84 4.28.68.29 1.2.47 1.61.6.68.22 1.29.19 1.78.11.54-.08 1.7-.7 1.94-1.37.24-.67.24-1.25.17-1.37-.07-.13-.26-.19-.55-.34Z" />
    </svg>
  );
}

function PhoneIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      width="20"
      height="20"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.8 19.8 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.12 4.18 2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.13.96.36 1.9.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.91.34 1.85.57 2.81.7A2 2 0 0 1 22 16.92Z" />
    </svg>
  );
}

function InstagramIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      width="20"
      height="20"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
    </svg>
  );
}

/** Fixed contact shortcuts for visitors who prefer a direct channel. */
export function ContactDock() {
  return (
    <div className={styles.dock} aria-label="Contact OrLabs directly">
      <a
        className={styles.button}
        href={WHATSAPP_URL}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat with OrLabs on WhatsApp"
        title="Chat on WhatsApp"
      >
        <WhatsAppIcon />
        <span className={styles.label}>WhatsApp</span>
      </a>

      <a
        className={styles.button}
        href={`tel:${PHONE_DIAL}`}
        aria-label={`Call OrLabs on ${PHONE_DISPLAY}`}
        title={`Call ${PHONE_DISPLAY}`}
      >
        <PhoneIcon />
        <span className={styles.label}>Call us</span>
      </a>

      <a
        className={styles.button}
        href={INSTAGRAM_URL}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Follow OrLabs on Instagram"
        title="Instagram"
      >
        <InstagramIcon />
        <span className={styles.label}>Instagram</span>
      </a>
    </div>
  );
}
