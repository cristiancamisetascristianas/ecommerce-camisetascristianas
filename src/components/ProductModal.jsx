import { useEffect, useState } from "react";
import { cop, waLink } from "../data/site";

export default function ProductModal({ product, onClose }) {
  const [img, setImg] = useState(0);
  const [size, setSize] = useState(null);

  // Bloquear scroll de fondo + cerrar con Escape
  useEffect(() => {
    document.body.classList.add("no-scroll");
    const onKey = (e) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.classList.remove("no-scroll");
      window.removeEventListener("keydown", onKey);
    };
  }, [onClose]);

  const message = `Hola, me interesa ${product.name}${
    size ? ` (talla ${size})` : ""
  } 🙌 ¿Me confirmas disponibilidad y forma de pago?`;

  return (
    <div
      className="modal"
      role="dialog"
      aria-modal="true"
      aria-label={product.name}
    >
      <div className="modal__overlay" onClick={onClose} />

      <div className="modal__panel">
        <button className="modal__close" onClick={onClose} aria-label="Cerrar">
          ✕
        </button>

        <div className="modal__gallery">
          <div className="modal__main">
            <img src={product.images[img]} alt={product.name} />
          </div>
          <div className="modal__thumbs">
            {product.images.map((src, i) => (
              <button
                key={i}
                className={i === img ? "is-active" : ""}
                onClick={() => setImg(i)}
                aria-label={`Ver imagen ${i + 1}`}
              >
                <img src={src} alt="" loading="lazy" />
              </button>
            ))}
          </div>
        </div>

        <div className="modal__info">
          <span className="modal__cat">
            {product.badge ?? "En Tus Manos Estoy"}
          </span>
          <h3>{product.name}</h3>
          <div className="modal__price">{cop(product.price)}</div>
          <p className="modal__desc">{product.description}</p>

          <div className="modal__sizes">
            <p>Talla{size ? `: ${size}` : ""}</p>
            <div className="size-row">
              {product.sizes.map((s) => (
                <button
                  key={s}
                  className={size === s ? "is-active" : ""}
                  onClick={() => setSize(s)}
                >
                  {s}
                </button>
              ))}
            </div>
          </div>

          <ul className="modal__feats">
            {product.features.map((f) => (
              <li key={f}>{f}</li>
            ))}
          </ul>

          <div className="modal__buy">
            <a
              href={waLink(message)}
              className="btn btn--wa btn--block"
              target="_blank"
              rel="noopener noreferrer"
            >
              Pedir por WhatsApp
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
