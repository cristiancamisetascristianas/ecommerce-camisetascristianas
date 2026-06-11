import Catalog from "../components/Catalog";
import { useScrollReveal } from "../hooks/useScrollReveal";

export default function CatalogoPage() {
  useScrollReveal();

  return (
    <>
      <header className="page-hero section--bg">
        <div className="container reveal">
          <p className="eyebrow">Nuestra colección</p>
          <h1>El catálogo</h1>
          <p>
            Cada diseño nace de un versículo y se confecciona con telas que duran.
            Elige el tuyo y pídelo directo por WhatsApp.
          </p>
        </div>
      </header>

      <Catalog hideHead />
    </>
  );
}
