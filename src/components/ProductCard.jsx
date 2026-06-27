import { cop } from "../data/site";
import { CATEGORIES } from "../data/products";

const catLabel = (id) =>
  CATEGORIES.find((c) => c.id === id)?.label ?? id;

export default function ProductCard({ product, onOpen, eager = false }) {
  return (
    <article className="card reveal" onClick={() => onOpen(product)}>
      <div className="card__media">
        <img src={product.images[0]} alt={product.name} loading={eager ? "eager" : "lazy"} />
        {product.badge && <span className="card__tag">{product.badge}</span>}
        <div className="card__quick">Ver detalle</div>
      </div>
      <div className="card__body">
        <span className="card__cat">{catLabel(product.category)}</span>
        <h3 className="card__name">{product.name}</h3>
        <span className="card__price">{cop(product.price)}</span>
      </div>
    </article>
  );
}
