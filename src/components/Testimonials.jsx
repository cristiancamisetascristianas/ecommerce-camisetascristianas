import { useEffect, useState } from "react";

const REVIEWS = [
  {
    quote:
      "La calidad me sorprendió. La tela es pesada, el estampado se siente suave y después de muchas lavadas sigue intacto. Ya pedí la segunda.",
    author: "Daniela R.",
    role: "Medellín",
  },
  {
    quote:
      "Pedí camisetas personalizadas para el retiro de jóvenes de la iglesia y quedaron hermosas. La atención por WhatsApp fue rapidísima y muy amable.",
    author: "Pastor Andrés M.",
    role: "Bogotá",
  },
  {
    quote:
      "Se nota que están hechas con amor y no en serie. El café tierra es mi color favorito, combina con todo. Mi camiseta favorita del clóset.",
    author: "Laura G.",
    role: "Cali",
  },
  {
    quote:
      "Compré la oversize «Luz del Mundo» y me la piden donde voy. Visto mi fe con estilo y eso abre conversaciones lindas. Gracias por lo que hacen.",
    author: "Sebastián T.",
    role: "Barranquilla",
  },
];

export default function Testimonials() {
  const [i, setI] = useState(0);
  const total = REVIEWS.length;

  useEffect(() => {
    const t = setInterval(() => setI((v) => (v + 1) % total), 6000);
    return () => clearInterval(t);
  }, [total]);

  return (
    <section className="section testi" id="testimonios">
      <div className="container">
        <div className="section-head center reveal">
          <p className="eyebrow">Lo que dicen</p>
          <h2>Historias que nos inspiran</h2>
        </div>

        <div className="testi__viewport reveal">
          <div
            className="testi__track"
            style={{ transform: `translateX(-${i * 100}%)` }}
          >
            {REVIEWS.map((r, idx) => (
              <figure className="testi__slide" key={idx}>
                <div className="testi__stars" aria-label="5 de 5 estrellas">
                  ★★★★★
                </div>
                <blockquote className="testi__quote">«{r.quote}»</blockquote>
                <figcaption>
                  <div className="testi__author">{r.author}</div>
                  <div className="testi__role">{r.role}</div>
                </figcaption>
              </figure>
            ))}
          </div>
        </div>

        <div className="testi__nav">
          {REVIEWS.map((_, idx) => (
            <button
              key={idx}
              className={`testi__dot ${idx === i ? "is-active" : ""}`}
              onClick={() => setI(idx)}
              aria-label={`Ver testimonio ${idx + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
