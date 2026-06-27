import { useEffect } from "react";

export function useScrollReveal() {
  useEffect(() => {
    if (!("IntersectionObserver" in window)) {
      document.querySelectorAll(".reveal").forEach((el) =>
        el.classList.add("is-visible")
      );
      return;
    }

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            io.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.08, rootMargin: "0px 0px -4% 0px" }
    );

    const observeNew = () => {
      document.querySelectorAll(".reveal:not(.is-visible)").forEach((el) =>
        io.observe(el)
      );
    };

    // Observa elementos actuales
    observeNew();

    // Observa elementos que se agreguen dinámicamente al DOM (ej: cards de Supabase)
    const mo = new MutationObserver(observeNew);
    mo.observe(document.body, { childList: true, subtree: true });

    return () => {
      io.disconnect();
      mo.disconnect();
    };
  }, []);
}
