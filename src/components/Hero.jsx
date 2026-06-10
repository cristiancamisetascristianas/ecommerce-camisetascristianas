import { BRAND, waLink } from "../data/site";

const HERO_IMG =
  "https://images.unsplash.com/photo-1503341504253-dff4815485f1?auto=format&fit=crop&w=1920&q=80";

export default function Hero() {
  return (
    <section className="hero" id="top">
      <div className="hero__media">
        <img
          src={HERO_IMG}
          alt="Persona vistiendo una camiseta cristiana de la marca En Tus Manos Estoy"
          fetchPriority="high"
        />
      </div>

      <div className="container hero__inner">
        <p className="eyebrow hero__eyebrow">Camisetas cristianas · {BRAND.city}</p>
        <h1>
          Viste tu fe <em>con propósito</em>
        </h1>
        <p className="hero__slogan">
          {BRAND.slogan} Diseños personalizados, hechos a mano para acompañar tu
          historia.
        </p>
        <div className="hero__cta">
          <a href="#catalogo" className="btn btn--light">
            Ver catálogo
          </a>
          <a
            href={waLink(
              "Hola En Tus Manos Estoy 🙌 quiero conocer sus camisetas cristianas."
            )}
            className="btn btn--wa"
            target="_blank"
            rel="noopener noreferrer"
          >
            Escríbenos
          </a>
        </div>
      </div>

      <a href="#catalogo" className="hero__scroll" aria-label="Desliza para ver más">
        Desliza
      </a>
    </section>
  );
}
