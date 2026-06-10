import { useEffect, useState } from "react";
import { BRAND } from "../data/site";

const LINKS = [
  { href: "#catalogo", label: "Catálogo" },
  { href: "#marca", label: "La marca" },
  { href: "#testimonios", label: "Testimonios" },
  { href: "#instagram", label: "Instagram" },
  { href: "#contacto", label: "Contacto" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.classList.toggle("no-scroll", open);
    return () => document.body.classList.remove("no-scroll");
  }, [open]);

  return (
    <header className={`nav ${scrolled ? "is-scrolled" : ""}`}>
      <div className="container nav__inner">
        <a href="#top" className="nav__brand" aria-label={BRAND.name}>
          En Tus Manos Estoy
          <span>Camisetas con propósito</span>
        </a>

        <nav className={`nav__links ${open ? "is-open" : ""}`}>
          {LINKS.map((l) => (
            <a key={l.href} href={l.href} onClick={() => setOpen(false)}>
              {l.label}
            </a>
          ))}
        </nav>

        <button
          className={`nav__toggle ${open ? "is-open" : ""}`}
          aria-label={open ? "Cerrar menú" : "Abrir menú"}
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
        >
          <span></span>
          <span></span>
          <span></span>
        </button>
      </div>
    </header>
  );
}
