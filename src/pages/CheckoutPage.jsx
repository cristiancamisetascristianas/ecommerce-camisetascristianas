import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { cop } from "../data/site";
import { supabase } from "../lib/supabase";
import { useCart } from "../context/CartContext";

const CAMPOS_VACIOS = {
  name: "",
  email: "",
  phone: "",
  document: "",
  address: "",
  city: "",
};

export default function CheckoutPage() {
  const { items, total, clear } = useCart();
  const navigate = useNavigate();

  const [customer, setCustomer] = useState(CAMPOS_VACIOS);
  const [notes, setNotes] = useState("");
  const [enviando, setEnviando] = useState(false);
  const [error, setError] = useState(null);

  function setCampo(campo, valor) {
    setCustomer((prev) => ({ ...prev, [campo]: valor }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    if (items.length === 0) return;
    setError(null);
    setEnviando(true);

    try {
      const { data, error: fnError } = await supabase.functions.invoke(
        "create-order",
        {
          body: {
            items: items.map((i) => ({
              variantId: i.variantId,
              quantity: i.quantity,
            })),
            customer,
            notes,
          },
        }
      );

      if (fnError) throw fnError;
      if (data?.error) throw new Error(data.error);
      if (!data?.initPoint) throw new Error("No se recibió el enlace de pago.");

      clear();
      window.location.href = data.initPoint;
    } catch (err) {
      console.error("[checkout]", err);
      setError(
        err?.message ||
          "No se pudo iniciar el pago. Verifica tus datos e intenta de nuevo."
      );
      setEnviando(false);
    }
  }

  if (items.length === 0) {
    return (
      <section className="section checkout">
        <div className="container checkout__vacio">
          <h1>Tu carrito está vacío</h1>
          <p>Agrega alguna prenda del catálogo antes de pagar.</p>
          <Link to="/catalogo" className="btn btn--solid">
            Ver catálogo
          </Link>
        </div>
      </section>
    );
  }

  return (
    <section className="section checkout">
      <div className="container checkout__grid">
        <form className="checkout__form" onSubmit={handleSubmit}>
          <h1>Tus datos</h1>
          <p className="checkout__nota">
            Los necesitamos para confirmarte el pedido y coordinar el envío.
          </p>

          <label>
            Nombre completo *
            <input
              required
              type="text"
              value={customer.name}
              onChange={(e) => setCampo("name", e.target.value)}
              autoComplete="name"
            />
          </label>

          <div className="checkout__row">
            <label>
              Correo *
              <input
                required
                type="email"
                value={customer.email}
                onChange={(e) => setCampo("email", e.target.value)}
                autoComplete="email"
              />
            </label>
            <label>
              Teléfono / WhatsApp *
              <input
                required
                type="tel"
                value={customer.phone}
                onChange={(e) => setCampo("phone", e.target.value)}
                autoComplete="tel"
                placeholder="3001234567"
              />
            </label>
          </div>

          <label>
            Cédula
            <input
              type="text"
              value={customer.document}
              onChange={(e) => setCampo("document", e.target.value)}
              placeholder="Algunos medios de pago (PSE) la piden"
            />
          </label>

          <div className="checkout__row">
            <label>
              Dirección de envío *
              <input
                required
                type="text"
                value={customer.address}
                onChange={(e) => setCampo("address", e.target.value)}
                autoComplete="street-address"
              />
            </label>
            <label>
              Ciudad *
              <input
                required
                type="text"
                value={customer.city}
                onChange={(e) => setCampo("city", e.target.value)}
                autoComplete="address-level2"
              />
            </label>
          </div>

          <label>
            Notas del pedido
            <textarea
              rows={3}
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="Referencia de la dirección, instrucciones de entrega..."
            />
          </label>

          {error && <p className="checkout__error">{error}</p>}

          <button
            type="submit"
            className="btn btn--solid btn--block"
            disabled={enviando}
          >
            {enviando ? "Redirigiendo a Mercado Pago…" : "Pagar con Mercado Pago"}
          </button>
        </form>

        <aside className="checkout__resumen">
          <h2>Tu pedido</h2>
          <ul>
            {items.map((item) => (
              <li key={item.variantId}>
                <div>
                  <p className="checkout__item-nombre">{item.productName}</p>
                  <p className="checkout__item-detalle">
                    talla {item.size}
                    {item.color ? ` · ${item.color}` : ""} · x{item.quantity}
                  </p>
                </div>
                <span>{cop(item.unitPrice * item.quantity)}</span>
              </li>
            ))}
          </ul>
          <div className="checkout__resumen-total">
            <span>Total</span>
            <strong>{cop(total)}</strong>
          </div>
        </aside>
      </div>
    </section>
  );
}
