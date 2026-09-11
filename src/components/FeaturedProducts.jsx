import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { useProducts } from "../context/ProductsContext";
import ProductCard from "./ProductCard";
import ProductModal from "./ProductModal";

const CUPO = 6; // dos filas completas en la grilla

export default function FeaturedProducts() {
  const [active, setActive] = useState(null);
  const { products, loading } = useProducts();

  // Se marcan desde la base con `featured`. Si no hay suficientes marcados se
  // completa con el resto del catálogo, para que la portada nunca quede coja.
  const featured = useMemo(() => {
    const marcados = products.filter((p) => p.featured);
    const relleno = products.filter((p) => !p.featured);
    return [...marcados, ...relleno].slice(0, CUPO);
  }, [products]);

  return (
    <section className="section section--bg featured" id="destacados">
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
            ? Array.from({ length: CUPO }).map((_, i) => (
                <div key={i} className="card card--skeleton" />
              ))
            : featured.map((p) => (
                <ProductCard key={p.id} product={p} onOpen={setActive} eager />
              ))}
        </div>

        <div className="featured__cta reveal">
          <Link to="/catalogo" className="btn btn--solid">
            Ver todo el catálogo
          </Link>
        </div>
      </div>

      {active && (
        <ProductModal
          key={active.id}
          product={active}
          onClose={() => setActive(null)}
        />
      )}
    </section>
  );
}
