const ABOUT_IMG =
  "https://images.unsplash.com/photo-1556905055-8f358a7a47b2?auto=format&fit=crop&w=1000&q=80";

const STEPS = [
  {
    n: "01",
    title: "El diseño",
    text: "Cada gráfico nace de un versículo y se dibuja a mano hasta que dice justo lo que queremos transmitir.",
  },
  {
    n: "02",
    title: "La tela",
    text: "Elegimos algodón peinado de gramaje alto: cae bien, se siente suave y aguanta el uso diario.",
  },
  {
    n: "03",
    title: "El estampado",
    text: "Estampamos con tintas de alta durabilidad, suaves al tacto, revisando prenda por prenda antes de enviarla.",
  },
];

export default function About() {
  return (
    <section className="section about" id="marca">
      <div className="container about__grid">
        <div className="about__media reveal">
          <img
            src={ABOUT_IMG}
            alt="Proceso artesanal de confección de las camisetas En Tus Manos Estoy"
            loading="lazy"
          />
          <div className="stamp">Hecho a mano con fe</div>
        </div>

        <div className="reveal">
          <p className="eyebrow" style={{ color: "var(--c-arena)" }}>
            Nuestra historia
          </p>
          <h2>
            Moda que <em>predica</em> sin decir una palabra
          </h2>
          <p>
            En Tus Manos Estoy nació de una idea sencilla: que la ropa que usamos
            a diario también pueda hablar de aquello en lo que creemos. Lo que
            empezó como diseños para amigos y familia se convirtió en una marca
            que viste a personas de todo tipo, unidas por una misma fe.
          </p>
          <p>
            No hacemos producción en masa. Trabajamos en lotes pequeños, cuidando
            cada detalle, porque creemos que una prenda hecha con dedicación se
            nota y se siente. Cada camiseta es una pequeña obra hecha con
            propósito.
          </p>

          <div className="about__steps">
            {STEPS.map((s) => (
              <div className="about__step" key={s.n}>
                <span>{s.n}</span>
                <div>
                  <h4>{s.title}</h4>
                  <p>{s.text}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
