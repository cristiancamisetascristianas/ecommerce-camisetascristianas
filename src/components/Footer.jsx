import { Link } from "react-router-dom";
import { BRAND, waLink } from "../data/site";

function IgGlyph() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <rect x="2.5" y="2.5" width="19" height="19" rx="5" stroke="currentColor" strokeWidth="1.6" />
      <circle cx="12" cy="12" r="4.2" stroke="currentColor" strokeWidth="1.6" />
      <circle cx="17.4" cy="6.6" r="1.2" fill="currentColor" />
    </svg>
  );
}
function WaGlyph() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.76.46 3.45 1.34 4.95L2 22l5.27-1.38a9.86 9.86 0 0 0 4.77 1.21h.01c5.46 0 9.91-4.45 9.91-9.91C21.96 6.45 17.5 2 12.04 2zm0 18.07h-.01a8.2 8.2 0 0 1-4.18-1.15l-.3-.18-3.12.82.83-3.04-.2-.31a8.2 8.2 0 0 1-1.26-4.37c0-4.54 3.7-8.23 8.24-8.23 2.2 0 4.27.86 5.82 2.42a8.18 8.18 0 0 1 2.41 5.82c0 4.54-3.69 8.23-8.23 8.23zm4.52-6.16c-.25-.12-1.47-.72-1.69-.81-.23-.08-.39-.12-.56.13-.16.25-.64.81-.79.97-.14.17-.29.19-.54.06-.25-.12-1.05-.39-1.99-1.23-.74-.66-1.23-1.47-1.38-1.72-.14-.25-.01-.38.11-.51.11-.11.25-.29.37-.43.13-.14.17-.25.25-.41.08-.17.04-.31-.02-.43-.06-.12-.56-1.34-.76-1.84-.2-.48-.41-.42-.56-.43h-.48c-.17 0-.43.06-.66.31-.23.25-.86.85-.86 2.07 0 1.22.89 2.4 1.01 2.56.12.17 1.75 2.67 4.25 3.74.59.26 1.06.41 1.42.52.6.19 1.14.16 1.57.1.48-.07 1.47-.6 1.68-1.18.21-.58.21-1.07.14-1.18-.06-.11-.22-.17-.47-.29z" />
    </svg>
  );
}

export default function Footer() {
  return (
    <footer className="footer" id="contacto">
      <div className="container">
        <div className="footer__grid">
          <div>
            <div className="footer__brand">En Tus Manos Estoy</div>
            <p>{BRAND.bio} {BRAND.slogan}</p>
            <div className="footer__socials">
              <a href={BRAND.instagram} target="_blank" rel="noopener noreferrer" aria-label="Instagram">
                <IgGlyph />
              </a>
              <a
                href={waLink("Hola En Tus Manos Estoy 🙌 quiero hacer un pedido.")}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="WhatsApp"
              >
                <WaGlyph />
              </a>
            </div>
          </div>

          <div>
            <h4>Explora</h4>
            <ul className="footer__list">
              <li><Link to="/">Inicio</Link></li>
              <li><Link to="/catalogo">Catálogo</Link></li>
              <li><Link to="/marca">La marca</Link></li>
              <li><Link to="/contacto">Contacto</Link></li>
            </ul>
          </div>

          <div>
            <h4>Contacto</h4>
            <ul className="footer__list">
              <li>
                <a
                  href={waLink("Hola En Tus Manos Estoy 🙌 tengo una pregunta.")}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  WhatsApp · +57 301 362 2413
                </a>
              </li>
              <li>
                <a href={BRAND.instagram} target="_blank" rel="noopener noreferrer">
                  {BRAND.handle}
                </a>
              </li>
              <li><span>{BRAND.city}</span></li>
              <li><span>{BRAND.schedule}</span></li>
            </ul>
          </div>
        </div>

        <div className="footer__bottom">
          <span>© {new Date().getFullYear()} En Tus Manos Estoy · Todos los derechos reservados.</span>
          <span>Hecho con fe en Colombia 🇨🇴</span>
        </div>
      </div>
    </footer>
  );
}
