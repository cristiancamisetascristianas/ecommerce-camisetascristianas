import { Link } from "react-router-dom";
import ScrollFrameHero from "../components/ScrollFrameHero";
import FeaturedProducts from "../components/FeaturedProducts";
import Testimonials from "../components/Testimonials";
import { useScrollReveal } from "../hooks/useScrollReveal";
import { BRAND, waLink } from "../data/site";

export default function Home() {
  useScrollReveal();

  return (
    <>
      <ScrollFrameHero />

      <FeaturedProducts />

      {/* Franja "La marca" sobre el fondo de hormigón */}
      <section className="section section--bg marca-strip">
        <div className="container marca-strip__inner reveal">
          <p className="eyebrow">Nuestra historia</p>
          <h2>
            Moda que <em>predica</em> sin decir una palabra
          </h2>
          <p>
            En Tus Manos Estoy nació de una idea sencilla: que la ropa que usamos
            a diario también pueda hablar de aquello en lo que creemos. No hacemos
            producción en masa — trabajamos en lotes pequeños, cuidando cada detalle.
          </p>
          <div className="marca-strip__cta">
            <Link to="/marca" className="btn btn--ghost">
              Conoce la marca
            </Link>
            <a
              href={waLink("Hola En Tus Manos Estoy 🙌 quiero conocer sus camisetas cristianas.")}
              className="btn btn--wa"
              target="_blank"
              rel="noopener noreferrer"
            >
              Escríbenos
            </a>
          </div>
        </div>
      </section>

      <Testimonials />

      {/* CTA final */}
      <section className="section section--bg home-cta">
        <div className="container home-cta__inner reveal">
          <h2>¿Lista tu próxima camiseta con propósito?</h2>
          <p>{BRAND.schedule} · Pedidos directos por WhatsApp.</p>
          <Link to="/catalogo" className="btn btn--solid">
            Explorar catálogo
          </Link>
        </div>
      </section>
    </>
  );
}
