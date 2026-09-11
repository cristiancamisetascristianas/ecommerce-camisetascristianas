import { Link, useSearchParams } from "react-router-dom";
import { BRAND, waLink } from "../data/site";

const CONTENIDO = {
  exito: {
    titulo: "¡Pago recibido!",
    texto:
      "Gracias por tu compra. Te vamos a escribir por WhatsApp para confirmar el envío.",
    icono: "✓",
  },
  pendiente: {
    titulo: "Tu pago está en proceso",
    texto:
      "Algunos medios de pago (como PSE o efectivo) tardan un poco en confirmarse. Te avisamos apenas se apruebe.",
    icono: "…",
  },
  error: {
    titulo: "El pago no se pudo completar",
    texto:
      "Puedes intentarlo de nuevo desde el carrito, o escribirnos si el problema sigue.",
    icono: "✕",
  },
};

export default function PagoResultado({ estado }) {
  const [params] = useSearchParams();
  const orderNumber = params.get("order");
  const info = CONTENIDO[estado];

  return (
    <section className="section pago-resultado">
      <div className="container pago-resultado__box">
        <span className={`pago-resultado__icono pago-resultado__icono--${estado}`}>
          {info.icono}
        </span>
        <h1>{info.titulo}</h1>
        {orderNumber && (
          <p className="pago-resultado__pedido">Pedido {orderNumber}</p>
        )}
        <p>{info.texto}</p>

        <div className="pago-resultado__acciones">
          <a
            href={waLink(
              orderNumber
                ? `Hola, escribo por mi pedido ${orderNumber} en ${BRAND.name}.`
                : `Hola, tengo una pregunta sobre mi pago en ${BRAND.name}.`
            )}
            className="btn btn--wa"
            target="_blank"
            rel="noopener noreferrer"
          >
            Escribir por WhatsApp
          </a>
          <Link to="/catalogo" className="btn btn--ghost">
            Volver al catálogo
          </Link>
        </div>
      </div>
    </section>
  );
}
