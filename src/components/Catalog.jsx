import { useMemo, useState } from "react";
import { CATEGORIES } from "../data/products";
import { useProducts } from "../context/ProductsContext";
import ProductCard from "./ProductCard";
import ProductModal from "./ProductModal";

export default function Catalog({ hideHead = false }) {
  const [filter, setFilter] = useState("todos");
  const [active, setActive] = useState(null);
  const { products, loading } = useProducts();

  const visible = useMemo(
    () =>
      filter === "todos"
        ? products
        : products.filter((p) => p.category === filter),
    [filter, products]
  );

  return (
    <section className="section catalog" id="catalogo">
      <div className="container">
        <div className="catalog__head">
          {!hideHead && (
            <div className="section-head reveal" style={{ marginBottom: 0 }}>
              <p className="eyebrow">Nuestra colección</p>
              <h2>El catálogo</h2>
              <p>
                Cada diseño nace de un versículo y se confecciona con telas que
                duran. Elige el tuyo y pídelo directo por WhatsApp.
              </p>
            </div>
          )}

          <div className="filters reveal" role="tablist" aria-label="Filtrar por categoría">
            {CATEGORIES.map((c) => (
              <button
                key={c.id}
                className={`filters__btn ${filter === c.id ? "is-active" : ""}`}
                onClick={() => setFilter(c.id)}
                aria-pressed={filter === c.id}
              >
                {c.label}
              </button>
            ))}
          </div>
        </div>

        <div className="grid">
          {loading
            ? Array.from({ length: 6 }).map((_, i) => (
                <div key={i} className="card card--skeleton" />
              ))
            : visible.map((p) => (
                <ProductCard key={p.id} product={p} onOpen={setActive} />
              ))}
        </div>
      </div>

      {active && (
        <ProductModal product={active} onClose={() => setActive(null)} />
      )}
    </section>
  );
}
