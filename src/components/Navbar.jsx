import { useEffect, useState } from "react";
import { NavLink, Link, useLocation } from "react-router-dom";
import { BRAND } from "../data/site";
import { useCart } from "../context/CartContext";

const LINKS = [
  { to: "/catalogo", label: "Catálogo" },
  { to: "/marca", label: "La marca" },
  { to: "/contacto", label: "Contacto" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const { pathname } = useLocation();
  const isHome = pathname === "/";
  const { count, openCart } = useCart();

  useEffect(() => {
    // En el inicio: transparente sobre la animación, con fondo al pasarla.
    // En las demás páginas: fondo desde el principio.
    const onScroll = () => {
      if (!isHome) {
        setScrolled(true);
        return;
      }
      const hero = document.getElementById("top");
      if (hero) {
        // Gana fondo cuando la animación a pantalla completa termina de pasar.
        setScrolled(hero.getBoundingClientRect().bottom <= 80);
      } else {
        setScrolled(window.scrollY > 40);
      }
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [isHome]);

  useEffect(() => {
    document.body.classList.toggle("no-scroll", open);
    return () => document.body.classList.remove("no-scroll");
  }, [open]);

  return (
    <header className={`nav ${scrolled ? "is-scrolled" : ""}`}>
      <div className="container nav__inner">
        <Link to="/" className="nav__brand" aria-label={BRAND.name} onClick={() => setOpen(false)}>
          En Tus Manos Estoy
          <span>Camisetas con propósito</span>
        </Link>

        <nav className={`nav__links ${open ? "is-open" : ""}`}>
          {LINKS.map((l) => (
            <NavLink
              key={l.to}
              to={l.to}
              className={({ isActive }) => (isActive ? "is-current" : "")}
              onClick={() => setOpen(false)}
            >
              {l.label}
            </NavLink>
          ))}
        </nav>

        <button
          className="nav__cart"
          aria-label={`Ver carrito${count > 0 ? ` (${count} productos)` : ""}`}
          onClick={openCart}
        >
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden="true">
            <circle cx="9" cy="21" r="1.2" fill="currentColor" stroke="none" />
            <circle cx="19" cy="21" r="1.2" fill="currentColor" stroke="none" />
            <path d="M1.5 2h2.4l2.2 12.4a2 2 0 0 0 2 1.6h8.6a2 2 0 0 0 2-1.6L21 6.5H5.1" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          {count > 0 && <span className="nav__cart-badge">{count}</span>}
        </button>

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
