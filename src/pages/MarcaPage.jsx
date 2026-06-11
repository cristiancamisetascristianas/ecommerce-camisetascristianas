import About from "../components/About";
import InstagramFeed from "../components/InstagramFeed";
import { useScrollReveal } from "../hooks/useScrollReveal";

const VALUES = [
  {
    title: "Hecho con propósito",
    text: "Cada prenda lleva un mensaje que importa. No vendemos ropa, acompañamos historias de fe.",
  },
  {
    title: "Lotes pequeños",
    text: "Nada de producción en masa. Cuidamos prenda por prenda para que la calidad se note y se sienta.",
  },
  {
    title: "Comunidad",
    text: "Vestimos a personas de todo tipo, unidas por una misma fe. Tú haces que la marca crezca.",
  },
];

export default function MarcaPage() {
  useScrollReveal();

  return (
    <>
      <header className="page-hero section--bg">
        <div className="container reveal">
          <p className="eyebrow">Nuestra historia</p>
          <h1>La marca</h1>
          <p>
            Moda que predica sin decir una palabra. Conoce de dónde venimos y cómo
            hacemos cada camiseta.
          </p>
        </div>
      </header>

      <About />

      <section className="section section--bg values">
        <div className="container">
          <div className="section-head center reveal">
            <p className="eyebrow">En qué creemos</p>
            <h2>Nuestros valores</h2>
          </div>
          <div className="values__grid">
            {VALUES.map((v) => (
              <div className="value-card reveal" key={v.title}>
                <h3>{v.title}</h3>
                <p>{v.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <InstagramFeed />
    </>
  );
}
