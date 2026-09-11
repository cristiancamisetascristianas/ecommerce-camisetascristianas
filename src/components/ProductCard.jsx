import { cop } from "../data/site";
import { CATEGORY_LABELS } from "../data/products";

const catLabel = (id) => CATEGORY_LABELS[id] ?? id;

export default function ProductCard({ product, onOpen, eager = false }) {
  const {
    images = [],
    colors = [],
    price,
    price_min,
    price_max,
    badge,
    name,
    category,
  } = product;

  // El precio varía según gramaje y talla: si hay rango, se muestra "desde".
  const hayRango = price_max != null && price_min != null && price_max > price_min;

  return (
    <article className="card reveal" onClick={() => onOpen(product)}>
      <div className="card__media">
        {images[0] ? (
          <img src={images[0]} alt={name} loading={eager ? "eager" : "lazy"} />
        ) : (
          <div className="card__media--vacio" aria-hidden="true" />
        )}
        {badge && <span className="card__tag">{badge}</span>}
        <div className="card__quick">Ver detalle</div>
      </div>

      <div className="card__body">
        <span className="card__cat">{catLabel(category)}</span>
        <h3 className="card__name">{name}</h3>

        <span className="card__price">
          {hayRango && <em className="card__desde">desde</em>}
          {cop(price_min ?? price ?? 0)}
        </span>

        {colors.length > 0 && (
          <ul className="card__colores" aria-label={`${colors.length} colores disponibles`}>
            {colors.slice(0, 6).map((c) => (
              <li key={c.code} style={{ background: c.hex }} title={c.name} />
            ))}
            {colors.length > 6 && (
              <li className="card__colores-mas">+{colors.length - 6}</li>
            )}
          </ul>
        )}
      </div>
    </article>
  );
}
