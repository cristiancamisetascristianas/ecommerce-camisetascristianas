import { useState } from "react";
import { Link } from "react-router-dom";
import { useProducts } from "../context/ProductsContext";
import ProductCard from "./ProductCard";
import ProductModal from "./ProductModal";

export default function FeaturedProducts() {
  const [active, setActive] = useState(null);
  const { products, loading } = useProducts();
  const featured = products.filter((p) => p.badge).slice(0, 4);

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
          {loading
            ? Array.from({ length: 4 }).map((_, i) => (
                <div key={i} className="card card--skeleton" />
              ))
            : featured.map((p) => (
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
