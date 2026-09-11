import { useEffect } from "react";
import { Link } from "react-router-dom";
import { cop } from "../data/site";
import { useCart } from "../context/CartContext";

export default function CartDrawer() {
  const { items, count, total, open, closeCart, removeItem, updateQuantity } =
    useCart();

  useEffect(() => {
    if (!open) return;
    const onKey = (e) => e.key === "Escape" && closeCart();
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, closeCart]);

  if (!open) return null;

  return (
    <div className="cart-drawer" role="dialog" aria-modal="true" aria-label="Carrito">
      <div className="cart-drawer__overlay" onClick={closeCart} />

      <div className="cart-drawer__panel">
        <div className="cart-drawer__head">
          <h3>Tu carrito {count > 0 && `(${count})`}</h3>
          <button className="modal__close" onClick={closeCart} aria-label="Cerrar">
            ✕
          </button>
        </div>

        {items.length === 0 ? (
          <p className="cart-drawer__vacio">
            Todavía no has agregado ninguna prenda.
          </p>
        ) : (
          <>
            <ul className="cart-drawer__items">
              {items.map((item) => (
                <li key={item.variantId} className="cart-item">
                  {item.image && <img src={item.image} alt="" />}
                  <div className="cart-item__info">
                    <p className="cart-item__nombre">{item.productName}</p>
                    <p className="cart-item__detalle">
                      {item.weightLabel ? `${item.weightLabel} · ` : ""}
                      talla {item.size}
                      {item.color ? ` · ${item.color}` : ""}
                    </p>
                    <p className="cart-item__precio">{cop(item.unitPrice)}</p>

                    <div className="qty-control qty-control--sm">
                      <button
                        type="button"
                        onClick={() =>
                          updateQuantity(item.variantId, item.quantity - 1)
                        }
                        aria-label="Restar cantidad"
                      >
                        −
                      </button>
                      <span>{item.quantity}</span>
                      <button
                        type="button"
                        onClick={() =>
                          updateQuantity(item.variantId, item.quantity + 1)
                        }
                        aria-label="Sumar cantidad"
                      >
                        +
                      </button>
                    </div>
                  </div>
                  <button
                    className="cart-item__quitar"
                    onClick={() => removeItem(item.variantId)}
                    aria-label={`Quitar ${item.productName}`}
                  >
                    Quitar
                  </button>
                </li>
              ))}
            </ul>

            <div className="cart-drawer__foot">
              <div className="cart-drawer__total">
                <span>Total</span>
                <strong>{cop(total)}</strong>
              </div>
              <Link
                to="/checkout"
                className="btn btn--solid btn--block"
                onClick={closeCart}
              >
                Ir a pagar
              </Link>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
