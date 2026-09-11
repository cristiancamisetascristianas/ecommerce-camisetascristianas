import { useEffect, useMemo, useState } from "react";
import { cop, waLink } from "../data/site";
import { supabase } from "../lib/supabase";

// Los gramajes se guardan como número, y NULL cuando la prenda no lo distingue
// (busos y cami busos, pendientes de definir). Se necesita una clave estable.
const keyGramaje = (g) => (g == null ? "na" : String(g));

export default function ProductModal({ product, onClose }) {
  const [img, setImg] = useState(0);
  const [variants, setVariants] = useState([]);
  const [cargando, setCargando] = useState(true);

  // `undefined` = el usuario aún no ha elegido; se usa el primer gramaje
  const [gramaje, setGramaje] = useState(undefined);
  const [color, setColor] = useState(null);
  const [talla, setTalla] = useState(null);

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

  // Trae la matriz de variantes de este producto: qué tallas y colores existen
  // para cada gramaje, con su precio.
  useEffect(() => {
    let vigente = true;

    supabase
      .from("product_variants_public")
      .select("*")
      .eq("product_slug", product.slug)
      .then(({ data, error }) => {
        if (!vigente) return;
        if (error) console.error("[Variantes]", error.message);
        setVariants(data ?? []);
        setCargando(false);
      });

    return () => {
      vigente = false;
    };
  }, [product.slug]);

  // Gramajes disponibles, en orden
  const gramajes = useMemo(() => {
    const mapa = new Map();
    for (const v of variants) {
      const k = keyGramaje(v.weight_grams);
      if (!mapa.has(k)) {
        mapa.set(k, {
          grams: v.weight_grams,
          label: v.weight_label ?? "Estándar",
          oversize: v.is_oversize,
          order: v.weight_order ?? 0,
        });
      }
    }
    return [...mapa.values()].sort((a, b) => a.order - b.order);
  }, [variants]);

  // Gramaje en uso: el elegido, o el primero mientras no se haya tocado nada
  const gramajeSel = gramaje !== undefined ? gramaje : gramajes[0]?.grams;

  // Solo las variantes de ese gramaje
  const delGramaje = useMemo(
    () =>
      gramajes.length === 0
        ? []
        : variants.filter(
            (v) => keyGramaje(v.weight_grams) === keyGramaje(gramajeSel)
          ),
    [variants, gramajes, gramajeSel]
  );

  // Colores y tallas de ESE gramaje (300g no tiene Verde botella ni 2XL)
  const colores = useMemo(() => {
    const mapa = new Map();
    for (const v of delGramaje) {
      if (v.color_code && !mapa.has(v.color_code)) {
        mapa.set(v.color_code, {
          code: v.color_code,
          name: v.color_name,
          hex: v.color_hex,
          order: v.color_order ?? 0,
        });
      }
    }
    return [...mapa.values()].sort((a, b) => a.order - b.order);
  }, [delGramaje]);

  const tallas = useMemo(() => {
    const mapa = new Map();
    for (const v of delGramaje) {
      if (!mapa.has(v.size_code)) {
        mapa.set(v.size_code, {
          code: v.size_code,
          label: v.size_label,
          order: v.size_order ?? 0,
          price: v.price_cop,
        });
      }
    }
    return [...mapa.values()].sort((a, b) => a.order - b.order);
  }, [delGramaje]);

  // Al cambiar de gramaje, un color o talla que ya no existe deja de contar
  // (300g no tiene Verde botella ni 2XL). Se deriva en vez de limpiarlo.
  const colorSel = colores.some((c) => c.code === color) ? color : null;
  const tallaSel = tallas.some((t) => t.code === talla) ? talla : null;

  // Precio: depende del gramaje y la talla (el color no lo cambia)
  const precios = delGramaje.map((v) => v.price_cop).filter((n) => n != null);
  const precioMin = precios.length ? Math.min(...precios) : product.price_min;
  const precioMax = precios.length ? Math.max(...precios) : product.price_max;
  const precioTalla = tallaSel
    ? tallas.find((t) => t.code === tallaSel)?.price
    : null;
  const hayRango = precioMax > precioMin;

  const gramajeActual = gramajes.find(
    (g) => keyGramaje(g.grams) === keyGramaje(gramajeSel)
  );
  const colorActual = colores.find((c) => c.code === colorSel);

  const listo = Boolean(tallaSel && (colores.length === 0 || colorSel));

  const mensaje = [
    `Hola, me interesa ${product.name}`,
    gramajeActual?.grams ? ` en ${gramajeActual.label}` : "",
    gramajeActual?.oversize ? " (Oversize)" : "",
    tallaSel ? ` · talla ${tallaSel}` : "",
    colorActual ? ` · color ${colorActual.name}` : "",
    precioTalla ? ` · ${cop(precioTalla)}` : "",
    " 🙌 ¿Me confirmas disponibilidad y forma de pago?",
  ].join("");

  const imagenes = product.images ?? [];

  return (
    <div className="modal" role="dialog" aria-modal="true" aria-label={product.name}>
      <div className="modal__overlay" onClick={onClose} />

      <div className="modal__panel">
        <button className="modal__close" onClick={onClose} aria-label="Cerrar">
          ✕
        </button>

        <div className="modal__gallery">
          <div className="modal__main">
            {imagenes[img] && (
              <>
                <div
                  className="modal__fondo"
                  style={{ backgroundImage: `url(${imagenes[img]})` }}
                  aria-hidden="true"
                />
                <img src={imagenes[img]} alt={product.name} />
              </>
            )}
          </div>
          {imagenes.length > 1 && (
            <div className="modal__thumbs">
              {imagenes.map((src, i) => (
                <button
                  key={src}
                  className={i === img ? "is-active" : ""}
                  onClick={() => setImg(i)}
                  aria-label={`Ver imagen ${i + 1}`}
                >
                  <img src={src} alt="" loading="lazy" />
                </button>
              ))}
            </div>
          )}
        </div>

        <div className="modal__info">
          <span className="modal__cat">{product.badge ?? "En Tus Manos Estoy"}</span>
          <h3>{product.name}</h3>

          <div className="modal__price">
            {precioTalla ? (
              cop(precioTalla)
            ) : (
              <>
                {hayRango && <em className="modal__desde">desde</em>}
                {cop(precioMin ?? 0)}
              </>
            )}
          </div>

          <p className="modal__desc">{product.description}</p>

          {cargando ? (
            <p className="modal__cargando">Cargando tallas y colores…</p>
          ) : (
            <>
              {/* Gramaje: solo si la prenda ofrece más de uno */}
              {gramajes.length > 1 && (
                <div className="modal__sizes">
                  <p>Gramaje{gramajeActual ? `: ${gramajeActual.label}` : ""}</p>
                  <div className="size-row">
                    {gramajes.map((g) => (
                      <button
                        key={keyGramaje(g.grams)}
                        className={
                          keyGramaje(g.grams) === keyGramaje(gramajeSel)
                            ? "is-active"
                            : ""
                        }
                        onClick={() => setGramaje(g.grams)}
                      >
                        {g.label}
                      </button>
                    ))}
                  </div>
                  {gramajeActual?.oversize && (
                    <p className="modal__nota">
                      El gramaje 300g es de corte <strong>Oversize</strong>.
                    </p>
                  )}
                </div>
              )}

              {colores.length > 0 && (
                <div className="modal__sizes">
                  <p>Color{colorActual ? `: ${colorActual.name}` : ""}</p>
                  <div className="color-row">
                    {colores.map((c) => (
                      <button
                        key={c.code}
                        className={`color-dot ${colorSel === c.code ? "is-active" : ""}`}
                        style={{ "--dot": c.hex }}
                        onClick={() => setColor(c.code)}
                        title={c.name}
                        aria-label={`Color ${c.name}`}
                        aria-pressed={colorSel === c.code}
                      />
                    ))}
                  </div>
                </div>
              )}

              <div className="modal__sizes">
                <p>Talla{tallaSel ? `: ${tallaSel}` : ""}</p>
                <div className="size-row">
                  {tallas.map((t) => (
                    <button
                      key={t.code}
                      className={tallaSel === t.code ? "is-active" : ""}
                      onClick={() => setTalla(t.code)}
                    >
                      {t.label}
                    </button>
                  ))}
                </div>
              </div>
            </>
          )}

          {product.features?.length > 0 && (
            <ul className="modal__feats">
              {product.features.map((f) => (
                <li key={f}>{f}</li>
              ))}
            </ul>
          )}

          <div className="modal__buy">
            {!listo && !cargando && (
              <p className="modal__nota modal__nota--buy">
                Elige {colores.length > 0 && !colorSel ? "color y " : ""}talla para
                pedir con todos los datos.
              </p>
            )}
            <a
              href={waLink(mensaje)}
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
