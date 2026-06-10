import { BRAND } from "../data/site";
import { INSTA_IMAGES } from "../data/products";

function IgGlyph() {
  return (
    <svg width="26" height="26" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <rect x="2.5" y="2.5" width="19" height="19" rx="5" stroke="currentColor" strokeWidth="1.6" />
      <circle cx="12" cy="12" r="4.2" stroke="currentColor" strokeWidth="1.6" />
      <circle cx="17.4" cy="6.6" r="1.2" fill="currentColor" />
    </svg>
  );
}

export default function InstagramFeed() {
  return (
    <section className="section" id="instagram" style={{ background: "var(--c-crema)" }}>
      <div className="container">
        <div className="section-head center reveal">
          <p className="eyebrow">Síguenos</p>
          <h2>{BRAND.handle}</h2>
          <p>
            Diseños nuevos, detrás de cámaras y la comunidad que viste su fe.
            Etiquétanos en tus fotos: nos encanta verte con tu camiseta.
          </p>
        </div>

        <div className="ig__grid reveal">
          {INSTA_IMAGES.map((src, i) => (
            <a
              key={i}
              href={BRAND.instagram}
              className="ig__item"
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`Ver publicación en Instagram ${BRAND.handle}`}
            >
              <img src={src} alt="Publicación de Instagram de En Tus Manos Estoy" loading="lazy" />
              <span className="ig__icon">
                <IgGlyph />
              </span>
            </a>
          ))}
        </div>

        <div className="ig__cta reveal">
          <a
            href={BRAND.instagram}
            className="btn btn--ghost"
            target="_blank"
            rel="noopener noreferrer"
          >
            <IgGlyph />
            Seguir en Instagram
          </a>
        </div>
      </div>
    </section>
  );
}
