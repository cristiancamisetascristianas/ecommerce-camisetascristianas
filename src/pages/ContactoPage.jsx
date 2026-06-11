import { useState } from "react";
import { BRAND, waLink } from "../data/site";
import { useScrollReveal } from "../hooks/useScrollReveal";

export default function ContactoPage() {
  useScrollReveal();
  const [form, setForm] = useState({ nombre: "", mensaje: "" });

  const onChange = (e) =>
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));

  const onSubmit = (e) => {
    e.preventDefault();
    const texto = `Hola En Tus Manos Estoy 🙌 soy ${form.nombre || "un cliente"}. ${form.mensaje}`;
    window.open(waLink(texto), "_blank", "noopener,noreferrer");
  };

  return (
    <>
      <header className="page-hero section--bg">
        <div className="container reveal">
          <p className="eyebrow">Hablemos</p>
          <h1>Contacto</h1>
          <p>
            ¿Quieres un diseño personalizado, un pedido para tu iglesia o resolver
            una duda? Escríbenos, respondemos rapidísimo por WhatsApp.
          </p>
        </div>
      </header>

      <section className="section contacto">
        <div className="container contacto__grid">
          {/* Datos de contacto */}
          <div className="contacto__info reveal">
            <h2>Datos de contacto</h2>

            <ul className="contacto__list">
              <li>
                <span className="contacto__label">WhatsApp</span>
                <a
                  href={waLink("Hola En Tus Manos Estoy 🙌 tengo una pregunta.")}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  +57 301 362 2413
                </a>
              </li>
              <li>
                <span className="contacto__label">Instagram</span>
                <a href={BRAND.instagram} target="_blank" rel="noopener noreferrer">
                  {BRAND.handle}
                </a>
              </li>
              <li>
                <span className="contacto__label">Ubicación</span>
                <span>{BRAND.city}</span>
              </li>
              <li>
                <span className="contacto__label">Horario</span>
                <span>{BRAND.schedule}</span>
              </li>
            </ul>

            <a
              href={waLink("Hola En Tus Manos Estoy 🙌 quiero hacer un pedido.")}
              className="btn btn--wa"
              target="_blank"
              rel="noopener noreferrer"
            >
              Escríbenos por WhatsApp
            </a>
          </div>

          {/* Formulario → abre WhatsApp con el mensaje */}
          <form className="contacto__form reveal" onSubmit={onSubmit}>
            <h2>Cuéntanos qué necesitas</h2>

            <label className="field">
              <span>Tu nombre</span>
              <input
                type="text"
                name="nombre"
                value={form.nombre}
                onChange={onChange}
                placeholder="¿Cómo te llamas?"
                required
              />
            </label>

            <label className="field">
              <span>Tu mensaje</span>
              <textarea
                name="mensaje"
                rows="5"
                value={form.mensaje}
                onChange={onChange}
                placeholder="Diseño personalizado, talla, color, pedido para grupo…"
                required
              />
            </label>

            <button type="submit" className="btn btn--solid btn--block">
              Enviar por WhatsApp
            </button>
            <p className="contacto__note">
              Al enviar se abrirá WhatsApp con tu mensaje listo para mandar.
            </p>
          </form>
        </div>
      </section>
    </>
  );
}
