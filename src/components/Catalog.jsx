import { useMemo, useState } from "react";
import { PRODUCTS, CATEGORIES } from "../data/products";
import ProductCard from "./ProductCard";
import ProductModal from "./ProductModal";

export default function Catalog({ hideHead = false }) {
  const [filter, setFilter] = useState("todos");
  const [active, setActive] = useState(null);

  const visible = useMemo(
    () =>
      filter === "todos"
        ? PRODUCTS
        : PRODUCTS.filter((p) => p.category === filter),
    [filter]
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
          {visible.map((p) => (
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
