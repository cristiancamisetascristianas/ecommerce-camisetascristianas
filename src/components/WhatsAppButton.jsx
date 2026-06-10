import { waLink } from "../data/site";

export default function WhatsAppButton() {
  return (
    <a
      href={waLink(
        "Hola En Tus Manos Estoy 🙌 quiero información sobre sus camisetas."
      )}
      className="wa-float"
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Escríbenos por WhatsApp"
    >
      <span className="wa-float__tip">¿Hacemos tu pedido?</span>
      <svg width="30" height="30" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
        <path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.76.46 3.45 1.34 4.95L2 22l5.27-1.38a9.86 9.86 0 0 0 4.77 1.21h.01c5.46 0 9.91-4.45 9.91-9.91C21.96 6.45 17.5 2 12.04 2zm5.5 11.91c-.21.58-1.2 1.11-1.68 1.18-.43.06-.97.09-1.57-.1-.36-.11-.83-.26-1.42-.52-2.5-1.07-4.13-3.57-4.25-3.74-.12-.16-1.01-1.34-1.01-2.56 0-1.22.63-1.82.86-2.07.23-.25.49-.31.66-.31h.48c.15.01.36-.05.56.43.2.5.7 1.72.76 1.84.06.12.1.26.02.43-.08.16-.12.27-.25.41-.12.14-.26.32-.37.43-.12.13-.25.26-.11.51.15.25.64 1.06 1.38 1.72.94.84 1.74 1.11 1.99 1.23.25.13.4.11.54-.06.15-.16.63-.72.79-.97.17-.25.33-.21.56-.13.22.09 1.44.69 1.69.81.25.12.41.18.47.29.07.11.07.6-.14 1.18z" />
      </svg>
    </a>
  );
}
