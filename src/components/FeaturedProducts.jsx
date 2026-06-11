import { useState } from "react";
import { Link } from "react-router-dom";
import { PRODUCTS } from "../data/products";
import ProductCard from "./ProductCard";
import ProductModal from "./ProductModal";

// Muestra los productos con "badge" (los destacados) como anticipo del catálogo.
const FEATURED = PRODUCTS.filter((p) => p.badge).slice(0, 4);

export default function FeaturedProducts() {
  const [active, setActive] = useState(null);

  return (
    <section className="section section--bg featured">
      <div className="container">
        <div className="section-head center reveal">
          <p className="eyebrow">Lo más querido</p>
          <h2>Diseños destacados</h2>
          <p>
            Una muestra de la colección. Cada prenda nace de un versículo y se
            confecciona en lotes pequeños, cuidando cada detalle.
          </p>
        </div>

        <div className="grid">
          {FEATURED.map((p) => (
            <ProductCard key={p.id} product={p} onOpen={setActive} />
          ))}
        </div>

        <div className="featured__cta reveal">
          <Link to="/catalogo" className="btn btn--solid">
            Ver todo el catálogo
          </Link>
        </div>
      </div>

      {active && <ProductModal product={active} onClose={() => setActive(null)} />}
    </section>
  );
}
