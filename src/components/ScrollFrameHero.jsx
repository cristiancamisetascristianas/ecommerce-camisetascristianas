import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { BRAND, waLink } from "../data/site";

// Carga las URLs de todos los frames de la animación, en orden.
const frameModules = import.meta.glob("../assets/frames/*.png", {
  eager: true,
  import: "default",
});
const FRAMES = Object.keys(frameModules)
  .sort()
  .map((k) => frameModules[k]);

const clamp = (v, min, max) => Math.min(max, Math.max(min, v));

// Opacidad de una capa: sube entre a→b, se mantiene entre b→c, baja entre c→d.
function fade(p, a, b, c, d) {
  if (p <= a || p >= d) return 0;
  if (p < b) return (p - a) / (b - a);
  if (p <= c) return 1;
  return 1 - (p - c) / (d - c);
}

export default function ScrollFrameHero() {
  const heroRef = useRef(null);
  const canvasRef = useRef(null);
  const layer1 = useRef(null);
  const layer2 = useRef(null);
  const layer3 = useRef(null);
  const fillRef = useRef(null);
  const [reduced] = useState(
    () => window.matchMedia("(prefers-reduced-motion: reduce)").matches
  );
  const [ready, setReady] = useState(false);
  const [loaderVisible, setLoaderVisible] = useState(true);

  useEffect(() => {
    if (reduced) return;

    const canvas = canvasRef.current;
    const hero = heroRef.current;
    const ctx = canvas.getContext("2d");
    const images = FRAMES.map(() => null);
    let lastTarget = 0;
    let disposed = false;

    const sizeCanvas = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.round(canvas.clientWidth * dpr);
      canvas.height = Math.round(canvas.clientHeight * dpr);
    };

    // Dibuja el frame más cercano al objetivo que ya esté cargado (object-fit: cover).
    const draw = (target) => {
      let best = -1;
      for (let i = 0; i < images.length; i++) {
        if (!images[i]) continue;
        if (best === -1 || Math.abs(i - target) < Math.abs(best - target)) best = i;
      }
      if (best === -1) return;
      const img = images[best];
      const cw = canvas.width;
      const ch = canvas.height;
      const scale = Math.max(cw / img.width, ch / img.height);
      const w = img.width * scale;
      const h = img.height * scale;
      ctx.clearRect(0, 0, cw, ch);
      ctx.drawImage(img, (cw - w) / 2, (ch - h) / 2, w, h);
    };

    const setLayer = (ref, opacity, interactive = false) => {
      const el = ref.current;
      if (!el) return;
      el.style.opacity = opacity;
      el.style.pointerEvents = interactive && opacity > 0.5 ? "auto" : "none";
    };

    const update = () => {
      const scrollable = hero.offsetHeight - window.innerHeight;
      if (scrollable <= 0) return;
      const p = clamp(-hero.getBoundingClientRect().top / scrollable, 0, 1);

      lastTarget = Math.round(p * (FRAMES.length - 1));
      draw(lastTarget);

      setLayer(layer1, fade(p, -1, 0, 0.18, 0.32));
      setLayer(layer2, fade(p, 0.38, 0.48, 0.62, 0.72));
      setLayer(layer3, fade(p, 0.8, 0.92, 2, 3), true);
      if (fillRef.current) fillRef.current.style.width = `${p * 100}%`;
    };

    sizeCanvas();
    update();

    // Precarga progresiva: el primer frame dispara la desaparición del loader.
    FRAMES.forEach((src, i) => {
      const img = new Image();
      img.onload = () => {
        if (disposed) return;
        images[i] = img;
        if (i === 0) setReady(true);
        draw(lastTarget);
      };
      img.src = src;
    });

    let ticking = false;
    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        update();
        ticking = false;
      });
    };
    const onResize = () => {
      sizeCanvas();
      update();
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onResize);
    return () => {
      disposed = true;
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onResize);
    };
  }, [reduced]);

  // Cuando el primer frame está listo, inicia el fade-out del loader
  useEffect(() => {
    if (!ready) return;
    const t = setTimeout(() => setLoaderVisible(false), 850);
    return () => clearTimeout(t);
  }, [ready]);

  // Sin animación (prefers-reduced-motion): un solo frame estático con todo el contenido.
  if (reduced) {
    return (
      <section className="fhero is-static" id="top">
        <div className="fhero__sticky">
          <img className="fhero__img" src={FRAMES[0]} alt="Hoodie negro «Jesús es el Rey» de En Tus Manos Estoy" />
          <div className="fhero__layer fhero__layer--right" style={{ opacity: 1, pointerEvents: "auto" }}>
            <p className="eyebrow">Camisetas cristianas · {BRAND.city}</p>
            <h1>
              Viste tu fe <em>con propósito</em>
            </h1>
            <p className="fhero__sub">{BRAND.slogan}</p>
            <div className="fhero__cta">
              <Link to="/catalogo" className="btn btn--solid">
                Ver catálogo
              </Link>
              <a
                href={waLink("Hola En Tus Manos Estoy 🙌 quiero conocer sus camisetas cristianas.")}
                className="btn btn--wa"
                target="_blank"
                rel="noopener noreferrer"
              >
                Escríbenos
              </a>
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <>
      {loaderVisible && (
        <div className={`page-loader${ready ? " page-loader--done" : ""}`} aria-hidden="true">
          <div className="page-loader__inner">
            <p className="page-loader__brand">En Tus Manos Estoy</p>
            <div className="page-loader__dots">
              <span /><span /><span />
            </div>
          </div>
        </div>
      )}
      <section className="fhero" id="top" ref={heroRef}>
      <div className="fhero__sticky">
        <canvas ref={canvasRef} className="fhero__canvas" aria-hidden="true" />

        {/* Etapa 1 · inicio: el hoodie está a la izquierda, texto a la derecha */}
        <div className="fhero__layer fhero__layer--right" ref={layer1}>
          <p className="eyebrow">Camisetas cristianas · {BRAND.city}</p>
          <h1>
            Viste tu fe <em>con propósito</em>
          </h1>
          <p className="fhero__sub">{BRAND.slogan} Diseños hechos a mano para acompañar tu historia.</p>
          <span className="fhero__hint">Desliza</span>
        </div>

        {/* Etapa 2 · giro: el hoodie queda al centro-derecha, texto a la izquierda */}
        <div className="fhero__layer fhero__layer--left" ref={layer2} style={{ opacity: 0 }}>
          <p className="eyebrow">Prenda por prenda</p>
          <h2>
            Hecha a mano, <em>con fe</em>
          </h2>
          <p className="fhero__sub">
            Algodón pesado, estampados que duran y diseños que nacen de un versículo.
          </p>
        </div>

        {/* Etapa 3 · final: el hoodie queda centrado, texto y CTA a la izquierda */}
        <div className="fhero__layer fhero__layer--left" ref={layer3} style={{ opacity: 0 }}>
          <h2>
            Jesús es el Rey. <em>Llévalo contigo.</em>
          </h2>
          <div className="fhero__cta">
            <Link to="/catalogo" className="btn btn--solid">
              Ver catálogo
            </Link>
            <a
              href={waLink("Hola En Tus Manos Estoy 🙌 quiero conocer sus camisetas cristianas.")}
              className="btn btn--wa"
              target="_blank"
              rel="noopener noreferrer"
            >
              Escríbenos
            </a>
          </div>
        </div>

        <div className="fhero__progress" aria-hidden="true">
          <div ref={fillRef} />
        </div>
      </div>
      </section>
    </>
  );
}
